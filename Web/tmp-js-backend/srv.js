// third-party package
const http = require('http')
const querystring = require('querystring')
const mysql = require('mysql')
const { error } = require('console')
const { url } = require('inspector')
const { stat } = require('fs')
const uuid = require('uuid')

// customized package
const Sequence_Gen = require('./sequence-gen') 
// Running Environment for the server 
// 
// 
ins_avail = false

// connection pool for database
const db = mysql.createPool({
    host:'120.77.13.22',
    user:'root',
    password:'Aa020111',
    database:'MMProj',
})

// Deal With HTTP Requests
const server = http.createServer((req, res) => {
    console.log(req.method, " Request:")
    // deal with different request types
    if (req.method == 'GET') {
        req.query = querystring.parse(url.split('?')[1]) 
        res.end(JSON.stringify(req.query))     
    }else if (req.method == 'POST') {
        // recv postData
        var postData = '' 
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            json_obj = JSON.parse(postData)
            if(!str_legality_check()){
                res.end(JSON.stringify({msg:"-1"}))
                return;
            }
            
            
            // deal with different routes
            // Register and Login Module
            if (req.url == "/login") {
                /**
                 * COULD BE OPTIMIZED!!!!! single query sql would be enough
                */
                var stat_sql_0 = "SELECT * FROM Teacher WHERE tname = ? AND passwd = ?"
                var stat_sql_1 = "SELECT * FROM Tokens WHERE tname = ?"
                var stat_sql_2 = "INSERT INTO Tokens(tname, token) VALUES(?, ?)"
                var usr = json_obj.usr.toString()
                var passwd = json_obj.passwd.toString()
                var uname = ''
                db.query(stat_sql_0, [usr, passwd], (err,results)=>{
                    if(results.length == 1){
                        uname = results[0].tname.toString()
                        db.query(stat_sql_1, [usr], (err, results) => { 
                                var token = ''
                                if(results.length == 1){
                                    token = results[0].token    // use the old token
                                }else{
                                    token = Sequence_Gen.get_tokens(usr)   // gen a new one and add it to database
                                    db.query(stat_sql_2, [uname, token], (err, results) => {})
                                }
                                console.log("   %s %s", uname, token)
                                res.end(JSON.stringify({
                                    "token": token,
                                    "msg": "0"
                                }))
                                console.log('   log successfully')
                            } 
                        )
                    }else{
                        console.log('   failed to login')
                        res.end(JSON.stringify({
                            token:"",
                            msg:'-1'
                        }))
                    }
                })
            }
            if (req.url == "/register") {
                var usr = json_obj.usr.toString()
                var passwd = json_obj.passwd.toString()
                var stat_sql_4 = "INSERT INTO Teacher(tid, tname, passwd) VALUES(?, ?, ?)"

                // insert new usr
                db.query(stat_sql_4, [uuid.v4(), usr, passwd], (err, results) =>{
                    if(results != null){
                        console.log("   register successfully")
                        res.end(JSON.stringify({msg:'0'}))
                    }else{
                        res.end(JSON.stringify({msg:'-1'}))
                    }
                })
            }
        })
    }
})
server.listen(777)


// set return var as response code, '0' represents legal  
function post_handler(req_type_str) {
    if (str_legality_check(req_type_str)){
        return -1;
    }
    switch (req_type) {
        case 'login':
            
            break;
    
        default:
            break;
    }
}

function str_legality_check(req_type_str) {
    return true;
}




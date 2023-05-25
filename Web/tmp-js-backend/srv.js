const http = require('http')
const querystring = require('querystring')
const mysql = require('mysql')
const { error } = require('console')


/** 
 * MAIN ENTRANCE 
*/
// connection pool for database
const db = mysql.createPool({
    host:'',
    user:'root',
    password:'',
    database:'MMProj',
})

// Deal With HTTP Requests
const server = http.createServer((req, res) => {
    console.log(req.method, " Request")
    if (req.method == 'GET') {
        req.query = querystring.parse(url.split('?')[1]) 
        res.end(JSON.stringify(req.query))     
    }else if (req.method == 'POST') {
        var postData = '' 
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            db.query(JSON.parse(postData)["sql"],(err,results)=>{
                if(err) {
                    throw error
                }
                sql_res = JSON.stringify(results)
                console.log("   with response length => ", sql_res.length)
                res.end(sql_res)
            })
        })
    }
})
server.listen(777)


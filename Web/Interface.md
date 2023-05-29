# 接口调用JSON
## 登录
* 每次登陆的时候都会获得服务器返回的token, 往后其他api请求都应该带上这个token
```javascript
# HTTPRequest-Type: POST
# host: 120.77.13.22:777
# route: /login

request:
    {
        // Content-Type:"application/json",
        "usr":"Azusa",
        "passwd":"123456"
    }

response:
    {
        token:"2d26168b9a275c06eb7d657e733dcc89"
        msg: "0"
    }
```

## 注册
```javascript
# HTTPRequest-Type: POST
# host: 120.77.13.22:777
# route: /register

request:
    {
        // Content-Type:"application/json",
        "usr":"Azusa",
        "passwd":"123456"
    }

response:
    {
        "msg": "0"
    }
```
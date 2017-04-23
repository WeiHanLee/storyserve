var express = require('express');
var bodyParser = require('body-parser');
var morgon = require('morgan');

var config = require('./config');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var api = require('./index')(app, express, io);

//设置跨域访问  
app.all('*', function (req, res, next) {
    console.log("aaaa");
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

//    res.setHeader("Content-Type","text/plain");
//         res.setHeader("Access-Control-Allow-Origin","http://localhost:63342");

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(morgon(config.env))
    .use('/api', api);




server.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("listening port " + config.port);
    }
});
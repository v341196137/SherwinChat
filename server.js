/**
 * @fileoverview Server for SherwinChat
 */

const http = require("http");
const express = require("express");
const dt = require("./datetime.js");

const app = express();
const port = 5000;

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
    res.send("SherwinChat access time: " + dt.myDateTime());
}).listen(port);
console.log("Node server started on port "+port);

/*
server = http.createServer(function (req, res){
    res.writeHead(200, {"Content-Type": "text/plain"}); 
    let url = req.url;
    res.write("SherwinChat access time: " + dt.myDateTime());
    res.end();
});

server.listen(port, function(){
    console.log('Node server created on port '+port);
})
*/

/**
 * @fileoverview Server for SherwinChat
 */

var http = require("http");
var dt = require("./datetime.js");

http.createServer(function (req, res){
    res.writeHead(200, {"Content-Type": "text/plain"}); 
    let url = req.url;
    res.write("SherwinChat access time: " + dt.myDateTime());
    res.end();
}).listen(8080);
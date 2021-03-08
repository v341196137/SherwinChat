/**
 * @fileoverview Server for SherwinChat
 */

const port = 5000;
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(server);
server.listen(port);
var dt = require("./datetime.js");



app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
     //res.send("SherwinChat access time: " + dt.myDateTime());
});
console.log("Node server started on port "+port);

//this entire section somehow does not work (which is strange)
// I am a socket! I will direct you to where you need to go
io.on('connection', (socket) => {
    console.log("user connected at " + socket);
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () =>{
        console.log("user disconnected");
    });
});

// http.listen(port, () => {
//     console.log("listening");
// });


// server = http.createServer(function (req, res){
//     res.writeHead(200, {"Content-Type": "text/plain"}); 
//     let url = req.url;
//     // res.write("SherwinChat access time: " + dt.myDateTime());
//     res.end();
// });

// http.listen(port, function(){
//     console.log('Node server created on port ' + port);
// });


/**
 * @fileoverview Server for SherwinChat
 */

const port = 5000;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
server.listen(port);
const dt = require("./datetime.js");



app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
     //res.send("SherwinChat access time: " + dt.myDateTime());
});
console.log("Node server started on port "+port);

//this entire section somehow does not work (which is strange)
// I am a socket! I listen to all the requests :D
io.sockets.on('connection', function(socket) {
    console.log("user connected at " + socket);
    socket.emit("hi", "hi");
    socket.on('hello', function(h){
        console.log("ho");
        console.log(h);
    });
    socket.on('chat message', function(msg) {
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


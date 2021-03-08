/**
 * @fileoverview Server for SherwinChat
 */

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const dt = require("./datetime.js");

const port = 5000;
console.log(__dirname);
app.use(express.static(__dirname ));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
    // res.send("SherwinChat access time: " + dt.myDateTime());
}).listen(port);
console.log("Node server started on port "+port);

io.on('connection', (socket) => {
    console.log("user connected at " + socket);
    socket.on('disconnect', () =>{
        console.log("user disconnected");
    })
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


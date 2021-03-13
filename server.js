/**
 * @fileoverview Server for SherwinChat
 */

const /** number */ port = 5000;
const /** require */ express = require("express");
const /** express */ app = express();
const /** require */ http = require("http");
const /** server */ server = http.createServer(app);
const /** require */ io = require("socket.io")(server);
const /** require */ dt = require("./datetime.js");

server.listen(port);

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
     //res.send("SherwinChat access time: " + dt.myDateTime());
});
console.log("Node server started on port "+port);

//this entire section somehow does not work (which is strange)
// I am a socket! I listen to all the requests and send responses :D
io.sockets.on('connection', function(socket) {
    console.log("user connected at " + socket);
    socket.on('chat message', function(msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () =>{
        console.log("user disconnected");
    });
});

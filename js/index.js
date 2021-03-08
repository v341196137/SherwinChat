
const socket = io("localhost:5000");

console.log("is linked?");
console.log("YES!");

var form = document.getElementById('form');
var input = document.getElementById('message-box');

function start(){
    socket.emit('connection', socket);
}
function emitter(res, msg){
    socket.emit(res, msg);
}
// Server Connection Stuff
/*
socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
*/
// Event Listeners 
form.addEventListener('submit', function(e) {
    e.preventDefault();
    socket.emit("hello", "bye");
    console.log("this works right");
    emitter("hello", "bye");
    if (input.value ===("hello")) {
        console.log(input.value);
        
        socket.emit('chat message', input.value);
        input.value = '';
    }
});


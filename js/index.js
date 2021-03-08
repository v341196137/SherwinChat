
var socket = io();

console.log("is linked?");

var form = document.getElementById('form');
var input = document.getElementById('message-box');
function start(){
    socket.emit('connection', socket);
}
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
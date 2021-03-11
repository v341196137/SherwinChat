
// const socket = io("localhost:5000");
const socket = io.connect();

console.log("is linked?");
console.log("YES!");

var form = document.getElementById('form');
var input = document.getElementById('message-box');
var messages = document.getElementById("messages");

let red = 255;
let green = 0;
let blue = 0;
let dr = 0;
let dg = 1;
let db = 0;

function start(){
    socket.emit("hello", "yes");
    console.log(socket);
    updateColours();
}
function emitter(res, msg){
    socket.emit(res, msg);
}
// Server Connection Stuff

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("hi", (hi) => {
    console.log(hi);
});
// Event Listeners 
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // socket.emit("hello", "bye");
    // console.log("this works right");
    emitter("hello", "bye");
    if (input.value){// ===("hello")) {
        console.log(input.value);
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

function updateColours() {
    let root = document.documentElement;
    red += dr;
    green += dg;
    blue += db;
    if(red >= 255 && green <= 0){
      dr = 0;
      dg = 1;
      db = 0;
    }else if(red <= 0 && green >= 255 && blue <= 0){
      dr = 0;
      dg = 0;
      db = 1;
    }else if(red <= 0 && green <= 0 && blue >= 255){
      dr = 1;
      dg = 0;
      db = 0;
    }else if(red >= 255 && green >= 255){
      dr = -1;
      dg = 0;
      db = 0;
    }else if(blue >= 255 && green >= 255){
      dr = 0;
      dg = -1;
      db = 0;
    }else if(red >= 255 && blue >= 255){
      dr = 0;
      dg = 0;
      db = -1;
    }else if(red >= 255 && blue <= 0){
      dr = 0;
      dg = 1;
      db = 0;
    }
    root.style.setProperty('--red', red);
    root.style.setProperty('--green', green);
    root.style.setProperty('--blue', blue);
    root.style.setProperty('--invRed', 255 - red);
    root.style.setProperty('--invGreen', 255 - green);
    root.style.setProperty('--invBlue', 255 - blue);
    setTimeout(updateColours, 50);
  }
  updateColours();
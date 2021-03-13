/**
 * @fileoverview client side JS
 */

const /** socket */ socket = io.connect();
var /** form */ form = document.getElementById('form');
var /** input */ input = document.getElementById('message-box');
var messages = document.getElementById("messages");

let /** number */ red = 255;
let /** number */ green = 0;
let /** number */ blue = 0;
let /** number */ dr = 0;
let /** number */ dg = 1;
let /** number */ db = 0;

/**
 * Functionality of client 
 */
openForm();
document.getElementById("user-login").addEventListener("click", userLogin);
document.getElementById("guest-login").addEventListener("click", guestLogin);

function userLogin(){
    closeForm();
}
function guestLogin(){
    closeForm();
}
function openForm(){
    document.getElementById("user-popup").style.display="block";
    document.getElementById("user-popup").style.opacity="100%";
    document.getElementById("home-overlay").style.opacity="50%";
}
function closeForm(){
    document.getElementById("user-popup").style.display="none";
    document.getElementById("home-overlay").style.opacity="100%";
}
/**
 * Starts the socket
 */
function start(){
    console.log(socket);
    updateColours();
}
// Server Connection Stuff

socket.on('chat message', function(msg) {
    var item = document.createElement('div');
    item.className = "message";
    item.textContent = msg;
    
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('login', function(msg){
    

});

// Event Listeners 
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value){
        console.log(input.value);
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

/**
 * Updates the colours for RGB cyclic
 */
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
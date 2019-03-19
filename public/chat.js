// Socket Client-side
var socket = io();


// Initialize Variables
let userMessage = document.getElementById('userMessage');
let userName = document.getElementById('userName');
let messageBox = document.getElementById('messages');



socket.on('broadcast',(data) => {
    console.log(data.text);
})


function sendMessage(){
    let name = userName.textContent;
    if(name){
        socket.emit('msg', {name: name});
    }
}











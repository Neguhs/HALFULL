
var socket = io();

let messageField = document.getElementById('messageField');
let username = document.querySelector('.userName');
let form = document.getElementById('message-form');
let button = document.getElementById('sendBtn');
let chatBox = document.getElementById('messages');
let onlineUsers = document.getElementsByClassName('onlineUser');

let currentID;
for(i=0; i< onlineUsers.length; i++){
    onlineUsers[i].addEventListener('click',(e)=>{
        e.target.parentElement.style.backgroundColor = 'rgba(211,211,211,0.5)';
        let user = e.target.textContent;
        let name = user.trim();
        socket.emit('requestChatID',({name}));
        socket.on('sendChatID',(data)=>{
            currentID = data.userID;
            // socket.emit('privateMsg',({id , msg}))
        })
        
    })
}
 const privateMessage = (currentID) =>{
     let id = currentID;
     let msg = messageField.value;
     let user = username.textContent;
     socket.emit('privateMsg',({id , user , msg}));
     messageField.value = '';
 }

form.addEventListener('submit',(e) => {
    e.preventDefault();
    privateMessage(currentID);
})


socket.on('super',(data)=>{
    chatBox.append(constructMsg(data));
})



socket.on('chat message',(data) => {
    chatBox.append(constructMsg(data));
})

const constructMsg = (data) => {
    let node = document.createElement('li');
    let text = document.createTextNode(data.msg);
    let name = document.createTextNode(data.user + ":" + " ");
    node.appendChild(name);

    node.appendChild(text);
    return node;

}


socket.on('chat id',() =>{
    let user = username.textContent;
    let id =  socket.id;
    name = user.trim();
    socket.emit('user',{name,id});
})





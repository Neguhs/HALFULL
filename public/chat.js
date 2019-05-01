

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
 }




console.log(chatBox);


console.log(form);
console.log(button);


form.addEventListener('submit',(e) => {
    e.preventDefault();
    privateMessage(currentID);
    // sendMessage();
})


socket.on('super',(data)=>{
    // console.log(data);
    // console.log(data.msg);
    chatBox.append(constructMsg(data));
})



// const  sendMessage = () => {
//     let msg = messageField.value;
//     let user = username.textContent;
//     socket.emit('chat message', ({msg , user}))
//     console.log(socket.id);
//     messageField.value = '';
// }


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







// (getMessage = () => {
//     socket.on('chat message' ,(msg) => {
//         console.log('Hello');
//     })
// })();











// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     sendMessage();
// })



// const sendMessage = () => {
//     let userMsg = messages.val();
//     console.log(userMsg);
//     messages.val('');
// }









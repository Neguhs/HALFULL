const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const http = require('http');
const User = require("./model/user");
const server = http.createServer(app);
const io = require('socket.io').listen(server)
server.listen('3000');
require('./config/passport')(passport);

const connectionString = "mongodb+srv://Negus:treefort943@hfcluster-qp7sv.mongodb.net/test?retryWrites=true";

// Connect Database 
mongoose.connect(connectionString,{useNewUrlParser: true})
.then(()=> console.log('Database Connected'))
.catch(err => console.log(err));


// Ejs Templates
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({ extended: false}));

// Express Session 
app.use(session({
    secret: 'get the help you need',
    resave: true,
    saveUninitialized: true
}))

// Passport 
app.use(passport.initialize());
app.use(passport.session());

//Connect flash 
app.use(flash());

//Middleware 
app.use((req,res,next) => {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/',require('./routes/dashboard/dashboard'));
// Listen for server 
// const port = process.env.port || 3000;
// app.listen( port, () => console.log('Server is running'))



io.on('connection' , (socket) =>{
    console.log('a user connected');
    io.emit('chat id');
    socket.on('user' ,(data) =>{
        User.findOneAndUpdate({name: data.name}, {$set:{chatID : data.id , status: true}}, (err, founduser)=>{
            if(err){
                console.log(err)
            } else {
                console.log("Success");
            }
        })
    });


    socket.on('requestChatID',(data)=>{
        User.findOne({name: data.name} ,(err, founduser)=>{
            let userID = founduser.chatID;
            socket.emit('sendChatID',({userID}));
        })
    })


    socket.on('privateMsg',(data)=>{
        let info = data;
        io.to(data.id).emit('super',(info));
    })

    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });

    socket.on('chat message' ,(data) => {
        io.emit('chat message' , data);
    })
})
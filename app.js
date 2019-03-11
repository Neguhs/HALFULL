

const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const port = process.env.port || 3000;

require('./config/passport')(passport);



// Connect Database 
mongoose.connect("mongodb://localhost:27017/halfull",{useNewUrlParser: true})
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

// Listen for server 
app.listen( port, () => console.log('Server is running'))




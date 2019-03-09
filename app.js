const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Connect Database 
mongoose.connect("mongodb://localhost:27017/halfull",{useNewUrlParser: true})
.then(()=> console.log('Database Connected'))
.catch(err => console.log(err));

// Ejs Templates
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({ extended: false}));

//Routes
app.use('/',require('./routes/index'));

const port = process.env.port || 3000;

app.listen( port, () => console.log('Server is running'))
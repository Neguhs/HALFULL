const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.render('home');
})

app.get('/about',(req,res) => {
    res.render("about");
})

app.get('/signup',(req,res)=> {
    res.render("signup");
})

app.get('/login',(req,res) => {
    res.render("login");
})





const port = process.env.port || 3000;
app.listen(port,() => console.log('Server is running'))
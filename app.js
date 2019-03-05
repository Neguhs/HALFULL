const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.render('home');
})

app.get('/about',(req,res) => {
    res.render("about")
})





const port = process.env.port || 3000;
app.listen(port,() => console.log('Server is running'))
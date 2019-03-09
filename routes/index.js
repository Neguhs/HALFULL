const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user');

// Routes 
router.get('/',(req, res) => {
    res.render('home');
})

router.get('/about',(req,res) => {
    res.render("about");
})

router.get('/signup',(req,res)=> {
    res.render('signup.ejs');
})

router.get('/login',(req,res) => {
    res.render('login');
})


router.post('/signup',(req,res) => {
    const { name , password , confirmPassword } = req.body;
    let errors = [];


    // Check required fields 
    if(!name || !password || !confirmPassword) {
        errors.push({msg: 'Please fill in all fields'});
    }

    if(password !== confirmPassword) {
        errors.push({msg: 'Passwords do not match'})
    }

    if(errors.length > 0) {
        res.render('signup' , {errors})
    } else {
        // Validation passed 
        User.findOne((err, user) => {
            if(err) {
                errors.push({msg: 'Sorry this user already exist'});
                res.render('signup', {errors})
            } else {
                const newUser = new User({name , password});
                console.log(newUser);
                res.send("hello");
            }
        })
    }
});

module.exports = router;

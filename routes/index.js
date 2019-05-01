const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');
const User = require("../model/user");
const Story = require("../model/story");


// Routes 
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about");
});


router.get("/stories",  (req,res) => {
  Story.find({}, (err, allStories )=> {
    if(err){
      console.log(err);
    } else {
      res.render('stories.ejs', {Stories : allStories});
    }
  })
});

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout",(req, res) => {
  req.logout();
  req.flash('successMsg', 'You have logged out');
  res.redirect('login');
});


// Signup handle
router.post("/signup", (req, res) => {
  const { name, password, confirmPassword } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !password || !confirmPassword) {
    errors.push({ msg: "Please fill in all fields" });
  }
  // Check if password match
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }
  // Check for errors if any  display them 
  if (errors.length > 0) {
    res.render("signup", { errors });
  } else {
    // Validation passed
    User.findOne({ name: name }, (err, user) => {
      if (user) {
        errors.push({ msg: "Sorry this user already exist" });
        res.render("signup", { errors });
      } else {
        const newUser = new User({ name, password });
        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              newUser.password = hash;
              newUser.save((err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  req.flash('successMsg', 'Your account has been created');
                  res.redirect('login');
                }
              });
            }
          });
        });
      }
    });
  }
});



// Login Handle 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: 'login',
    failureFlash: true
  })(req, res, next);
});





module.exports = router;

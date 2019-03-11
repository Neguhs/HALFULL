const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// load User Model
const User = require("../model/user");


module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'name'}, ( name , password , done) => {
    // Match user
    User.findOne({name : name}).then(user => {
        if(!user) {
          return done (null , false , {message: 'Username does not exist'});
        }
        //Match Password
        bcrypt.compare(password , user.password, (err, isMatch) => {
          if(err) throw err;

          if(isMatch) {
            return done (null , user);
          } else {
            return done(null, false , {message: 'Incorrect Password'});
          }
        });
    })
        .catch(err => console.log(err));
  }))


  
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
}





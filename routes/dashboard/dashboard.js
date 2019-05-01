const express = require("express");
const router = express.Router();
const Story = require('../../model/story');
const User = require('../../model/user');
const { checkAuth } = require('../../config/auth');





router.get('/dashboard' , checkAuth ,(req , res )=> {
  res.render('dashboard', { name : req.user.name});
})

router.get('/dashboard/chat' , checkAuth ,  (req, res) => {
  User.find({} , (err, allUsers) =>{
    if(err) {
      console.log(err)
    } else {
      res.render('chat' , {User : allUsers , name: req.user.name})
    }
  })
})


router.get('/dashboard/profile' , checkAuth , (req, res) => {
  res.render('profile', {name: req.user.name})
})


router.get('/dashboard/story' , checkAuth , (req, res) => {
  res.render('story' , {name: req.user.name});
})



//Story Submit Handle

router.post('/dashboard/story' , (req , res) => {
  console.log('Success');
  const {name , subject , post} = req.body;
    //Check subject and post fields 
    if(!subject || !post) {
      console.log("Please make sure a subject and post are filled out")
    } else {
      const newStory = new Story({name , subject , post});
      newStory.save((err , story) => {
        if(err){
          console.log("error:" + err)
        } else{
          res.redirect('/dashboard/story')
          console.log("Story Saved")
        }
      })
    }
})


module.exports = router;

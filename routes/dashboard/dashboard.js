const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../config/auth');





router.get('/dashboard/' , checkAuth ,(req , res )=> {
  res.render('dashboard', { name : req.user.name});
})




module.exports = router;

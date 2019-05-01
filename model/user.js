const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    status:{
        type:Boolean
    },
    chatID:{
        type:String
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
const mongoose = require('mongoose');

var storySchema = new mongoose.Schema({
    name: {
        type: String
    },
    subject:{
        type:String 
    },
    post: {
        type:String
    }
});

const Story = mongoose.model('Story',storySchema);

module.exports = Story;
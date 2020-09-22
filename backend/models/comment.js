const mongoose = require('mongoose')

var repliesSchema = new mongoose.Schema({
    author: {type: String, required: true},
    content: {type: String, required: true},
})
var commentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    content: {type: String, required: true},
    replies: [repliesSchema]
});

module.exports = mongoose.model('comment', commentSchema)
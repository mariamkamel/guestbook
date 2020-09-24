const mongoose = require('mongoose')

var repliesSchema = new mongoose.Schema({
    author:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {type: String, required: true},
})
var commentSchema = new mongoose.Schema({
    author:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {type: String, required: true},
    replies: [repliesSchema]
});

module.exports = mongoose.model('comment', commentSchema)
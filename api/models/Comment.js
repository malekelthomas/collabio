const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    replies: {
        type:[CommentSchema],
        default: undefined
    },
    timePosted: {
        type: Date,
        default: Date.now
    },
    likes: Number,
});



module.exports = mongoose.model('Comment', CommentSchema);
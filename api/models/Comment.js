const mongoose = require('mongoose');


const baseCommentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    timePosted: {
        type: Date,
        default: Date.now
    },
    comment:String,
    likes: Number,
});

const CommentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    replies: {
        type:[baseCommentSchema],
    },
    timePosted: {
        type: Date,
        default: Date.now
    },
    comment: String,
    likes: Number,
});


const InitComment = mongoose.model('Comment', CommentSchema)
const ReplyComment = mongoose.model('ReplyComment', baseCommentSchema);
module.exports = {
    InitComment,
    ReplyComment
}
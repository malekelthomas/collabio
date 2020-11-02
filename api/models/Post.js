const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    post_caption: String,
    author: {
        type: String,
        required: true
    },
    comments: Array,
    postType: String,
    timePosted: {
        type: Date,
        default: Date.now
    },
    likes: Number,
    post_content: {}

});



module.exports = mongoose.model('Post', PostSchema);
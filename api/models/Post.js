const mongoose = require('mongoose');
const Comment = require('./Comment').InitComment.schema;



const PostSchema = mongoose.Schema({
    post_caption: String,
    author: {
        type: String,
        required: true
    },
    comments: [Comment],
    post_type: {
        type:String,
        required: true
    },
    timePosted: {
        type: Date,
        default: Date.now
    },
    likes: Array,
    post_content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }

});



module.exports = mongoose.model('Post', PostSchema);
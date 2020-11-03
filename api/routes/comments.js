const express = require('express');

const router = express.Router({mergeParams: true});

const Post = require('../models/Post');

const InitComment = require('../models/Comment').InitComment;
const ReplyComment = require('../models/Comment').ReplyComment;
router.get('/', async (req, res) => {

    try {
        const post = await Post.findOne({"_id": req.params.post_id});
        let comments = post.comments;
        res.json({comments})
        
    } catch (err) {
        res.json({message:err});
    }

});

router.post('/comment/:from/', async (req, res) => {
    //from is the username of who is creating the comment
    const comment = new InitComment({
        author: req.params.from,
        comment: req.body.comment,
    })


    try {
        const post = await Post.findOne({"_id": req.params.post_id}, async (post_err, post_doc) => {
            post_doc.comments.push(comment);
            post_doc.save();
        });
        res.json({post})
        
    } catch (err) {
        res.json({message:err});
    }

});


router.post('/comment/reply/:from/:to/', async (req, res) => {
    //from is th username of who is creating the comment
    //to is the commentID of the comment they're replying to
    const replyComment = new ReplyComment({
        author: req.params.from,
        comment: req.body.comment,
    });

    try {
        const post = await Post.findOne({"_id": req.params.post_id}, async(post_err, post_doc) => {
            let commentToReplyTo = await post_doc.comments.forEach(comment => {
                if(comment._id == req.params.to){
                    comment.replies.push(replyComment)
                    post_doc.save();
                }
            });
        });
        res.json({post});
        
    } catch (err) {
        res.json({message:err})
    }


});






module.exports = router;
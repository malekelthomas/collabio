 const express = require('express');

 const router = express.Router({mergeParams: true});

const Post = require('../models/Post');

const commentsRoute = require('./comments');
router.use('/:post_id/comments', commentsRoute);
 router.get('/', async(req, res) => {

    try{
        const posts = await Post.find({"author": req.params.username});
        res.json(posts);
    } catch (err) {
        res.json({message:err});
    }

 });

 router.post('/create', async(req, res) => {
     const post = new Post({
         post_caption: req.body.post_caption,
         author: req.params.username,
         postType: req.body.postType,
         post_content: req.body.post_content
        });
        
    try {
        const savedPost = await post.save();
        res.json(savedPost);
     } catch (err) {
         res.json({message:err});
         
     }
 })


 module.exports = router;
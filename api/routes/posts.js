 const express = require('express');

 const router = express.Router({mergeParams: true});

const Post = require('../models/Post');
const { post } = require('./comments');

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
         post_type: req.body.post_type,
         post_content: req.body.post_content
        });
        
    try {
        const savedPost = await post.save();
        console.log(post.post_type)
        res.json(savedPost);
     } catch (err) {
         res.json({message:err});
         
     }
 })

 router.put('/like', async(req,res) => {
    const postToUpdate = await Post.findOne({"_id": req.body.post._id}, (post_err, post_doc) =>{
        if(post_doc.likes.length == 0 || !post_doc.likes.includes(req.body.liker)){
            post_doc.likes.push(req.body.liker);
            post_doc.save()
            console.log(post_doc)
        }
    });
    //console.log(postToUpdate)
 })
 router.put('/unlike', async(req,res) => {
    const postToUpdate = await Post.findOne({"_id": req.body.post._id}, (post_err, post_doc) =>{
        if(post_doc.likes.includes(req.body.unliker)){
            const index = post_doc.likes.indexOf(req.body.unliker)
            if(index > -1){
                post_doc.likes.splice(index, 1);
            }
            post_doc.save()
            console.log(post_doc)
        }
    });
    //console.log(postToUpdate)
 })


 module.exports = router;
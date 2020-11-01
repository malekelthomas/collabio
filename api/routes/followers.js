const express = require('express');

const router = express.Router({mergeParams: true});

const User = require('../models/User');


router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({"user_name" : req.params.username});
        console.log(user.followers);
        res.json(user.followers); 
    } catch (err) {
        res.json({message:err});
    }
});


router.post('/add', async (req, res) => {
    try {
        let follower = req.body.follower;
        let foundFollower;
        const user = await User.findOne({"user_name" : req.params.username}, async (user_err, user_doc)=>{
                follower = await User.findOne({"user_name" : follower}, async (follower_err, follower_doc) =>{
                    follower_doc.followers.push(user.user_name);
                    foundFollower = follower_doc;
                    follower_doc.save()
                });
                if(!user_doc.following.includes(foundFollower.user_name)){
                    user_doc.following.push(foundFollower.user_name);
                    user_doc.save()
                }
                
        })
        //user.followers.push(follower)
        //follower.following.push(user)
    } catch (err) {
        res.json({message:err});
    }
});


router.delete('/remove/:userToRemove', async (req, res) => {
    try {
        let userToRemove = req.params.userToRemove;
        let foundUserToRemove;
        const user = await User.findOne({"user_name" : req.params.username}, async (user_err, user_doc)=>{
                follower = await User.findOne({"user_name" : userToRemove}, async (userToRemove_err, userToRemove_doc) =>{
                    userToRemove_doc.followers = userToRemove_doc.followers.filter(el => el !== user.user_name);
                    foundUserToRemove = userToRemove_doc;
                    userToRemove_doc.save()
                });
                console.log("remove",foundUserToRemove)
                user_doc.following = user_doc.following.filter(el => el !== foundUserToRemove.user_name);
                user_doc.save()
        })
        //user.followers.push(follower)
        //follower.following.push(user)
    } catch (err) {
        res.json({message:err});
    }
});


module.exports = router;

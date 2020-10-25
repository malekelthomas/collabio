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
        const user = await User.findOne({"user_name" : req.params.username})
        let follower = req.body.follower;
        follower = User.find({"user_name" : follower});
        console.log(follower)
        user.followers.push(follower)
    } catch (err) {
        res.json({message:err});
    }
});


module.exports = router;

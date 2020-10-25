const express = require('express');

const router = express.Router();

const User = require('../models/User');

//middleware
const followersRoute = require('./followers');
const followingRoute = require('./following');
router.use('/:username/followers', followersRoute);
router.use('/:username/following', followingRoute);


//const crypto = require('crypto');
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        console.log(users);
        res.json(users);
    } catch (err) {
        res.json({message:err});
    }
});


router.post('/',  async (req, res) => {
    //let pwd = req.body.password
    //const hash = crypto.createHash('sha256').update(pwd).digest('base64');
    const user = new User({
        user_name: req.body.user_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    });

    
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err) {
        res.json({message: err});
    }

    
});

router.get('/:username', async (req,res) => {
    try {
        const user = await User.find({"user_name": req.params.username});
        console.log(user)
        res.json(user);
    } catch (err) {
        res.json({message: err});
        
    }
})


router.delete('/:username', async (req,res) => {
    try {
        const removedUser = await User.deleteOne({user_name: req.params.username});
        console.log(removedUser)
        res.json(removedUser)
    } catch (err) {
        res.json({message: err});

    }
})

router.patch('/updateUserName/:username', async (req,res) => {
    try {
        console.log(req.params.username)
        console.log(req.body.user_name)
        const updatedUser = await User.updateOne({user_name: req.params.username}, {$set:{"user_name":req.body.user_name}});
        console.log(updatedUser)
        res.json(updatedUser)
    } catch (err) {
        res.json({message: err});

    }
})

router.patch('/updateFirstName/:firstname', async (req,res) => {
    try {
        console.log(req.params.firstname)
        console.log(req.body.first_name)
        const updatedUser = await User.updateOne({first_name: req.params.firstname}, {$set:{"first_name":req.body.first_name}});
        console.log(updatedUser)
        res.json(updatedUser)
    } catch (err) {
        res.json({message: err});

    }
})

router.patch('/updateLastName/:lastname', async (req,res) => {
    try {
        console.log(req.params.lastname)
        console.log(req.body.last_name)
        const updatedUser = await User.updateOne({last_name: req.params.lastname}, {$set:{"last_name":req.body.last_name}});
        console.log(updatedUser)
        res.json(updatedUser)
    } catch (err) {
        res.json({message: err});

    }
})




module.exports = router;
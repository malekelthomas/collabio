const express = require('express');

const router = express.Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv/config')

//middleware
const followersRoute = require('./followers');
const followingRoute = require('./following');
router.use('/user/:username/followers', followersRoute);
router.use('/user/:username/following', followingRoute);

const auth = require('../auth');
//const crypto = require('crypto');
router.get('/', auth, async (req, res) => {
 
        jwt.verify(req.token, process.env.SECRET_KEY, async (err, decoded) => {
            if(err){
                req.token = null;
                await res.status(401).send({err});
            }else{
                console.log("this is decoded", decoded);
                const users = await User.find()
                console.log(users);
                res.json(users);
            } 
        })
        
  
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

router.get('/user/searchByEmail/:email', async (req,res) => {
    try {
        const user = await User.findOne({"email": req.params.email});
        console.log(user)
        res.json(user);
    } catch (err) {
        res.json({message: err});
        
    }
})


router.get('/user/searchByUser/:username', async (req,res) => {
    try {
        const user = await User.findOne({user_name: req.params.username});
        console.log(user)
        res.json(user)
    } catch (err) {
        res.json({message: err});

    }
})

router.delete('/user/searchByUser/:username', async (req,res) => {
    try {
        const removedUser = await User.deleteOne({user_name: req.params.username});
        console.log(removedUser)
        res.json(removedUser)
    } catch (err) {
        res.json({message: err});

    }
})

router.patch('/user/updateUserName/:username', async (req,res) => {
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

router.patch('/user/updateFirstName/:firstname', async (req,res) => {
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

router.patch('/user/updateLastName/:lastname', async (req,res) => {
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

router.get('/findUser/searchUser', async (req,res) =>{
    try{
        let searchTerm;
        if(req.query.user_name){
                searchTerm = req.query.user_name;
                const users = await User.find({"user_name": {"$regex":`${searchTerm}`,"$options":"i"}}, (err, docs) => { //match usernames that contain search term
                });
                res.json(users)
            }
            else{
                res.json({message:"enter search"})
            }
        }
        catch (err) {
            res.json({message:err})
        }
})




module.exports = router;
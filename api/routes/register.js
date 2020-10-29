const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User');
require('dotenv/config');


router.post('/', async (req, res) =>{
    try{
        const user = await User.findOne({"email":req.body.email})
        if(user == null){ //user doesn't exist
            const newUser = User({
                user_name: req.body.user_name,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password

            })
            

            const savedUser = await newUser.save();
            res.json(savedUser)

        }
        else{
            res.json({message:"User exists"})
        }

    }
catch (err) {
        res.json({message:err});
    }

})

module.exports = router;
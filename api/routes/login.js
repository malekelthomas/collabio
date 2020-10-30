const express = require('express');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User');
require('dotenv/config');


router.post('/', async (req, res) => {
    try{
        const user = await User.findOne({"email":req.body.email})
        user.comparePassword(req.body.password, function(err, isMatch){
            if(isMatch){
                jwt.sign({user:user},process.env.SECRET_KEY, (err, token) => {
                    res.json({
                        token
                    });
                })
            }
            else{
                res.json({message:"Login details incorrect!"})
            }
        })
    }catch (err){
        res.json({message:"Login details incorrect!"})
    }
})

module.exports = router;
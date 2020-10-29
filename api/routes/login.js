const express = require('express');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User');
require('dotenv/config');


router.post('/', async (req, res) => {
    try{
        const user = await User.findOne({"email":req.body.email})
        let match = bcrypt.compare(user.password, req.body.password)
        if (match){
            jwt.sign({user:user},process.env.SECRET_KEY, (err, token) => {
                res.json({
                    token
                });
            })
        }
    } catch (err) {
        res.json({message:err});
    }

})

module.exports = router;
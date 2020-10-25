const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({"user_name" : req.params.username});
        console.log(user.following);
        res.json(user.following); 
    } catch (err) {
        res.json({message:err});
    }
});


module.exports = router;

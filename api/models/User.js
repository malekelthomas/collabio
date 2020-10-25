const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    user_name: {
        type:String,
        required: true,
        unique: true,
        },
    first_name: {
        type:String,
        required: true
        },
    last_name: {
        type:String,
        required: true
        },
    password: {
        type:String,
        required: true
        },
    followers: {
        type: Array
    },
    following: {
        type: Array 
    }
});

module.exports = mongoose.model('User', UserSchema);
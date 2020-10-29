const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    user_name: {
        type:String,
        required: true,
        unique: true,
        },
    email: {
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

UserSchema.pre('save', function(next){ // before saving user model
    let user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.methods.comparePassword = function(passwordEntered, cb){
    bcrypt.compare(passwordEntered, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch)
    })
};

module.exports = mongoose.model('User', UserSchema);
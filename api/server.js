const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const jwt = require('jsonwebtoken');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//import routes
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
//const followersRoute = require('./routes/followers');
const auth = require('./auth');

app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
//app.use('/followers', followersRoute);

//routes
app.get('/', auth, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }
        else {

            res.json({message:"We are on home", authData});
        }
    })
});
//connect to db
mongoose.connect(process.env.MONGO_CONNECTION, {useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify:false, useCreateIndex:true}, () => {
    console.log('Connected to DB!');
});


//listening on server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
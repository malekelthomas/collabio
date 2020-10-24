const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//import routes
const usersRoute = require('./routes/users');
//const followersRoute = require('./routes/followers');

app.use('/users', usersRoute);
//app.use('/followers', followersRoute);

//routes
app.get('/', (req, res) => {
    res.send("We are on home");
});
//connect to db
mongoose.connect(process.env.MONGO_CONNECTION, {useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify:false, useCreateIndex:true}, () => {
    console.log('Connected to DB!');
});


//listening on server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
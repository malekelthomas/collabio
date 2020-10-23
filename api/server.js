const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//import routes
const usersRoute = require('./routes/users');

app.use('/users', usersRoute);

//connect to db
mongoose.connect(process.env.MONGO_CONNECTION, {useUnifiedTopology:true, useNewUrlParser:true}, () => {
    console.log('Connected to DB!');
});

//listening on server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
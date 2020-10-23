const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

mongoose.connect(process.env.MONGO_CONNECTION, {useUnifiedTopology:true, useNewUrlParser:true}, () => {
    console.log('Connected to DB!');
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
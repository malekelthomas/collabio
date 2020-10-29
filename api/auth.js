const User = require('./models/User');

module.exports = function(req, res, next){
    bearerHeader = req.headers["authorization"];
    if(bearerHeader){
        bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else{
        console.log(bearerHeader)
        res.sendStatus(403)
    }
}
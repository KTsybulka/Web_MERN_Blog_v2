// middleware that checks the token
const jwt = require("jsonwebtoken");
const checkAuth = (req, res, next) => {
    // get a token from a user by getting a part of a string
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try{
       //decrypt the received token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Attach the user ID to the request object
            req.userId = decoded.id;
            // Proceed to the next middleware or route handler
            next();
        }catch(error){
            return res.status(401).json({
                message: 'No access'
            });
        }
    }else{
        return res.status(401).json({
            message: 'No access'
        });
    }
}

module.exports =checkAuth;
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const asyncHandler = require("express-async-handler");
const { JWT_SECRET } = require('../../key');

const protect = asyncHandler(async (req, res ,next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token,JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error){
            res.status(201).json({
                status:false,
                error:err,
                msg:'Not authorized, token failed' 
            })
        }
    }

    if(!token){
        res.status(201).json({
            status:false,
            msg:'Not authorized, no token' 
        })
    }

})

module.exports = { protect };
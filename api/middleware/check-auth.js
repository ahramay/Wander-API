const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../../key');
const User = require('../model/userModel');


module.exports = (req,res,next) => {
    
    const {authorization} = req.headers
    if(!authorization){
        return res.status(201).json({error:"you must be logged in"})
    }

    const token = authorization.replace("Bearer ","")
     jwt.verify(token,JWT_SECRET,(err,payload)=>{
         if(err){
             return res.status(201).json({error:"you must be loggedin"})
         }
         const {_id} = payload
         User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        }) 
       
     })

}
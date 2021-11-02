const asyncHandler = require("express-async-handler");
const Intrest = require('../model/intrestModel');
const User = require('../model/userModel');

const interest  = asyncHandler (async(req , res) => {
    const {interests } = req.body;
    
    if(!interests ) {
        res.status(201).json({
            status:false,
            msg:"Please Fill all the Feilds"
        })
    } else{
        const intrest =  new Intrest({
            user: req.user._id, 
            interests,
        });
        
        const interest = await intrest.save();
 
        res.status(200).json({
         status:true,
         interest,
         });
    }
 });

 module.exports = { interest };
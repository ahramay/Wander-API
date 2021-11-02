const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ObjectId} = mongoose.Schema.Types
const intrestSchema = new mongoose.Schema({
    interests:{
        type:Array,
    },
    interestsBy:{
        type:ObjectId,
        ref:"user"
    },
    userId:{
        type:String,
    },
});


const Intrest = mongoose.model('intrest',intrestSchema);

module.exports = Intrest;
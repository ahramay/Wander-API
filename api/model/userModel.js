const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    email:{
        type:String,   
    },

    password:{
        type:String,
    },
    diviceId:{
        type:String,
    },
    Osname:{
        type:String,
    },
     firstname:{
        type:String
    },
    lastname:{
        type:String,
    },
    
    preferedname:{
        type:String,
    },
    dateofbirth:{
        type:Array,
    },
    
    gender:{
        type:String,
      
    },
    connectwith:{
        type:String,
    },
    referralcode:{
        type:Number,
    },
    homelocation:{
        type:String,
    },
    interests:{
        type:Array,
    },
    image:{
        type:String,
    },
    
    likes:[{
        type:ObjectId,
        type:Array,
        ref:"user"
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"
    },
    Feedback:[{
        type:ObjectId,
        type:Array,
        ref:"user"
    }],
    postedBy:{
        type:ObjectId,
        ref:"user"
    }

});

userSchema.pre("save", async function (next){
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user',userSchema);

module.exports = User;
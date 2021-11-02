const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../middleware/generateToken");

const signup = asyncHandler(async (req, res) => {
  const { email, password, diviceId, Osname } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(201).json({
      status: false,
      msg: "Mail exists",
    });
  }
  const user = await User.create({
    email,
    password,
    diviceId,
    Osname,
  });
  if (user) {
    res.status(200).json({
      status: true,
      _id: user._id,
      email: user.email,
      diviceId: user.diviceId,
      Osname: user.Osname,
      token: generateToken(user._id),
    });
  } else {
    res.status(201).json({
      status: false,
      msg: "Email or password invalid",
    });
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password, diviceId, Osname } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))){
    res.json({
      status: true,
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(201).json({
      status: false,
      msg: "password or email invalid",
    });
  }
});
const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.preferedname = req.body.preferedname ||  user.preferedname;
    user.dateofbirth  = req.body.dateofbirth || user.dateofbirth;
    user.gender = req.body.gender || user.gender;
    user.connectwith = req.body.connectwith || user.connectwith;
    user.referralcode = req.body.referralcode || user.referralcode;
    user.homelocation = req.body.homelocation || user.homelocation;
    user.image = req.body.image || user.image;
    if(req.body.password){
        user.password = req.body.password;
    }
    const profile = await user.save();
    res.status(200).json({
        status:true,
        _id:profile._id,
        firstname:profile.firstname,
        lastname:profile.lastname,
        preferedname:profile.preferedname,
        dateofbirth:profile.dateofbirth,
        gender:profile.gender,
        connectwith:profile.connectwith,
        referralcode:profile.referralcode,
        homelocation:profile.homelocation,
        image:profile.image,
    })
}else{
    res.status(201).json({
        status:false,
        msg:"User not found",
    })
}

});

const interest  =  asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.interests = req.body.interests || user.interests;
  
      if(req.body.password){
          user.password = req.body.password;
      }
      const interest = await user.save();
      res.status(200).json({
          status:true,
          _id:interest._id,
          interests:interest.interests,
      })
  }else{
    res.status(201).json({
        status:false,
        msg:"User not found",
    })
}
  });
  const likes = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user.likes.includes(req.body.userId)) {
        await user.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json({
          status: true,
          msg: "this post has been liked",
        });
      } else {
        await user.updateOne({ $pull: { likes: req.body.userId } });
        res.status(201).json({
          status: false,
          msg: "this post has been disliked",
        });
      }
    } catch (err) {
      res.status(201).json(err);
    }
  });
  const report = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user.Feedback.includes(req.body.userId)) {
        await user.updateOne({ $push: { Feedback: req.body.userId } });
        res.status(200).json({
          status: true,
          msg: "this post has been Feedback",
        });
      } else {
        await user.updateOne({ $pull: { Feedback: req.body.userId } });
        res.status(201).json({
          status: false,
          msg: "this post has been disFeedback",
        });
      }
    } catch (err) {
      res.status(201).json(err);
    }
  });

  const userdata = asyncHandler(async (req, res) => {
    const obj = {};
    obj.user = await User.find(req.user._id);
    res.status(201).json({
         status:true,
         data: obj
         });
  });
  
module.exports = { signup, authUser, profile ,interest, likes,report,userdata};


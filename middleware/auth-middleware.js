const {loginSchema,signupSchema,otpSchema}=require('../Schema');
const User =require('../models/users');
const Otp = require('../models/otp');
const jwt=require('jsonwebtoken');

// Middleware to validate user input
const validateLoginUser=async(req,res,next)=>{
    let {error}= loginSchema.validate(req.body);
    if(error){
        next(new Error(error.message,404));
    }
    else{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        const isValidPassword=await user.comparePassword(password);
        if(user&&isValidPassword){
           next();
        }
        else{
          next(new Error("Invalid Credentials",404)); 
        }
    }
}

// Middleware to authenticate user at sign in
const vaildateSigninUser=async(req,res,next)=>{
    let {error}= signupSchema.validate(req.body);
    if(error){
      next(new Error(error.message,400))
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        next(new Error("Email already exists",404));
    }
    else{
        next();
    }
}

const validateToken = async(req,res,next)=>{
  // Validate JWT token here
  try {
    const token=req.header('Authorization').replace("Bearer ","").trim();
    const jwtVerified= jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (jwtVerified) {
    const user=await User.findById(jwtVerified.userId).select({password:0});
    req.session.verifiedUser=user;
    req.session.verifiedToken=token;
    req.session.verifiedId=user._id;
    next(); 
    } else {
      throw new Error("Token has been expired please login again")
    }
  } catch (error) {
    // console.log('hello')
    res.status(400).json({message:"Might be you are not having access of admin"});
  }
}


const validateUserOtp=async(req,res,next)=>{
  //Checking user is generating otp code only once at a time
  const existingUserOtp = await Otp.findOne({email:req.body.email});
  if(existingUserOtp){
    return res.status(404).json({message:"You have already requested for Otp please wait ...."});
  }
  else{
    next();
  }
}

const validateOTP=async(req,res,next)=>{
  //Validate OTP Here
  const {error}= otpSchema.validate(req.body);
  if(error){
    next(new Error(error.message,404));
  }
  else{
      const userOtp=req.body.otp;
      const mongoOtp = await Otp.findOne({otp:userOtp,});
    if(mongoOtp){
      next();
    }
    else{
        next(new Error("OTP is incorrect!",404));
    }
  }
};

const validateAdmin=async(req,res,next)=>{
  const adminUser = await User.findOne({email:req.body.email});
  if(adminUser.isAdmin){
    const token = await adminUser.generateJsonWebToken();
    res.json({token:token});
  }
  else{
    next();
  }
}

module.exports={validateLoginUser,vaildateSigninUser,validateOTP,validateUserOtp,validateAdmin,validateToken};
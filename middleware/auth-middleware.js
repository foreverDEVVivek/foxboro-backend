const {loginSchema,signupSchema,otpSchema}=require('../validation/Schema');
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
      try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        let isValidPassword;
        if(user) isValidPassword=await user.comparePassword(password);
        else next(new Error("Invalid Credentials",404));
        if(user&&isValidPassword){
           next();
        }
        else{
          next(new Error("Invalid Credentials",404)); 
        }
    }catch(error){
      next(new Error('Unable to login'));
    }
  }
}

// Middleware to authenticate user at sign in
const validateSigninUser=async(req,res,next)=>{
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
    res.status(400).json({message:"Something Broken! Try Again Later"});
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
      if(mongoOtp) next();
      else next(new Error("OTP is incorrect!",404));
  }
};

const validateAdmin=async(req,res,next)=>{
  const adminUser = await User.findOne({email:req.body.email}).select({password:0});
  if(adminUser.isAdmin){
    const token = await adminUser.generateJsonWebToken();
    res.json({token:token,message:"Your are admin",isAdmin:true});
  }
  else{
    next();
  }
}

module.exports={validateLoginUser,validateSigninUser,validateOTP,validateAdmin,validateToken};
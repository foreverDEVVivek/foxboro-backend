const {loginSchema,signupSchema,otpSchema}=require('../Schema');
const User =require('../models/users');
const Otp = require('../models/otp');


// Middleware to validate user input
const validateLoginUser=async(req,res,next)=>{
    let {error}= loginSchema.validate(req.body);
    if(error){
        next(new Error(error.message,404));
    }
    else{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(user&&user.password===password){
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
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        next(new Error("Email already exists"));
    }
    if(error){
        next(new Error(error.message,400))
    }
    else{
        next();
    }
}

const validateToken = async(req,res,next)=>{
  // Validate JWT token here
  const token =req.headers['authorization'];
  if(!token){
    return res.status(401).json({error:"No token provided"});
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(decoded)
    next();
    else return res.status(401).json({error:"No token provided"});
  }catch(e){
    return res.status(401).json({error:"Invalid token"});
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
      
      const mongoOtp = await Otp.findOne(
        {
          otp:userOtp,
        }
      );
    if(mongoOtp){
      next();
    }
    else{
        next(new Error("OTP is incorrect!",404));
    }
  }
};



module.exports={validateLoginUser,vaildateSigninUser,validateOTP,validateUserOtp};
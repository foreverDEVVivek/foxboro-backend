const jwt =require('jsonwebtoken');
const sendOtp=require('../utils/send-mailer.js');
const User=require('../models/users');
const Otp = require('../models/otp');
const { createTestAccount } = require('nodemailer');

const authLoginController = async (req, res) => {
  try {
    sendOtp(req.body.email)
    req.session.loggedInUserEmail=req.body.email;
    res.status(200).json({ message: "OTP Sent Successfully!"});
  } catch (error) {
    res.status(404).json({ message: "Something went wrong Try again after 10 minutes!"});
  }
};

const authLoginOtpController = async(req, res) =>{
  try {
    const user = await User.findOne({email:req.session.loggedInUserEmail}).select({password:0});
    const token=await user.generateJsonWebToken();
    res.header('Authorization',`Bearer ${token}`);
    res.json({ message: "Thank you for Log In",token:token});
  } catch (error) {
    new Error("Error while logging in",404);
  }
}

const authSigninController=async(req, res) => {
  try {
    sendOtp(req.body.email);
    req.session.user=req.body;
    res.json({ message: "Sign In Successful! OTP Sent" });
    
  } catch (error) {
      res.status(404).json({ message: "Something went wrong Try again after 10 minutes!"});    
  }
  }

const authSigninOtpController=async(req,res)=>{
   try {
  const newUser = await User(req.session.user);
  await newUser.save();
  const token = await newUser.generateJsonWebToken();
  res.header('Authorization',`Bearer ${token}`);
  res.json({ message: "Thank you for Sign In", isAdmin: false,token:token });
   } catch (error) {
    res.status(403).json({message:error.message, success:false})
   }
}
module.exports = { authLoginController,authSigninController,authSigninOtpController,authLoginOtpController };

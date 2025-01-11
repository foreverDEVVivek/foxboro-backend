const sendOtp = require("../utils/send-mailer.js");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const Otp = require("../models/otp");
const generateToken = require("../utils/generate-token.js");
const argon = require("argon2");

const authLoginController = async (req, res) => {
  try {
    //Sending the mail otp
    sendOtp(req.body.email);

    //getting user
    const user = await User.findOne({ email: req.body.email });
    
    //molding email into data
    const data={
      email:req.body.email,
      role:user.isAdmin
    };

    const authToken = await generateToken(data);

    res.status(200).json({ message: "OTP Sent Successfully!",success:true, authToken });
  } catch (error) {
    res
      .status(404)
      .json({ message: error, success:false });
  }
};

const authLoginOtpController = async (req, res) => {
  try {
    const autToken=req.header("Authorization").replace("Bearer ","").trim();
    const verifiedUser = jwt.verify(autToken, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      email: verifiedUser.email,
    }).select({ password: 0 });
    const token = await user.generateJsonWebToken();

    if(verifiedUser.role){
      res.json({message:"Thank you for Log In", token: token, success: true, isAdmin: true});
    }
    else{
    res.json({ message: "Thank you for Log In", token: token,success: true });
  }
  } catch (error) {
    new Error("Error while logging in", 404);
  }
};

const authSigninController = async (req, res) => {
  try {
    //Hashing the password before giving the jwt token
    const hash_password = await argon.hash(req.body.password, {
      type: argon.argon2id, // Use Argon2id for best balance between security and performance
      memoryCost: 2 ** 16, // Memory usage (64MB)
      timeCost: 3, // Number of iterations
      parallelism: 1, // Parallel threads
    });

    //Molding data into payload
    const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hash_password,
    };

    //Creating and sending token
    const authToken = await generateToken(data);

    res.status(200).json({message:"Otp sent successfully!", success: true, authToken });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Something went wrong Try again after 10 minutes!" });
  }
};

const authSigninOtpController = async (req, res) => {
  try {
    //Getting the token
    const token = req.header("Authorization").replace("Bearer ", "").trim();

    //Validating the token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //Looking that the user is already signed in or not
    const isUserExist = await User.findOne({ email: verifiedUser.email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    } else {
      //Storing the new user into DB
      const newUser = await User.create(verifiedUser);
    
      //
      //Generating new token
      const token = await newUser.generateJsonWebToken();

      res
        .status(200)
        .json({
          success: true,
          message: "User Registered Successfully",
          token,
        });
    }
  } catch (error) {
    res.status(403).json({ message: error.message, success: false });
  }
};

const authValidateIsAdmin = async(req,res)=>{
  try {
    const token = req.header('Authorization').replace("Bearer ","").trim();
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
     
    //Getting user data from DB by user id
    const user = await User.findById(verifiedUser.userId);
  
    if(!user){
      res.status(404).json({success:false, message: "User Not Found"})
      return;  //Returning here to prevent further execution if user not found.
    }

    if(!user.isAdmin){
      res.status(404).json({success:false, message: "You are not allowed to access this page"})
    }
    else{
      res.status(200).json({success:true, message:"You are allowed to access this page Admin"});
    }
  } catch (error) {
    res.status(403).json({ message: error.message, success: false });
  }
}
module.exports = {
  authLoginController,
  authSigninController,
  authSigninOtpController,
  authLoginOtpController,
  authValidateIsAdmin,
};

const express=require('express');
const authRouter= express.Router();
const authController= require('../controllers/auth-controller');
const {validateLoginUser,validateSigninUser,validateOTP,validateAdmin}=require('../middleware/auth-middleware');

//Sign In authentication user
authRouter.route('/signin')
.post(validateSigninUser,authController.authSigninController);

// Sign In OTP authentication user
authRouter.route('/signin/otp')
.post(validateOTP,authController.authSigninOtpController);

// Login authentication user
authRouter.route('/login')
.post(validateLoginUser,validateAdmin,authController.authLoginController)

//Login OTP authentication user
authRouter.route('/login/otp')
.post(validateOTP,authController.authLoginOtpController)

module.exports = authRouter;
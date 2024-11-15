const express=require('express');
const Router= express.Router();
const authController= require('../controllers/auth-controller');
const {validateLoginUser,vaildateSigninUser,validateOTP,validateUserOtp}=require('../middleware/auth-middleware');

//Sign In authentication user
Router.route('/signin')
.post(vaildateSigninUser,authController.authSigninController);

// Sign In OTP authentication user
Router.route('/signin/otp')
.post(validateOTP,authController.authSigninOtpController);

// Login authentication user
Router.route('/login')
.post(validateLoginUser,validateUserOtp,authController.authLoginController)

Router.route('/login/otp')
.post(validateOTP,authController.authLoginOtpController)

module.exports = Router;
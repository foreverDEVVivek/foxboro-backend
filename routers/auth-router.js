const express=require('express');
const authRouter= express.Router();
const authController= require('../controllers/auth-controller');
const {validateLoginUser,vaildateSigninUser,validateOTP,validateAdmin,validateUserOtp}=require('../middleware/auth-middleware');

//Sign In authentication user
authRouter.route('/signin')
.post(vaildateSigninUser,authController.authSigninController);

// Sign In OTP authentication user
authRouter.route('/signin/otp')
.post(validateOTP,authController.authSigninOtpController);

// Login authentication user
authRouter.route('/login')
.post(validateLoginUser,validateUserOtp,validateAdmin,authController.authLoginController)

authRouter.route('/login/otp')
.post(validateOTP,authController.authLoginOtpController)

module.exports = authRouter;
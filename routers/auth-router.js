const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-controller");
const {
  validateLogin,
  validateIsExist,
  validateRegister,
  validateOTP,
  validateIsRegistered,
  validateToken,
} = require("../middleware/auth-middleware");

//Sign In authentication user
authRouter
  .route("/signin")
  .post(validateRegister, validateIsExist, authController.authSigninController);

// Sign In OTP authentication user
authRouter
  .route("/signin/otp")
  .post(validateToken, validateOTP, authController.authSigninOtpController);

// Login authentication user
authRouter
  .route("/login")
  .post(
    validateLogin,
    validateIsRegistered,
    authController.authLoginController
  );

//Login OTP authentication user
authRouter
  .route("/login/otp")
  .post(validateToken, validateOTP, authController.authLoginOtpController);

//To Check A user is admin or not
authRouter
.route('/validate-isAdmin')
.get(validateToken,authController.authValidateIsAdmin);

module.exports = authRouter;

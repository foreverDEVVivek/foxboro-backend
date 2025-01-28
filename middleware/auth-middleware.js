const {
  loginSchema,
  signupSchema,
  otpSchema,
} = require("../validation/Schema");
const User = require("../models/users");
const Otp = require("../models/otp");
const jwt = require("jsonwebtoken");
const sendOtp = require("../utils/send-mailer");

// Middleware to validate user input
const validateLogin = async (req, res, next) => {
  try {
    let { error } = loginSchema.validate(req.body);
    if (error) {
      next(new Error(error.message, 404));
    } else {
      next();
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Middleware to authenticate user at sign in
const validateRegister = async (req, res, next) => {
  try {
    let { error } = signupSchema.validate(req.body);
    if (error) {
      next(new Error(error.message, 400));
    }
    next();
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

const validateToken = async (req, res, next) => {
  // Validate JWT token here
  try {
    if (!req.header("Authorization")) {
      res.status(403).json({ message: "No Token Provided", success: false });
    } else {
      const token = req.header("Authorization").replace("Bearer ", "").trim();
      if (!token) throw new Error("No token provided");

      const jwtVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!jwtVerified) {
        res.status(403).json({ message: "Invalid JWT token", success: false });
      } else {
        next();
      }
    }
  } catch (error) {
    if (error.message === "No token provided") {
      res.status(401).json({ message: "Authentication token is missing." });
    } else if (
      error.message === "You are not authorized to access this page "
    ) {
      res.status(403).json({ message: "Access denied." });
    } else if (
      error.message === "jwt malformed" ||
      error.message === "invalid signature"
    ) {
      res.status(401).json({ message: "Invalid or expired token." });
    } else {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
};

const validateOTP = async (req, res, next) => {
  //Validate OTP Here
  try {
    const authToken = req.header("Authorization").replace("Bearer ", "").trim();
    const verifiedUser = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    const { error } = otpSchema.validate(req.body);
    if (error) {
      next(new Error(error.message, 404));
    } else {
      const userOtp = req.body.otp;
      const mongoOtp = await Otp.findOne({
        otp: userOtp,
        email: verifiedUser.email,
      });
      if (mongoOtp) next();
      else next(new Error("OTP is incorrect!", 404));
    }
  } catch (error) { 
    logger.error(error.message)
    res.status(500).json({
      success: false,
      message: "Error while validating OTP",
      error: error.message,
    });
  }
};

const validateIsExist = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      next(new Error("Email already exists", 404));
    } else {
      sendOtp(req.body.email);
      next();
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message, success: false });
  }
};

const validateIsRegistered = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let isValidPassword = false;

    if (user) isValidPassword = await user.comparePassword(password);

    if (!user || !isValidPassword) {
      const error = new Error("Invalid Credentials");
      error.status = 404;
      return next(error);
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    logger.error(error.message)
    next(error); // Pass any unexpected errors to the global error handler
  }
};

module.exports = {
  validateLogin,
  validateIsRegistered,
  validateRegister,
  validateIsExist,
  validateOTP,
  validateToken,
};

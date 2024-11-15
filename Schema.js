// const Joi = require("joi");
// const loginSchema = Joi.object({
//   email: Joi.string()
//     .required()
//     .min(8)
//     .pattern(new RegExp("^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})"))
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
//     .max(255),

//   password: Joi.string()
//     .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
//     .required()
//     .min(8)
//     .max(255)
//     .messages({
//       "string.pattern.base":
//       "Password must include at least one letter, one number, and one special character.",
//       "string.min": "Password must be at least 8 characters long.",
//       "any.required": "Password is required.",
//     }),

//   otp: Joi.string()
//     .pattern(new RegExp("^([0-9]{6})"))
//     .required()
//     .messages({
//       "string.pattern.base": "OTP must be 6 digits.",
//     }), 
// }).required();

// const signupSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required().messages({
//     "string.empty": "Name is required.",
//     "string.min": "Name must be at least 3 characters long.",
//     "string.max": "Name must not exceed 30 characters.",
//   }),

//   email: Joi.string()
//     .required()
//     .min(8)
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
//     .pattern(new RegExp("^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})"))
//     .max(255),

//   password: Joi.string()
//     .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
//     .required()
//     .min(8)
//     .max(255)
//     .messages({
//       "string.pattern.base":
//         "Password must include at least one letter, one number, and one special character.",
//       "string.min": "Password must be at least 8 characters long.",
//       "any.required": "Password is required.",
//     }),

//   confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
//     "any.only": "Confirm Password must match Password.",
//     "string.empty": "Confirm Password is required.",
//   }),

//   phone: Joi.string()
//     .pattern(new RegExp("^[0-9]{10}$"))
//     .optional()
//     .messages({
//       "string.pattern.base": "Phone number must be 10 digits.",
//     }),
//   termsAccepted: Joi.boolean().valid(true).required().messages({
//     "any.only": "You must accept the terms and conditions.",
//   }),

//   otp: Joi.string()
//     .pattern(new RegExp("^[0-9]{6}$"))
//     .required()
//     .messages({
//       "string.pattern.base": "OTP must be 6 digits.",
//     }),
// });

// module.exports = { loginSchema,signupSchema };



const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .min(8)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .max(255),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"))
    .required()
    .min(8)
    .max(255)
    .messages({
      "string.pattern.base": "Password must include at least one letter, one number, and one special character.",
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
}).required();

//Joi Sign In schema 
const signupSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 255 characters.",
  }),

  email: Joi.string()
    .required()
    .min(8)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .max(255),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"))
    .required()
    .min(8)
    .max(255)
    .messages({
      "string.pattern.base": "Password must include at least one letter, one number, and one special character.",
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password.",
    "string.empty": "Confirm Password is required.",
  }),

  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{10}$"))
    .optional()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits.",
    }),

});

const otpSchema= Joi.object({
  otp: Joi.string()
    .pattern(new RegExp("^[0-9]{6}$"))
    .required()
    .messages({
      "string.pattern.base": "OTP must be 6 digits.",
    }),

})
module.exports = { loginSchema, signupSchema, otpSchema };


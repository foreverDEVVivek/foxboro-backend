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
const { default: mongoose } = require("mongoose");

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
    .min(13)
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

//Product Schema 

// Joi Schema for Category
const categorySchema = Joi.object({
  name: Joi.string()
    .valid("Machinery and Equipment", "Chemical Products", "Electrical Components")
    .required(),
  description: Joi.string().required(),
});

// Joi Schema for Sub-Category
const subCategorySchema = Joi.object({
  name: Joi.string()
    .valid("Construction Machinery", "Industrial Chemicals", "Semiconductors")
    .required(),
  description: Joi.string().min(10).required(),
});

// Joi Schema for Manufacturer
const manufacturerSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

// Joi Schema for Product
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  manufacturer: manufacturerSchema, // Nested Manufacturer Validation
  shortDescription: Joi.string().min(10).required(),
  quantity: Joi.number().min(1).required(),
  category: categorySchema, // Nested Category Validation
  subCategory: subCategorySchema, // Nested Sub-Category Validation
  image: Joi.array().items(Joi.string().uri()).min(1).required(),
  modelNo: Joi.string().min(3).required(),
  keyFactors: Joi.array().items(Joi.string()).min(1).required(),
  inrPrice: Joi.number().min(0).required(),
  usdPrice: Joi.number().min(0).required(),
  stock: Joi.number().min(0).max(10000).required(),
  specifications: Joi.array().items(Joi.string()).min(1).required(),
  longDescription: Joi.string().required(),
  GstRate: Joi.number().min(0).max(100).required(),
  moq: Joi.number().min(1).max(10000).required(),
  paymentType: Joi.array()
    .items(Joi.string().valid("Cash on Delivery", "Online Payment"))
    .min(1)
    .required(),
});


module.exports = { loginSchema, signupSchema, otpSchema, productSchema };


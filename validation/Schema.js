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

}).required();

const otpSchema= Joi.object({
  otp: Joi.string()
    .pattern(new RegExp("^[0-9]{6}$"))
    .required()
    .messages({
      "string.pattern.base": "OTP must be 6 digits.",
    }),
}).required();

// Joi Schema for Category
const categorySchema = Joi.object({
  name: Joi.string()
     .min(5)
    .required()
    .messages({
      "string.min": "Name must be at least 5 characters long.",
      "any.required": "Name is required.",
    }),

  description: Joi.string().min(5).messages({
    "string.min": "Description must be at least 5 characters long.",
    "any.required": "Description is required.",
  }).required(),
}).required();

// Joi Schema for Sub-Category
const subCategorySchema = Joi.object({
  name: Joi.string()
    .valid("Construction Machinery", "Industrial Chemicals", "Semiconductors")
    .required(),
  description: Joi.string().min(10).required(),
}).required();

// Joi Schema for Manufacturer
const manufacturerSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

// Joi Schema for Vendors
const vendorSchema = Joi.object({
  company: Joi.string().required().min(4),
  address: Joi.string().required().min(5),
  mobileNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
  concernedPerson: Joi.string().required().min(4),
  lastPurchaseDate: Joi.string().required(), // ISO date format for multipart
  lastPurchasedPrice: Joi.number().required(),
});

// Joi Schema for Product
const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  manufacturer: manufacturerSchema, // Nested Manufacturer Validation
  vendors: Joi.array().items(vendorSchema).required(), // Nested Vendor Validation
  shortDescription: Joi.string().min(10).required(),
  quantity: Joi.number().min(1).required(),
  category: categorySchema, // Nested Category Validation
  subCategory: subCategorySchema, // Nested Sub-Category Validation
  modelNo: Joi.string().min(3).required(),
  keyFactors: Joi.string() // Comma-separated values for array
    .custom((value, helpers) => {
      const factors = value.split(",").map((item) => item.trim());
      if (!factors.length) return helpers.error("any.invalid");
      return factors;
    })
    .required(),
  inrPrice: Joi.number().required(),
  usdPrice: Joi.number().required(),
  stock: Joi.number().min(0).max(10000).required(),
  specifications: Joi.string() // Comma-separated values for array
    .custom((value, helpers) => {
      const specs = value.split(",").map((item) => item.trim());
      if (!specs.length) return helpers.error("any.invalid");
      return specs;
    })
    .required(),
  longDescription: Joi.string().required(),
  GstRate: Joi.number().min(0).max(100).required(),
  moq: Joi.number().min(1).max(10000).required(),
  paymentType: Joi.string() // Comma-separated values for array
    .custom((value, helpers) => {
      const types = value.split(",").map((item) => item.trim());
      const validTypes = ["Cash on Delivery", "Online Payment"];
      const isValid = types.every((type) => validTypes.includes(type));
      if (!isValid) return helpers.error("any.invalid");
      return types;
    })
    .required(),
}).required();


//validate enquiry 
const enquirySchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
  description: Joi.string().min(10).required(),
})
module.exports = { categorySchema,loginSchema, signupSchema, otpSchema, productSchema,enquirySchema };


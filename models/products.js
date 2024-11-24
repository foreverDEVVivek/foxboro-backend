const mongoose = require("mongoose");

//Separate Category Schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Machinery and Equipment",
      "Chemical Products",
      "Electrical Components",
    ],
  },
  description: {
    type: String,
    required: true,
  },
});

//Separate Sub Category Schema
const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Construction Machinery", "Industrial Chemicals", "Semiconductors"],
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
});

//Separate Brand Schema
const manufacturerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
});

//Separate Associated Vendor Schema
const vendorSchema = mongoose.Schema({
   company:{
    type:String,
    required:true,
    minlength: 3,
   },
   address:{
    type: String,
    required:true,
    minlength: 10,
   },
   concernedPerson:{
    type: String,
    required:true,
    minlength: 3,
   },
   phoneNumber:{
    type: String,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits.'],
    required: false
   },
   mobileNumber:{
    type: String,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits.'],
    required: false
   },
   email:{
    type:String,
    match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email must be a valid Email.'],
    required:true,
   },
   lastPurchasedDate:{
    type: Date,
    required: true,
   },
   lastPurchasedPrice:{
    type: Number,
    required: true,
   }
});

//Product Schema
const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: manufacturerSchema,
    default: () => ({}),
  },
  vendors:{
    type: [vendorSchema],
    default: [],
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: 10,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: categorySchema,
    default: () => ({}),
  },
  subCategory: {
    type: subCategorySchema,
    default: () => ({}),
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  image: {
    type: [String],
    required: true,
  },
  modelNo: {
    type: String,
    required: true,
    minlength: 3,
  },
  keyFactors: {
    type: [String],
    required: true,
  },
  inrPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  usdPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  stock:{
    type:Number,
    required: true,
    min: 0,
    max: 10000,
  },
  specifications:{
    type: [String],
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  GstRate:{
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  moq:{
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
  paymentType:{
    type: [String],
    required: true,
    enum: ["Cash on Delivery", "Online Payment"],
  }
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;

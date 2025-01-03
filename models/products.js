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

// Counter Schema to maintain sequence
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

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
  code:{
    type: String,
    unique: true
  },
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
  hsnCode:{
    type:String,
    required: true,
    minlength: 5,
  },
  deliveryIn:{
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  dataSheet:{
    type: [String],
    required: true,
  },
  warranty:{
   type: String,
    required: true,
    minlength: 3,
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

// Pre-save hook to generate the code
productsSchema.pre('save', async function (next) {
  const product = this;

  // Only generate code if it's a new product
  if (!product.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: 'product' },               // Counter name
      { $inc: { seq: 1 } },              // Increment the sequence
      { new: true, upsert: true }        // Create if not exists
    );

    const seqNumber = counter.seq.toString().padStart(4, '0'); // Zero pad the sequence number
    product.code = `FIC${seqNumber}`;
    next();
  } catch (err) {
    next(err);
  }
});
const Product = mongoose.model("Product", productsSchema);

module.exports = Product;

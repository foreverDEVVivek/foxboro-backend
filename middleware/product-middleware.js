const { productSchema } = require("../validation/Schema.js");

// Middleware to validate product data
const validateProduct = async (req, res, next) => {
  
  const data ={
    name:req.body.name,
    price:req.body.price,
    manufacturer:JSON.parse(req.body.manufacturer),
    vendors:JSON.parse(req.body.vendors),
    shortDescription:req.body.shortDescription,
    quantity:req.body.quantity,
    category:JSON.parse(req.body.category),
    subCategory:JSON.parse(req.body.subCategory),
    review:JSON.parse(req.body.review),
    modelNo:req.body.modelNo,
    keyFactors:JSON.parse(req.body.keyFactors),
    inrPrice:req.body.inrPrice,
    usdPrice:req.body.usdPrice,
    stock:req.body.stock,
    specifications:JSON.parse(req.body.specifications),
    longDescription:req.body.longDescription,
    GstRate:req.body.GstRate,
    moq:req.body.moq,
    paymentType:JSON.parse(req.body.paymentType),
  }

  console.log(data);
  // const { error } = productSchema.validate(data);
  // if (error) {
  //   next(new Error(error.message, 400));
  // } else {
    // next();
  // }
};

module.exports = validateProduct;

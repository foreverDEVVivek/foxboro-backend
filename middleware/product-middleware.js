const {productSchema}=require("../validation/Schema.js");

// Middleware to validate product data
const validateProduct=async (req,res,next)=>{
    
 const {error}= productSchema.validate(req.body);
 if(error){
  next(new Error(error.message,400));
 }
 else{
  next();
 }
};

module.exports=validateProduct;
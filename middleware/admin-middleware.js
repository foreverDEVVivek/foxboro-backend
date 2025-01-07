const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const {categorySchema}=require('../validation/Schema')

const validateIsAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "").trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decoded.isAdmin) {
      next(new customError("You are not authorized to access this page."));
    } else {
      next();
    }
  } catch (error) {}
};

const validateCategory=async(req,res,next)=>{
  try {
    const {error}=categorySchema.validate(req.body);
    if(error){
      return res.status(404).json({message:error.message,success:false});
    }
    else{
      next();
    }
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

module.exports = { validateIsAdmin,validateCategory };

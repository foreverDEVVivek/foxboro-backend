const {enquirySchema}=require('../validation/Schema');

const validateEnquiry=async(req,res,next)=>{
    // Validate Enquiry Here
    const { error } = enquirySchema.validate(req.body);
    if (error) {
        res.status(400).json({message:error.message, success:false});
    } else {
        next();
    }
}

module.exports={validateEnquiry};
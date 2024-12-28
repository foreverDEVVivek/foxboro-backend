const { model } = require("mongoose");
const Enquiry = require("../models/enquiry");

// post enquiry 
const postEnquiry = async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({success:true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    res.status(400).json({success:false, message: error.message });
  }
};

module.exports={postEnquiry}
const { model } = require("mongoose");
const Enquiry = require("../models/enquiry");
const countryList=require('country-list');


//get all country
const getAllCountries = async (req,res)=>{
  try {
    const rawData= countryList.getData();
    const allCountry=rawData.map((country)=>{
      return {name:country.name};
    });
    res.status(200).json({ success: true, allCountry });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
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

module.exports={postEnquiry,getAllCountries}
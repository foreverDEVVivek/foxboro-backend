const express = require('express');
const Router=express.Router();
const enquiryController= require('../controllers/enquiry-controller');
const {validateEnquiry}=require('../middleware/enquiry-middleware');

//Enquiry routes if product is not available and for contact ...
Router.route('/')
.post(validateEnquiry,enquiryController.postEnquiry);

Router.route('/get-all-countries')
.get(enquiryController.getAllCountries);

module.exports=Router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email must be a valid Email.'],
        required:true,
    },

    phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Phone number must be 10 digits.'],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

const Enquiry = mongoose.model('Enquiry',enquirySchema);

module.exports = Enquiry;
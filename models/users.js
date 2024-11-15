const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: [3, 'Name must be at least 3 characters long.'],
        maxlength: [255, 'Name must not exceed 255 characters.']
    },

    phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Phone number must be 10 digits.'],
        required: false
    },
    
    email:{
        type:String,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Email must be a valid Email.'],
        required:true,
    },

    password:{
        type:String,
        required:true,
        match: [
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.'
          ],          
        minlength: [8, 'Password must be at least 8 characters long.'],
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

const User=mongoose.model('User', userSchema);

module.exports=User;
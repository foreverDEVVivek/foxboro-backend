const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
   
    isAdmin:{
      type: Boolean,
      default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

// Secure the password using pre method of mongoose and bcrypt package
userSchema.pre('save', async function(next){
  const currUser= this;
  if(!currUser.isModified('password')){
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password= await bcrypt.hash(currUser.password,saltRound)
    currUser.password=hash_password;
  } catch (error) {
     next(new Error('Unable to store password'));
  }
})

// Compare Password
userSchema.methods.comparePassword=async function (password){
    try {
        const hashedPassword = this.password;
        // console.log(hashedPassword)
        const isMatch= await bcrypt.compare(password,hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Unable to resolve password');
    }
}

// Json Web Token
userSchema.methods.generateJsonWebToken =async function (){
    // console.log(this._id)
    try {
        const token =jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            name:this.name,
            phone:this.phone,
            isAdmin:this.isAdmin,
        },

        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    return token;
    } catch (error) {
        throw new Error('Unable to generate JWT');
    }
}

const User=mongoose.model('User', userSchema);

module.exports=User;
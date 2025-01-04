const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const argon=require('argon2');

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
    if (currUser.password.startsWith("$argon2")) {
        return next(); // Skip hashing if the password is already hashed
      }
        const hash_password = await argon.hash(currUser.password, {
          type: argon.argon2id, // Use Argon2id for best balance between security and performance
          memoryCost: 2 ** 16, // Memory usage (64MB)
          timeCost: 3, // Number of iterations
          parallelism: 1, // Parallel threads
        });
        currUser.password = hash_password;
  } catch (error) {
     next(new Error('Unable to store password'));
  }
})

// Compare Password
userSchema.methods.comparePassword=async function (password){
    try {
        const hashedPassword = this.password;
        // console.log(hashedPassword)
        const isMatch= await argon.verify(hashedPassword,password);
        return isMatch;
    } catch (error) {
        throw new Error('Unable to resolve password',500);
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
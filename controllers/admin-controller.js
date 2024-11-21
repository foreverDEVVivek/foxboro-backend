const User = require('../models/users.js');
const jwt =require('jsonwebtoken');

const adminGreeting=async(req,res)=>{
    const admin= await User.findOne({isAdmin: true});
    const options = { expiresIn: 50*10 , issuer:'foxboro-api',audience:'consumer' };
    const token=jwt.sign({admin},process.env.JWT_SECRET_KEY,options);
    res.header('Authorization',`Bearer ${token}`)
    res.json({ message: "You are an admin"});
};

const adminPostProduct=async(req,res) => {
   res.json({message: "Protected Content"});    
};
module.exports = {adminGreeting,adminPostProduct};
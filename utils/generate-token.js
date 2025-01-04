const jwt=require('jsonwebtoken');


const generateToken=async(data)=>{
    try {
    // Generate JWT token
    const token = await jwt.sign( data , process.env.JWT_SECRET_KEY, { expiresIn: '600000' });
    return token;    
    } catch (error) {
    throw new Error(500,"Unable to generate JWT token");
    }
    
}

module.exports=generateToken;
const path=require('path');
const mongoose=require('mongoose');
const Router = require('./routers/auth-router.js');
const errorMiddleware=require('./middleware/error-middleware.js');

async function connectMongo(){
   
    //Connect with the SMTP
    await mongoose.connect(process.env.MONGO_DB_URL);
}

module.exports ={path,Router,connectMongo,errorMiddleware};
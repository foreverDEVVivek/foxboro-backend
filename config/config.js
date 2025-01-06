require('dotenv').config();
const path=require('path');
const mongoose=require('mongoose');
const express = require('express');
const MongoStore= require('connect-mongo');
const authRouter = require('../routers/auth-router.js');
const {rateLimit}=require('express-rate-limit');
const productRouter=require('../routers/product-router.js');
const errorMiddleware=require('../middleware/error-middleware.js');
const enquiryRouter = require('../routers/enquiry-router.js');
const adminRouter=require('../routers/admin-router.js');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const session = require('express-session');
const methodOverride=require('method-override');
const cors=require('cors')

const sessionConfig ={
    secret:process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
     },
     store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        ttl: 3600,
     })
};

const cloudinaryConfig={
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

const limiter= rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // limit the number of requests per 15 minutes is 1000
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    legacyHeaders: false,
})
cloudinary.config(cloudinaryConfig);

const CloudinaryStorageConfig={
    cloudinary:cloudinary,
    params:{
        folder:'Foxboro-backend',
        allowedFormats:["png","jpg","jpeg"], //Defined others as well
    },
}

const storage= new CloudinaryStorage(CloudinaryStorageConfig)

async function connectMongo(){
    //Connect with the MongoDb Atlas or Compass
    await mongoose.connect(process.env.MONGO_DB_URL);
}

module.exports ={limiter,enquiryRouter,express,cors,cloudinary,storage,path,authRouter,connectMongo,errorMiddleware,productRouter,adminRouter,sessionConfig ,MongoStore,session,methodOverride};

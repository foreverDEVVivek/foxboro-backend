const config =require('./config/config.js');
const express=require('express');
const app=express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.cors({origin:"*"}))
app.use(config.session(config.sessionConfig));
app.use(config.methodOverride('_method'));

//Globally configuring the logging 
global.logger=config.logger;

//Setting up morgan
app.use(config.morgan(config.morganFormat, config.morganSettings))

//Authentication Router
app.use('/api/v1/auth',config.limiter, config.authRouter);

//Product Router
app.use('/api/v1/products',config.productRouter);

//Admin Router
app.use('/api/v1/admin', config.adminRouter);

//Enquiry Router
app.use('/api/v1/enquiry', config.enquiryRouter);

// Error handling middleware
app.use(config.errorMiddleware);

app.listen(process.env.PORT, () => {
    config.connectMongo()
    .then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log("DB Error: " + err);
    })    
    console.log(`Server is running on port ${process.env.PORT}`);
});
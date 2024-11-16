const config =require('./config.js');
const express=require('express');
const app=express();
const session = require('express-session');
require('dotenv').config();

const sessionConfig ={
    secret:process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }  // 10 minutes
}
app.use(session(sessionConfig));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(config.path.join(__dirname, 'public')));

app.use('/api/v1/auth', config.Router);

app.get('/',(req,res)=>{
    res.json("Api working");
});

// Error handling middleware
app.use(config.errorMiddleware);

app.listen(80, () => {
    config.connectMongo()
    .then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log("DB Error: " + err);
    })    
    console.log('Server is running on port 80');
})

const nodemailer =require('nodemailer');
const otpGenerator =require('otp-generator');
const Otp = require('../models/otp.js');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  
    auth: {
      user: "spareg1234@gmail.com",
      pass:"fqxv lqmb ekus mxby",
    },
});

let otpCode= otpGenerator.generate(6,{
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,}
);


async function sendOtp(to){
 
  //Checking that otp must be unique
  let existingOtp = await Otp.findOne({ otp: otpCode});
   
  while(existingOtp){
    otpCode= otpGenerator.generate(6,{
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,}
    );
    existingOtp = await Otp.findOne({ otp: otpCode});
  }
 

  const newOtp= await Otp({
    otp: otpCode,
    email: to,
  })

  
const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Basic styling to ensure cross-client compatibility */
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
        font-size: 24px;
        font-weight: bold;
        color: #4caf50;
      }
      .content {
        font-size: 16px;
        line-height: 1.6;
        color: #333333;
        padding: 20px 0;
      }
      .otp-code {
        font-size: 24px;
        font-weight: bold;
        color: #ff5722;
        text-align: center;
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 4px;
        margin: 20px 0;
        letter-spacing: 2px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        padding: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Your OTP Code</div>
      <div class="content">
        <p>Hi there,</p>
        <p>Thank you for using our service. To complete your verification, please use the OTP code below:</p>
        <div class="otp-code">${otpCode}</div>
        <p>This code will expire in 10 minutes. Please do not share it with anyone.</p>
      </div>
      <div class="footer">If you did not request this, please ignore this email.</div>
    </div>
  </body>
</html>
`;
  await transporter.sendMail({
    from: '"Foxboro" <spareg1234@gmail.com>',
    to: `${to}`,
    subject: "Foxboro - Login Verification",
    text: "Hello from Foxboro, Thank you for signing up for Foxboro.",
    html: htmlContent, // html body
  });
 

  await newOtp.save();

  return true;
}

module.exports=sendOtp;
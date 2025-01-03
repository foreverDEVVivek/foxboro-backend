require('dotenv').config(); // Load environment variables
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up CloudinaryStorage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Foxboro-backend',
    allowed_formats: ['jpg', 'png', 'jpeg','pdf','docx'], // Acceptable formats
  },
});

const bannerStorage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params:{
    folder:'Foxboro-backend/banners',
    allowed_formats: ['jpg', 'png', 'jpeg','avif'], // Acceptable formats
  }
})

const dataSheetStorage =new CloudinaryStorage({
 cloudinary:cloudinary,
 params:{
  folder:"Foxboro-backend/datasheet",
  allowed_formats: ['xlsx','xls','docx','pdf'], // Acceptable formats
 }
})
module.exports = { cloudinary, storage ,bannerStorage,dataSheetStorage};

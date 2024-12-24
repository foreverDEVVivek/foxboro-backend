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
    allowed_formats: ['jpg', 'png', 'jpeg'], // Acceptable formats
  },
});

module.exports = { cloudinary, storage };

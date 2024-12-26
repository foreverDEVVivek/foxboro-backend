const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//Banner Schema for banner images
const bannerSchema = new Schema({
    bannerImg: {
        type: [String], // Defines an array of strings
        default: [
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735193106/banner4_lqe4fx.png',
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735193106/banner3_ou7sch.png',
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735193106/banner1_ltpvip.jpg',
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735193105/banner2_sqsz3z.avif',
        ],
        set: function(value) {
            return value && value.length > 0 ? value : this.bannerImg;
        },
    },
},
{timestamps: true});

const Banner= mongoose.model('Banner', bannerSchema);



// Create default document function
// const createDefaultBanner = async () => {
//     try {
//       const existingBanner = await Banner.findOne(); // Check if a banner document already exists
//       if (!existingBanner) {
//         await Banner.create({}); // Create a default banner document
//         console.log('Default banner document created.');
//       } else {
//         console.log('Default banner document already exists.');
//       }
//     } catch (err) {
//       console.error('Error creating default banner document:', err);
//     }
//   };
  
  // Call this function during app initialization
//   const startApp = async () => {
//     await mongoose.connect(process.env.MONGO_DB_URL); // Connect to MongoDB
//     await createDefaultBanner();
//     // Continue with the rest of your app logic
//   };
  
//   startApp();

module.exports = Banner;
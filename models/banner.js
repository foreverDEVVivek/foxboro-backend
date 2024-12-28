const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//Banner Schema for banner images
const bannerSchema = new Schema({
    bannerImg: {
        type: [String], // Defines an array of strings
        default: [
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735287399/banner3_gqnvx4.png',
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735287399/rb_2149083259_daebrj.png',
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735287399/rb_2151092224_oz5w2l.png',
            'https://res.cloudinary.com/dv1k0bazk/image/upload/v1735287398/179630735_10744991_ko4ea8.jpg',
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
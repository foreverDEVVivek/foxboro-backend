const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const Product = require("../models/products.js");
const bcrypt = require("bcryptjs");

//Get all Products -- Admin only
const adminGetProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json({ product: allProducts });
};

//Post a new Product -- Admin only
const adminPostProduct = async (req, res) => {
  try {
   
    // Ensure that at least 4 images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least 4 images are required!" });
    }

    // Map the uploaded files to an array of image URLs
    const imageUrls = req.files.map((file) => {
      return file.path;
    });

    // const productData = {
    //   name: "Industrial Drill Machine",
    //   price: 50000,
    //   manufacturer: {
    //     name: "DrillTech Ltd."
    //   },
    //   vendors: [
    //     {
    //       company: "Tools Supplier Co.",
    //       address: "123 Industrial Road, City",
    //       concernedPerson: "John Doe",
    //       phoneNumber: "9876543210",
    //       mobileNumber: "9876543210",
    //       email: "contact@toolssupplier.com",
    //       lastPurchasedDate: "2024-11-01",
    //       lastPurchasedPrice: 48000
    //     }
    //   ],
    //   shortDescription: "A high-quality industrial drill machine for various tasks.",
    //   quantity: 50,
    //   category: {
    //     name: "Machinery and Equipment",
    //     description: "Heavy machinery used in industrial operations."
    //   },
    //   subCategory: {
    //     name: "Construction Machinery",
    //     description: "Machines used for construction purposes, such as drills, cranes, and mixers."
    //   },
    //   review: [], // Assuming no reviews are associated yet
    //   image:imageUrls, 
    //   modelNo: "IDM-4500",
    //   keyFactors: ["Durable", "High Efficiency", "Affordable"],
    //   inrPrice: 50000,
    //   usdPrice: 600,
    //   stock: 50,
    //   specifications: [
    //     "Max Power: 5 HP",
    //     "Voltage: 220V",
    //     "Speed: 1500 RPM"
    //   ],
    //   longDescription:
    //     "This drill machine is built to last, providing powerful performance for industrial applications. It features advanced safety features and energy-efficient technology.",
    //   GstRate: 18,
    //   moq: 5,
    //   paymentType: ["Cash on Delivery", "Online Payment"]
    // };
    

    // Create a new product object based on the Joi schema fields
   
     const newProduct = await Product({
      name,  // Matches Joi schema for product name
      price, // Matches Joi schema for product price
      manufacturer, // Matches Joi schema for manufacturer
      vendors, // Matches Joi schema for vendors
      shortDescription, // Matches Joi schema for product short description
      quantity, // Matches Joi schema for product quantity
      image: imageUrls, // Image URLs from file upload
      category, // Matches Joi schema for category (nested object)
      subCategory, // Matches Joi schema for sub-category (nested object)
      modelNo, // Matches Joi schema for product model number
      keyFeatures: keyFactors, // Matches Joi schema for key features
      inrPrice, // Matches Joi schema for INR price
      usdPrice, // Matches Joi schema for USD price
      stock, // Matches Joi schema for product stock
      specification: specifications, // Matches Joi schema for product specifications
      longDescription, // Matches Joi schema for long description
      gstRate: GstRate, // Matches Joi schema for GST rate
      moq, // Matches Joi schema for MOQ
      paymentType, // Matches Joi schema for payment type
      createdAt: Date.now(),
    });
    const product= await Product(newProduct);
    // Save the new product to the database
    await product.save();

    res.json({ message: "Product added successfully", product: product });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// Update product -- Admin only
const adminUpdateProduct = async (req, res) => {
  const {
    productName,
    vendors,
    productPrice,
    productManufacturer,
    manufacturerName,
    productShortDescription,
    productQuantity,
    productCategory,
    categoryName,
    categoryDescription,
    productSubCategory,
    subCategoryName,
    subCategoryDescription,
    productImages,
    productModelNo,
    productKeyFeatures,
    productInrPrice,
    productUsdPrice,
    productStock,
    productSpecification,
    productLongDescription,
    productGstRate,
    productMoq,
    productPaymentType,
  } = req.body;

  const { productId } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(productId, {
    name: productName,
    price: productPrice,
    manufacturer: productManufacturer,
    manufacturerName: manufacturerName,
    shortDescription: productShortDescription,
    quantity: productQuantity,
    vendors: vendors,
    category: productCategory,
    categoryName: categoryName,
    categoryDescription: categoryDescription,
    subCategory: productSubCategory,
    subCategoryName: subCategoryName,
    subCategoryDescription: subCategoryDescription,
    images: productImages,
    modelNo: productModelNo,
    keyFeatures: productKeyFeatures,
    inrPrice: productInrPrice,
    usdPrice: productUsdPrice,
    stock: productStock,
    specification: productSpecification,
    longDescription: productLongDescription,
    gstRate: productGstRate,
    moq: productMoq,
    paymentType: productPaymentType,
    createdAt: Date.now(),
  });

  res.json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
};

// Delete a product -- Admin only
const adminDeleteProduct = async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  res.json({
    message: "Product deleted successfully",
    product: deletedProduct,
  });
};

// Get all User -- Admin Only Work Done.
const adminGetUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json({ user: allUsers });
};

// Delete a user -- Admin only -- Work Done.
const adminDeleteUsers = async (req, res) => {
  const { _id } = req.body;
  const deletedUser = await User.findByIdAndDelete(_id);
  res.json({ message: "User deleted successfully", user: deletedUser });
};

// Update a user -- Admin only  -- Work Done.
const adminUpdateUsers = async (req, res) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;
  const existingUser = await User.findById({ _id: userId });
  const saltRound = await bcrypt.genSalt(10);
  const updatedDetails = {
    name: name || existingUser.name,
    email: email || existingUser.email,
    password: (await bcrypt.hash(password, saltRound)) || existingUser.password,
  };
  await User.findByIdAndUpdate(userId, updatedDetails);
  res.json({ message: "User updated successfully" });
};
module.exports = {
  adminGetProducts,
  adminUpdateProduct,
  adminPostProduct,
  adminDeleteProduct,
  adminGetUsers,
  adminDeleteUsers,
  adminUpdateUsers,
};

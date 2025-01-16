const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const Enquiry = require('../models/enquiry.js')
const Category=require('../models/category.js')
const SubCategory=require('../models/subCategory.js')
const Banner= require('../models/banner.js')
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
    if (!req.files.datasheet || !req.files.images || req.files.images.length === 0) {
      return res
        .status(400)
        .json({ message: "At least 4 images are required!" });
    }

    // Map the uploaded files to an array of image URLs
    const imageUrls = req.files.images.map((file) => {
      return file.path;
    });
   
    const datasheetUrl= req.files.datasheet.map((file)=>{
      return file.path;
    });


    const data = {
      name: req.body.name,
      price: req.body.price,
      manufacturer: JSON.parse(req.body.manufacturer),
      vendors: JSON.parse(req.body.vendors),
      shortDescription: req.body.shortDescription,
      quantity: req.body.quantity,
      category: req.query.category,
      subCategory: req.query.subCategory,
      review: JSON.parse(req.body.review),
      modelNo: req.body.modelNo,
      image: imageUrls,
      deliveryIn:req.body.deliveryIn,
      hsnCode:req.body.hsnCode,
      warranty:req.body.warranty,
      dataSheet:datasheetUrl,
      keyFactors: JSON.parse(req.body.keyFactors),
      inrPrice: req.body.inrPrice,
      usdPrice: req.body.usdPrice,
      stock: req.body.stock,
      specifications: JSON.parse(req.body.specifications),
      longDescription: req.body.longDescription,
      GstRate: req.body.GstRate,
      moq: req.body.moq,
      paymentType: JSON.parse(req.body.paymentType),
    };

    const newProduct = await Product(data);
    // Save the new product to the database
    await newProduct.save();

    res.json({success:true, message: "Product added successfully" });// product: newProduct
  } catch (error) {
    console.log(error)
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

//Banner Change Controller 
const adminChangeBanner = async (req, res) => {
  try {
    const {bannerId}=req.params;
     // Ensure that at least 4 images are uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least 4 images are required!" });
  }

  // Map the uploaded files to an array of image URLs
  const imageUrls = req.files.map((file) => {
    return file.path;
  });


  await Banner.findByIdAndUpdate(bannerId,{
    bannerImg:imageUrls
  });
 
  res.status(200).json({message:"Banner Images saved successfully.", success:true, });

  } catch (error) {
    res.status(500).json({message:error.message, success:false});
  }
 
};

const adminGetBanner= async(req,res)=>{
  const allBanners = await Banner.find({});
  res.json({ banners: allBanners });
}


//get all enquiry only admin
const getAllEnquiries= async(req, res) => {
  try {
    const enquiries = await Enquiry.find({});
    res.status(200).json({success:true, enquiries });
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
}

//Delete enquiries
const deleteEnquiries = async(req,res)=>{
  try {
    const {enquiryId}=req.params;
    const deletedEnquiry = await Enquiry.findByIdAndDelete(enquiryId);

    res.status(200).json({success:true, message: "Enquiry deleted successfully.", deletedEnquiry});
  } catch (error) {
    res.status(500).json({success:false, message: error.message});
  }
}

const getAllCategories=async(req,res)=>{
  try {
    const allCategories=await Category.find();
    res.status(200).json({success:true,allCategories});
  } catch (error) {
   res.status(500).json({success:false, message:error.message})
  }
}

const addCategory=async(req,res)=>{
  try {
    const newCategory=await Category.create(req.body);
    res.status(200).json({success:true, message:"Category added successfully.", newCategory});
  } catch (error) {
   res.status(500).json({success:false,message:error.message}); 
  }
}

const getAllSubCategories=async(req,res)=>{
  try {
    const allSubCategories=await SubCategory.find();
    res.status(200).json({success:true,allSubCategories});
  } catch (error) {
    res.status(500).json({success:false, message:error.message})
  }
}

const addSubCategory=async(req,res)=>{
  try {
    const {categoryId}=req.params;
    if(!categoryId){
      return res.status(400).json({message: "categoryId is required!"});  // check if categoryId is provided. If not, return error message. 400 Bad Request status code.  // 400 is a client error, meaning the request was malformed or invalid.  // The client should not repeat the request.  // In this case, the client is trying to create a subcategory without providing the categoryId.
    }
    else{

    //Check whether it exists before or not
    const category=await Category.findById(categoryId);
    if(!category){
      return res.status(404).json({success:false,message: "Category not found!"});
    }

    const isExists=await SubCategory.findOne({name:req.body.name});
    if(isExists){
      return res.status(409).json({success:false,message: "Subcategory already exists!"});
    }

    const newSubCategory=await SubCategory({
      name:req.body.name,
      description:req.body.description,
      category:categoryId,
    });
    
    await Category.findByIdAndUpdate(categoryId,{
      $push:{subCategory:newSubCategory._id}
    });
    
    await newSubCategory.save();
    res.status(200).json({success:true, message:"Subcategory added successfully.", newSubCategory});
  }
  } catch (error) {
    res.status(500).json({success:false,message:error.message}); 
  }
}

const getSubCategoriesByCategory=async(req,res)=>{
  try {
    const {categoryId}=req.params;
    if(!categoryId){
     return res.status(404).json({message: 'Category Id is required',success:false});
    }

    const category=await Category.findById(categoryId);
    if(!category){
    return res.status(404).json({message: 'Category not found',success:false});
    }

    const allSubCategories= await Category.findById(categoryId).populate({
      name:"subCategory",
      path:"subCategory",
    });

    res.status(200).json({success:true, allSubCategories});

  } catch (error) {
    res.status(500).json({message:error.message,success:false});
  }
}
module.exports = {
  adminGetProducts,
  adminChangeBanner,
  getAllEnquiries,
  deleteEnquiries,
  adminUpdateProduct,
  adminPostProduct,
  adminDeleteProduct,
  adminGetUsers,
  adminGetBanner,
  adminDeleteUsers,
  adminUpdateUsers,
  getAllCategories,
  addCategory,
  getAllSubCategories,
  addSubCategory,
  getSubCategoriesByCategory
};

const User = require('../models/users.js');
const jwt =require('jsonwebtoken');
const Product = require('../models/products.js')
const bcrypt=require('bcryptjs');

//Get all Products -- Admin only
const adminGetProducts=async(req,res)=>{
  const allProducts= await Product.find({});
  res.json({product: allProducts});
}

//Post a new Product -- Admin only
const adminPostProduct=async(req,res) => {
    const {productName,productPrice,vendors,productManufacturer,manufacturerName,productShortDescription,productQuantity,productCategory,categoryName, categoryDescription,productSubCategory,subCategoryName,subCategoryDescription,productModelNo,productKeyFeatures,productInrPrice,productUsdPrice,productStock,productSpecification,productLongDescription,productGstRate,productMoq,productPaymentType
    }=req.body;
  
    if(!req.files || req.files.length === 0){
      return res.status(400).json({message:"At least 4 images are required!"});
    }
    const imageUrls=req.files.map((file)=>{return file.path});
    //Need to work on it.
    const newProduct = await Product({
        name: productName,
        price: productPrice,
        manufacturer: productManufacturer,
        manufacturerName: manufacturerName,
        shortDescription: productShortDescription,
        quantity: productQuantity,
        image:imageUrls,
        vendors:vendors,
        category: productCategory,
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        subCategory: productSubCategory,
        subCategoryName: subCategoryName,
        subCategoryDescription: subCategoryDescription,
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
    })

    await newProduct.save();
    res.json({message: 'Product added successfully', product: newProduct});

};
// Update product -- Admin only
const adminUpdateProduct=async (req,res)=>{
  const  {productName,vendors,productPrice,productManufacturer,manufacturerName,productShortDescription,productQuantity,productCategory,categoryName, categoryDescription,productSubCategory,subCategoryName,subCategoryDescription,productImages,productModelNo,productKeyFeatures,productInrPrice,productUsdPrice,productStock,productSpecification,productLongDescription,productGstRate,productMoq,productPaymentType
  }=req.body;
 
  const {productId}=req.params;
  const updatedProduct=await Product.findByIdAndUpdate(productId,{
    name: productName,
    price: productPrice,
    manufacturer: productManufacturer,
    manufacturerName: manufacturerName,
    shortDescription: productShortDescription,
    quantity: productQuantity,
    vendors:vendors,
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

  res.json({message: 'Product updated successfully', product: updatedProduct});

}

// Delete a product -- Admin only
const adminDeleteProduct=async (req,res)=>{
  const {productId}=req.params;
  const deletedProduct=await Product.findByIdAndDelete(productId);
  res.json({message: 'Product deleted successfully', product: deletedProduct});
}

// Get all User -- Admin Only Work Done.
const adminGetUsers=async (req,res)=>{
  const allUsers= await User.find({});
  res.json({user: allUsers});
}

// Delete a user -- Admin only -- Work Done.
const adminDeleteUsers=async (req,res)=>{
  const {_id}=req.body;
  const deletedUser=await User.findByIdAndDelete(_id);
  res.json({message: 'User deleted successfully', user: deletedUser});
}

// Update a user -- Admin only  -- Work Done.
const adminUpdateUsers=async (req,res)=>{
  const {name,email,password}=req.body;
  const {userId}=req.params; 
  const existingUser=await User.findById({_id:userId});
  const saltRound = await bcrypt.genSalt(10);
  const updatedDetails={
    name : name || existingUser.name,
    email : email || existingUser.email,
    password : await bcrypt.hash(password,saltRound) || existingUser.password,
  };
   await User.findByIdAndUpdate(userId, updatedDetails);
  res.json({message: 'User updated successfully'});
}
module.exports = {adminGetProducts,adminUpdateProduct,adminPostProduct,adminDeleteProduct,adminGetUsers,adminDeleteUsers,adminUpdateUsers};

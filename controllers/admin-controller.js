const User = require('../models/users.js');
const jwt =require('jsonwebtoken');
const Product = require('../models/products.js')

const adminGetProducts=async(req,res)=>{
  const allProducts= await Product.find({});
  res.json({product: allProducts});
}

const adminPostProduct=async(req,res) => {
    const {productName,productPrice,productManufacturer,manufacturerName,productShortDescription,productQuantity,productCategory,categoryName, categoryDescription,productSubCategory,subCategoryName,subCategoryDescription,productImages,productModelNo,productKeyFeatures,productInrPrice,productUsdPrice,productStock,productSpecification,productLongDescription,productGstRate,productMoq,productPaymentType
    }=req.body;

    //Need to work on it.
    const newProduct = await Product({
        name: productName,
        price: productPrice,
        manufacturer: productManufacturer,
        manufacturerName: manufacturerName,
        shortDescription: productShortDescription,
        quantity: productQuantity,
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
    })

    await newProduct.save();
    res.json({message: 'Product added successfully', product: newProduct});

};


const adminDeleteProduct=async (req,res)=>{
   res.json({message: 'Product deleted successfully',})
}
module.exports = {adminGetProducts,adminPostProduct,adminDeleteProduct};
const Product = require("../models/products.js");
const Banner = require("../models/banner.js");
const Category = require("../models/category.js");
const Subcategory = require("../models/subCategory.js");
//Product Controllers are here
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ product: product });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const getBannerImages = async (req, res) => {
  try {
    const allBanners = await Banner.find({});
    res.json({ banner: allBanners, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const allSubcategories = await Subcategory.find({});
    res.status(200).json({ success: true, allSubcategories });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res
        .status(404)
        .json({ message: "Category Id is required", success: false });
    }
    const allSubcategories = await Category.findById(categoryId).populate({
      path: "subCategory",
      model: "subCategory",
    });

    res.status(200).json({ success: true, allSubcategories });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res
       .status(404)
       .json({ message: "Category Id is required", success: false });
    }
    const allProducts = await Product.find({ category: categoryId });
    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getAllProductsBySubcategoryId = async (req, res) => {
  try {
    const {subCategoryId}=req.params;
    
    if(!subCategoryId){
      return res.status(404).json({message: 'Subcategory Id is required',success:false});
    }
    const allProducts=await Product.find({ subCategory: subCategoryId });
    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

module.exports = {
  getAllProductsByCategoryId,
  getAllSubCategoriesByCategoryId,
  getAllSubCategories,
  getAllProducts,
  getProduct,
  getBannerImages,
  getAllCategories,
  getAllProductsBySubcategoryId,
};

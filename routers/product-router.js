const express = require("express");
const {
  getAllProducts,
  getProduct,
  getBannerImages,
  getAllSubCategories,
  getAllProductsByCategoryId,
  getAllSubCategoriesByCategoryId,
  getAllCategories,
  getAllProductsBySubcategoryId
} = require("../controllers/product-controller.js");
const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);

//Getting all Categories
productRouter.route("/get-all-categories").get(getAllCategories);

//Getting all Subcategories
productRouter.route("/get-all-subCategories").get(getAllSubCategories);

//Getting all Subcategories by Category ID
productRouter
  .route("/get-all-subCategories/:categoryId")
  .get(getAllSubCategoriesByCategoryId);

//Getting product by Category ID
productRouter.route('/get-all-products/category/:categoryId')
.get(getAllProductsByCategoryId);

//Getting products by Subcategory ID
productRouter.route('/get-all-products/subCategory/:subCategoryId')
.get(getAllProductsBySubcategoryId);

//Getting banner Images
productRouter.route("/get-banner-images").get(getBannerImages);

productRouter.route("/:id").get(getProduct);

module.exports = productRouter;

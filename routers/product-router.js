const express = require("express");
const {
  getAllProducts,
  getProduct,
  getBannerImages,
  getAllSubCategories,
  getAllProductsByCategoryId,
  getAllSubCategoriesByCategoryId,
  getAllCategories,
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
productRouter.route('/get-all-products/:categoryId')
.get(getAllProductsByCategoryId);

productRouter.route("/get-banner-images").get(getBannerImages);

productRouter.route("/:id").get(getProduct);

module.exports = productRouter;

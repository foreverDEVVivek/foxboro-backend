const adminRouter = require("express").Router();
const { validateToken } = require("../middleware/auth-middleware");
const validateProduct = require("../middleware/product-middleware.js");
const adminController = require("../controllers/admin-controller");
const multer = require("multer");
const {storage}=require('../config/config.js')
const upload = multer({storage}).array('images',4)

//upload.single('productImages[image]')
// Admin routes to handle admin-specific operations like get all products and list new products
adminRouter
  .route("/products")
  .get(validateToken, adminController.adminGetProducts)
  .post(validateToken,  upload,validateProduct, adminController.adminPostProduct);

//Update products or delete products
adminRouter
  .route("/products/:productId")
  .put(validateToken,adminController.adminUpdateProduct)
  .delete(validateToken, adminController.adminDeleteProduct);

// Admin routes to handle admin-specific operations like get all Users
adminRouter.route("/users").get(validateToken, adminController.adminGetUsers);

// Admin routes to handle admin-specific operations like delete Users and update users
adminRouter
  .route("/users/:userId")
  .delete(validateToken, adminController.adminDeleteUsers)
  .put(validateToken, adminController.adminUpdateUsers);

module.exports = adminRouter;

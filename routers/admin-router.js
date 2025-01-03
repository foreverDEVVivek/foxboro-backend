const adminRouter = require("express").Router();
const { validateToken } = require("../middleware/auth-middleware");
const adminController = require("../controllers/admin-controller");
const validateProduct = require("../middleware/product-middleware.js");
const multer = require("multer");
const { storage,bannerStorage } = require("../config/cloudinaryConfig.js");
const upload = multer({ storage });
const bannerUpload = multer({ storage:bannerStorage });

adminRouter
  .route("/products")
  .get(validateToken, adminController.adminGetProducts)
  .post(
    validateToken,
    upload.array("images", 4),
    adminController.adminPostProduct
  );

//Update products or delete products
adminRouter
  .route("/products/:productId")
  .put(validateToken, adminController.adminUpdateProduct)
  .delete(validateToken, adminController.adminDeleteProduct);

// Admin routes to handle admin-specific operations like get all Users
adminRouter.route("/users").get(validateToken, adminController.adminGetUsers);

// Admin routes to handle admin-specific operations like delete Users and update users
adminRouter
  .route("/users/:userId")
  .delete(validateToken, adminController.adminDeleteUsers)
  .put(validateToken, adminController.adminUpdateUsers);

// Admin Routes to get the banner images
adminRouter.route('/banner')
.get(validateToken, adminController.adminGetBanner);

// Admin routes to change the banner images
adminRouter
  .route("/banner/:bannerId")
  .put(
    validateToken,
    bannerUpload.array("bannerImages", 4),
    adminController.adminChangeBanner
  );

//Admin routes to handle admin-specific operations like get all Enquiries and delete Enquiries
adminRouter.route('/get-all-enquiries')
.get(validateToken,adminController.getAllEnquiries);

adminRouter.route('/get-all-enquiries/:enquiryId')
.delete(validateToken,adminController.deleteEnquiries);
//Till here 

module.exports = adminRouter;

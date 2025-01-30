const adminRouter = require("express").Router();
const { validateToken } = require("../middleware/auth-middleware");
const {
  validateIsAdmin,
  validateCategory,
} = require("../middleware/admin-middleware.js");
const adminController = require("../controllers/admin-controller");
const multer = require("multer");
const { storage, bannerStorage,dataSheetStorage } = require("../config/cloudinaryConfig.js");
const upload = multer({ storage:storage })
const dataSheetUpload = multer({storage: dataSheetStorage});
const bannerUpload = multer({ storage: bannerStorage })

adminRouter
  .route("/products")
  .get(validateToken, validateIsAdmin, adminController.adminGetProducts)
  .post(
    validateToken,
    upload.fields([
      {name:"images",maxCount:4},
      {name:"datasheet",maxCount:1}
    ]),
    adminController.adminPostProduct
  );

//Update products or delete products
adminRouter
  .route("/products/:productId")
  .put(validateToken, validateIsAdmin, adminController.adminUpdateProduct)
  .delete(validateToken, validateIsAdmin, adminController.adminDeleteProduct);

// Admin routes to handle admin-specific operations like get all Users
adminRouter
  .route("/users")
  .get(validateToken, validateIsAdmin, adminController.adminGetUsers);

// Admin routes to handle admin-specific operations like delete Users and update users
adminRouter
  .route("/users/:userId")
  .delete(validateToken, validateIsAdmin, adminController.adminDeleteUsers)
  .put(validateToken, validateIsAdmin, adminController.adminUpdateUsers);

// Admin Routes to get the banner images
adminRouter
  .route("/banner")
  .get(validateToken, validateIsAdmin, adminController.adminGetBanner);

// Admin routes to change the banner images
adminRouter
  .route("/banner/:bannerId")
  .put(
    validateToken,
    validateIsAdmin,
    bannerUpload.array("bannerImages", 4),
    adminController.adminChangeBanner
  );

//Admin routes to handle admin-specific operations like get all Enquiries and delete Enquiries
adminRouter
  .route("/get-all-enquiries")
  .get(validateToken, validateIsAdmin, adminController.getAllEnquiries);

//Admin is able to delete all Enquiries
adminRouter
  .route("/get-all-enquiries/:enquiryId")
  .get(validateToken, validateIsAdmin, adminController.getSingleEnquiry)
  .delete(validateToken, validateIsAdmin, adminController.deleteEnquiries);

adminRouter
 .route('/get-all-enquiries/:enquiryId/action-on-enquiry')
 .patch(validateToken,validateIsAdmin, adminController.updateEnquiry);
 
//Get all categories
adminRouter
  .route("/get-all-categories")
  .get(validateToken, validateIsAdmin, adminController.getAllCategories)
  .post(
    validateToken,
    validateIsAdmin,
    validateCategory,
    adminController.addCategory
  );

//Get all sub categories and post sub categories

adminRouter
  .route("/get-all-sub-categories")
  .get(validateToken, validateIsAdmin, adminController.getAllSubCategories);

adminRouter
  .route("/get-all-sub-categories/:categoryId")
  .get(
    validateToken,
    validateIsAdmin,
    adminController.getSubCategoriesByCategory
  )
  .post(
    validateToken,
    validateIsAdmin,
    validateCategory,
    adminController.addSubCategory
  );

//Get all sub categories of a particular category

module.exports = adminRouter;

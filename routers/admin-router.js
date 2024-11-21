const adminRouter=require('express').Router();
const {validateToken}=require('../middleware/auth-middleware');
const adminController = require('../controllers/admin-controller');

adminRouter.route('/')
.get(adminController.adminGreeting)

adminRouter.route('/products')
.get(validateToken,adminController.adminPostProduct)

module.exports=adminRouter;
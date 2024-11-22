const adminRouter=require('express').Router();
const {validateToken}=require('../middleware/auth-middleware');
const adminController = require('../controllers/admin-controller');

adminRouter.route('/products')
.get(validateToken,adminController.adminGetProducts)
.post(validateToken,adminController.adminPostProduct)
.delete(validateToken,adminController.adminDeleteProduct)

adminRouter.route('/users')
.get(validateToken,adminController.adminGetUsers)
.delete(validateToken,adminController.adminDeleteUsers)
.put(validateToken,adminController.adminUpdateUsers)


module.exports=adminRouter;
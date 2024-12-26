const express = require('express');
const {getAllProducts,getProduct,getBannerImages}=require('../controllers/product-controller.js')
const productRouter = express.Router();

productRouter.route('/')
.get(getAllProducts);

productRouter.route('/get-banner-images')
.get(getBannerImages);

productRouter.route('/:id')
.get(getProduct);


module.exports =productRouter;
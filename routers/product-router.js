const express = require('express');
const {getAllProducts,getProduct}=require('../controllers/product-controller.js')
const productRouter = express.Router();

productRouter.route('/')
.get(getAllProducts)

productRouter.route('/:id')
.get(getProduct);

module.exports =productRouter;
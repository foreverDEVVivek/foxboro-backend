const express = require('express');
const {getAllProducts}=require('../controllers/product-controller.js')
const productRouter = express.Router();

productRouter.route('/')
.get(getAllProducts)

module.exports =productRouter;
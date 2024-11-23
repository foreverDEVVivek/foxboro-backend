const Product = require('../models/products.js');

//Product Controllers are here
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {getAllProducts}
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

const getProduct = async (req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json({product : product});
    } catch (error) {
        res.status(404).json({message:error.message, success:false});
    }
}

module.exports = {getAllProducts,getProduct}
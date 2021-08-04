import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getProduct = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})
export const getProductById = expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: 'Product not fount'})
        }
    }
)

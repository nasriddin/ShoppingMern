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

export const deleteProduct = expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove()
            res.json({message: 'Product removed'})
        } else {
            res.status(404).json({message: 'Product not fount'})
        }
    }
)

export const createProduct = expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'Sample Name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'sample description'
        })
        const createProduct = await product.save()
        res.status(201).json(createProduct)

    }
)

export const updateProduct = expressAsyncHandler(async (req, res) => {
        const {name, price, image, brand, category, countInStock, description} = req.body
        const product = await Product.findById(req.params.id)
        if (product) {
            product.name = name
            product.price = price
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock
            product.description = description
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }


    }
)

export const createReviewProduct = expressAsyncHandler(async (req, res) => {
        const {rating, comment} = req.body
        const product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
            if (alreadyReviewed){
                res.status(400)
                throw new Error('Product already reviewed')
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review)

            product.numReviews = product.reviews.length

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }


    }
)


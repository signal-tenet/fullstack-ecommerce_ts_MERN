import express, { Request, Response, Router } from 'express'
import Product, { TProduct, TReview } from '../models/Product'
import asyncHandler from 'express-async-handler'
import User from '../models/User'
import { protectRoute, admin } from '../middlewares/authMiddleware'

const productRoutes: Router = express.Router()

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: TProduct[] = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const createProductReview = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { rating, comment, userId, title } = req.body

    try {
      const product = await Product.findById(req.params.id)
      const user = await User.findById(userId)

      if (product && user) {
        const alreadyReviewed = product.reviews.find(
          (rev: TReview) => rev.user.toString() === user._id.toString()
        )

        if (alreadyReviewed) {
          res.sendStatus(400)
          return
        }

        const review: Partial<TReview> = {
          name: user.name ?? '',
          rating: Number(rating),
          comment,
          title,
          user: user._id,
        }

        product.reviews.push(review as TReview)

        product.reviewed = product.reviews.length
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length
        await product.save()

        res.status(201).json({ message: 'Review has been saved.' })
      } else {
        res.sendStatus(404)
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  }
)

// Create a product
const createNewProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      brand,
      name,
      category,
      stock,
      price,
      image,
      productIsNew,
      description,
    } = req.body

    const newProduct = await Product.create({
      brand,
      name,
      category,
      stock,
      price,
      image: '/images/' + image,
      productIsNew,
      description,
    })

    await newProduct.save()

    const products = await Product.find({})

    if (newProduct) {
      res.json(products)
    } else {
      res.status(404)
      throw new Error('Product could not be uploaded.')
    }
  }
)

// Delete a product
const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }
)

// Update a product
const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      brand,
      name,
      image,
      category,
      stock,
      price,
      id,
      isNewProd,
      description,
    } = req.body

    const product = await Product.findById(id)

    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.brand = brand
      product.image = '/images/' + image
      product.category = category
      product.stock = stock
      product.isNewProd = isNewProd

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found.')
    }
  }
)

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProduct)
productRoutes.post('/reviews/:id', protectRoute, createProductReview)
productRoutes.route('/').put(protectRoute, admin, updateProduct)
productRoutes.route('/:id').delete(protectRoute, admin, deleteProduct)
productRoutes.route('/').post(protectRoute, admin, createNewProduct)

export default productRoutes

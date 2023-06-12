import express, { Request, Response, Router } from 'express'
import Product, { TProduct, TReview } from '../models/Product'
import asyncHandler from 'express-async-handler'
import User from '../models/User'
import protectRoute from '../middlewares/authMiddleware'

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
          (rev) => rev.user.toString() === user._id.toString()
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

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProduct)
productRoutes.post('/reviews/:id', protectRoute, createProductReview)

export default productRoutes

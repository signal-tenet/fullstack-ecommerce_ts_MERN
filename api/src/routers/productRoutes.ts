import express, { Request, Response, Router } from 'express'
import Product, { TProduct } from '../models/Product'

const productRoutes: Router = express.Router()

const getProducts = async (req: Request, res: Response) => {
  try {
    const products: TProduct[] = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
}

productRoutes.route('/').get(getProducts)
productRoutes.route('/:id').get(getProduct)

export default productRoutes

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

productRoutes.route('/').get(getProducts)

export default productRoutes

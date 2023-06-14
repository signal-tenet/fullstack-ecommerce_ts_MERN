import express, { Router } from 'express'
import { protectRoute, admin } from '../middlewares/authMiddleware'
import {
  removeProductReview,
  updateProduct,
  deleteProduct,
  createNewProduct,
  createProductReview,
  getProduct,
  getProducts,
} from '../controllers/productController'

const productRoutes: Router = express.Router()

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProduct)
productRoutes.post('/reviews/:id', protectRoute, createProductReview)
productRoutes.route('/').put(protectRoute, admin, updateProduct)
productRoutes.route('/:id').delete(protectRoute, admin, deleteProduct)
productRoutes.route('/').post(protectRoute, admin, createNewProduct)
productRoutes
  .route('/:productId/:reviewId')
  .put(protectRoute, admin, removeProductReview)

export default productRoutes

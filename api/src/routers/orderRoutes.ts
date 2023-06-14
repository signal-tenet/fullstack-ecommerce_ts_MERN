import express from 'express'
import { admin, protectRoute } from '../middlewares/authMiddleware'
import {
  createOrder,
  getOrders,
  deleteOrder,
  setDelivered,
} from '../controllers/orderController'

const orderRoutes = express.Router()

orderRoutes.route('/').post(protectRoute, createOrder)
orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder)
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered)
orderRoutes.route('/').get(protectRoute, admin, getOrders)

export default orderRoutes

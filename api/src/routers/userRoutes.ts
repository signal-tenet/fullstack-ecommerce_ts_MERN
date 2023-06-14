import express from 'express'
import protectRoute, { admin } from '../middlewares/authMiddleware'
import {
  loginUser,
  deleteUser,
  getUsers,
  updateUserProfile,
  getUserOrders,
  registerUser,
} from '../controllers/userController'
const userRoutes = express.Router()

userRoutes.route('/login').post(loginUser)
userRoutes.route('/register').post(registerUser)
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile)
userRoutes.route('/:id').get(protectRoute, getUserOrders)
userRoutes.route('/').get(protectRoute, admin, getUsers)
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser)

export default userRoutes

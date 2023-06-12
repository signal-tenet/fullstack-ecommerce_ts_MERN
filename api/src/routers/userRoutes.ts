import express, { Request, Response } from 'express'
import IUser, { User } from '../models/User'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import protectRoute from '../middlewares/authMiddleware'
import Order from '../models/Order'

const userRoutes = express.Router()

const genToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' })
}

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user: User | null = await IUser.findOne({ email })

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password.')
  }
})

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const userExists: User | null = await IUser.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('We already have an account with that email address.')
  }

  const user: User = await IUser.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id })
  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('No Orders found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await IUser.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})

userRoutes.route('/login').post(loginUser)
userRoutes.route('/register').post(registerUser)
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile)
userRoutes.route('/:id').get(protectRoute, getUserOrders)

export default userRoutes

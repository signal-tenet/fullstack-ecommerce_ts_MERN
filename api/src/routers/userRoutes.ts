import express, { Request, Response } from 'express'
import IUser, { User } from '../models/User'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

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

userRoutes.route('/login').post(loginUser)
userRoutes.route('/register').post(registerUser)

export default userRoutes

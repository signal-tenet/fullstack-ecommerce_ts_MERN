import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import IUser, { User } from '../models/User'

const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

        req.user = (await IUser.findById(decoded.id)) as User

        next()
      } catch (error) {
        res.status(401)
        throw new Error('Not authorized, token failed.')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token.')
    }
  }
)

export default protectRoute

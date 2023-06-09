import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import productRoutes from './routers/productRoutes'
import userRoutes from './routers/userRoutes'
import orderRoutes from './routers/orderRoutes'

import { rateLimit } from 'express-rate-limit'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(apiContentType)
app.use(express.json())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Custom API error handler
app.use(apiErrorHandler)

export default app

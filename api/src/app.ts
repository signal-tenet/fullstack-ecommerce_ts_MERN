import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

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

// Set up routers
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Custom API error handler
app.use(apiErrorHandler)

export default app

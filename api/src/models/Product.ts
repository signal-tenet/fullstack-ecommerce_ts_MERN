import mongoose, { Document, Schema } from 'mongoose'

interface TReview extends Document {
  name: string
  rating: number
  comment: string
  title: string
  user: mongoose.Schema.Types.ObjectId
}

export interface TProduct extends Document {
  name: string
  image: string
  brand: string
  category: string
  description: string
  reviews: TReview[]
  rating: number
  reviewed: number
  price: number
  stock: number
  isNewProd: boolean
}

const reviewSchema: Schema<TReview> = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
)

const productSchema: Schema<TProduct> = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    reviewed: { type: Number, required: true },
    price: { type: Number, required: true, default: 1000 },
    stock: { type: Number, required: true, default: 0 },
    isNewProd: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const Product = mongoose.model<TProduct>('Product', productSchema)

export default Product

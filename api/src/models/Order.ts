import mongoose, { Document, Schema } from 'mongoose'

interface TOrderItem {
  name: string
  qty: number
  image: string
  price: number
  id: mongoose.Schema.Types.ObjectId
}

interface TShippingAddress {
  address: string
  city: string
  postalCode: string
  country: string
}

interface TPaymentDetails {
  orderId: string
  payerId: string
}

interface TOrder extends Document {
  user: mongoose.Schema.Types.ObjectId
  username: string
  email: string
  orderItems: TOrderItem[]
  shippingAddress: TShippingAddress
  paymentMethod: string
  paymentDetails: TPaymentDetails
  shippingPrice: number
  totalPrice: number
  paidAt: Date
  isDelivered: boolean
  deliveredAt: Date
  createdAt: Date
  updatedAt: Date
}

const orderSchema: Schema<TOrder> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      default: '',
    },
    paymentDetails: {
      orderId: { type: String },
      payerId: { type: String },
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

const Order = mongoose.model<TOrder>('Order', orderSchema)
export default Order

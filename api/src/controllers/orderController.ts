import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order'

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    paymentDetails,
    userInfo,
  } = req.body

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json('No order items.')
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      username: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({})
  res.json(orders)
}

const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id)

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found.')
  }
})

const setDelivered = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order could not be updated.')
  }
})

export { createOrder, getOrders, deleteOrder, setDelivered }

import mongoose, { Document } from 'mongoose';

export interface Review extends Document {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  title: string;
  user: mongoose.Types.ObjectId;
  createdAt: string;
}

export interface Product extends Document {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Review[];
  rating: number;
  reviewed: number;
  price: number;
  stock: number;
  isNewProd: boolean;
}

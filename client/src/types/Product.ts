import mongoose, { Document } from 'mongoose';

interface Review extends Document {
  name: string;
  rating: number;
  comment: string;
  title: string;
  user: mongoose.Types.ObjectId;
}

export interface Product extends Document {
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

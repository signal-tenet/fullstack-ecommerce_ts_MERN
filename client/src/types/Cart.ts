export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  qty: number;
}

export interface CartState {
  loading: boolean;
  error: string | null;
  cart: CartItem[];
  expressShipping: boolean;
  subtotal: number;
}

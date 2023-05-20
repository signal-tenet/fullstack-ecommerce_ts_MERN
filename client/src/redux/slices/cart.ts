import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../types/Cart';

const calculateSubtotal = (cartState: CartItem[]): string => {
  let result = 0;
  cartState.forEach((item) => {
    result += item.qty * item.price;
  });
  return result.toFixed(2);
};

const initialState: CartState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem('cartItems') ?? '[]'),
  expressShipping: false,
  subtotal: localStorage.getItem('cartItems')
    ? Number(calculateSubtotal(JSON.parse(localStorage.getItem('cartItems')!)))
    : 0,
};

const updateLocalStorage = (cart: CartItem[]): void => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
  localStorage.setItem('subtotal', calculateSubtotal(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = true;
    },
    cartItemAdd: (state, { payload }: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.cart = [...state.cart, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cart);
      state.subtotal = Number(calculateSubtotal(state.cart));
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    cartItemRemoval: (state, { payload }: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
      updateLocalStorage(state.cart);
      state.subtotal = Number(calculateSubtotal(state.cart));
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, cartItemAdd, cartItemRemoval } =
  cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state: { cart: CartState }) => state.cart;

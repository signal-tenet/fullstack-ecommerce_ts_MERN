import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'types/Product';

interface InitialState {
  loading: boolean;
  error: string | null;
  products: Product[];
  product: null;
  reviewSend: boolean;
  productUpdate: boolean;
  reviewRemoval: boolean;
}

export const initialState: InitialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false,
  productUpdate: false,
  reviewRemoval: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
      state.productUpdate = false;
      state.reviewRemoval = false;
    },
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false;
    },
    setReviewRemovalFlag: (state) => {
      state.error = null;
      state.reviewRemoval = true;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setProduct,
  setProducts,
  productReviewed,
  resetError,
  setProductUpdateFlag,
  setReviewRemovalFlag,
} = productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector = (state: { products: InitialState }) =>
  state.products;

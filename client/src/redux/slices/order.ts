import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  loading: boolean;
  error: boolean;
  shippingAddress: any;
  orderInfo: any;
}

export const initialState: OrderState = {
  loading: false,
  error: true,
  shippingAddress: null,
  orderInfo: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    shippingAddressAdd: (state, action: PayloadAction<any>) => {
      state.shippingAddress = action.payload;
      state.loading = false;
    },
    clearOrder: (state) => {
      return { ...initialState };
    },
  },
});

export const { setLoading, setError, shippingAddressAdd, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = (state: { order: OrderState }) => state.order;

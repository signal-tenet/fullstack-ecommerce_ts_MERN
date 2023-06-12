import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

interface AdminState {
  loading: boolean;
  error: string | null;
  userList: any[] | null;
  userRemoval: boolean;
  orders: any[] | null;
  orderRemoval: boolean;
  deliveredFlag: boolean;
}

const initialState: AdminState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
  orders: null,
  orderRemoval: false,
  deliveredFlag: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUsers: (state, action: PayloadAction<any[]>) => {
      state.userList = action.payload;
      state.error = null;
      state.loading = false;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
    orderDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.orderRemoval = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
      state.deliveredFlag = false;
      state.orderRemoval = false;
    },
    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  getUsers,
  userDelete,
  resetError,
  setDeliveredFlag,
  orderDelete,
  getOrders,
} = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = createSelector(
  (state: { admin: AdminState }) => state.admin,
  (admin) => admin
);

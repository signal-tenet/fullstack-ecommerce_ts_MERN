import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import products from './slices/products';
import cart from './slices/cart';
import user from './slices/user';
import order from './slices/order';
import admin from './slices/admin';

export const store = configureStore({
  reducer: {
    products,
    cart,
    user,
    order,
    admin,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

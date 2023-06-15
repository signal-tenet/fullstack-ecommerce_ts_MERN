import axios from 'axios';
import { AppThunk } from '../store';
import { Dispatch } from 'redux';
import { CartItem } from '../../types/Cart';
import {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemoval,
  setExpressShipping,
  clearCart,
} from '../slices/cart';

export const addCartItem =
  (id: number, qty: number): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `https://galaxy-int-backend.onrender.com/api/products/${id}`
      );
      const itemToAdd: CartItem = {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        stock: data.stock,
        qty,
      };
      dispatch(cartItemAdd(itemToAdd));
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'Unexpected error.'
        )
      );
    }
  };

export const removeCartItem =
  (id: number): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    dispatch(cartItemRemoval(id));
  };

export const setExpress = (value: boolean) => async (dispatch: Dispatch) => {
  dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch: Dispatch) => {
  dispatch(clearCart());
};

import axios from 'axios';
import { Dispatch } from 'redux';
import { AppThunk } from '../store';
import {
  setProducts,
  setProduct,
  setLoading,
  setError,
} from '../slices/products';
import { Product } from '../../types/Product';

export const getProducts = (): any => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get<Product[]>(
      'http://localhost:4000/api/products'
    );
    dispatch(setProducts(data));
    dispatch(setLoading(false));
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
    dispatch(setLoading(false));
  }
};

export const getProduct =
  (id: string): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/products/${id}`
      );
      dispatch(setProduct(data));
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

import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { AppThunk, RootState } from '../store';
import {
  setProducts,
  setProduct,
  setLoading,
  setError,
  productReviewed,
  resetError,
} from '../slices/products';
import { Product } from '../../types/Product';

export const getProducts = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data }: AxiosResponse<Product[]> = await axios.get<Product[]>(
      '/api/products'
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
      const { data }: AxiosResponse<Product> = await axios.get<Product>(
        `/api/products/${id}`
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

export const createProductReview =
  (
    productId: string,
    userId: string,
    comment: string,
    rating: number,
    title: string
  ): AppThunk<Promise<void>> =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data }: AxiosResponse = await axios.post(
        `/api/products/reviews/${productId}`,
        { comment, userId, rating, title },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(productReviewed());
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occurred. Please try again later.'
        )
      );
    }
  };

export const resetProductError = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(resetError());
};

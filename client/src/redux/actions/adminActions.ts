import axios, { AxiosError, AxiosResponse } from 'axios';
import { AppThunk } from '../store';
import { Dispatch } from 'redux';
import {
  getUsers,
  userDelete,
  resetError,
  setError,
  setLoading,
  orderDelete,
  setDeliveredFlag,
  getOrders,
} from '../slices/admin';
import {
  setProducts,
  setProductUpdateFlag,
  setReviewRemovalFlag,
} from '../slices/products';

export const getAllUsers = (): AppThunk => async (dispatch, getState) => {
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
    const { data }: AxiosResponse<any> = await axios.get('/api/users', config);
    dispatch(getUsers(data));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    dispatch(setError(errorMessage));
  }
};

export const deleteUser =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
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
      await axios.delete(`/api/users/${id}`, config);
      dispatch(userDelete());
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      dispatch(setError(errorMessage));
    }
  };

export const resetErrorAndRemoval = (): AppThunk => async (dispatch) => {
  dispatch(resetError());
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    return (
      axiosError.response?.data.message ||
      axiosError.message ||
      'Users could not be fetched.'
    );
  }
  return 'Users could not be fetched.';
};

export const getAllOrders =
  (): AppThunk => async (dispatch: Dispatch, getState) => {
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
      const { data }: AxiosResponse<any> = await axios.get(
        '/api/orders',
        config
      );
      dispatch(getOrders(data));
    } catch (error: unknown) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Orders could not be fetched.'
        )
      );
    }
  };

export const deleteOrder =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
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
      await axios.delete(`/api/orders/${id}`, config);
      dispatch(orderDelete());
    } catch (error: unknown) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Order could not be removed.'
        )
      );
    }
  };

export const setDelivered =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
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
      await axios.put(`/api/orders/${id}`, {}, config);
      dispatch(setDeliveredFlag());
    } catch (error: unknown) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Order could not be updated.'
        )
      );
    }
  };

// Update Product
export const updateProduct =
  (
    brand: string,
    name: string,
    category: string,
    stock: number,
    price: number,
    id: string,
    isNewProd: boolean,
    description: string,
    image: string
  ): AppThunk =>
  async (dispatch, getState) => {
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
      const { data }: AxiosResponse<any> = await axios.put(
        `/api/products`,
        {
          brand,
          name,
          category,
          stock,
          price,
          id,
          isNewProd,
          description,
          image,
        },
        config
      );
      dispatch(setProducts(data));
      dispatch(setProductUpdateFlag());
    } catch (error) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Product could not be updated.'
        )
      );
    }
  };

// Delete Product
export const deleteProduct =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
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
      const { data }: AxiosResponse<any> = await axios.delete(
        `/api/products/${id}`,
        config
      );
      dispatch(setProducts(data));
      dispatch(setProductUpdateFlag());
      dispatch(resetError());
    } catch (error) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Product could not be removed.'
        )
      );
    }
  };

// Upload Product
export const uploadProduct =
  (newProduct: any): AppThunk =>
  async (dispatch, getState) => {
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
      const { data }: AxiosResponse<any> = await axios.post(
        `/api/products`,
        newProduct,
        config
      );
      dispatch(setProducts(data));
      dispatch(setProductUpdateFlag());
    } catch (error) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Product could not be uploaded.'
        )
      );
    }
  };

export const removeReview =
  (productId: string, reviewId: string): AppThunk =>
  async (dispatch, getState) => {
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
      const { data }: AxiosResponse<any> = await axios.put(
        `/api/products/${productId}/${reviewId}`,
        {},
        config
      );
      dispatch(setProducts(data));
      dispatch(setReviewRemovalFlag());
    } catch (error) {
      dispatch(
        setError(
          (error as AxiosError<any>)?.response?.data?.message ||
            (error as Error)?.message ||
            'Review could not be removed.'
        )
      );
    }
  };

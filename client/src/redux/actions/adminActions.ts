import axios, { AxiosError } from 'axios';
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
    const { data } = await axios.get('http://localhost:4000/api/users', config);
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
      await axios.delete(`http://localhost:4000/api/users/${id}`, config);
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
      const { data } = await axios.get(
        'http://localhost:4000/api/orders',
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
      const { data } = await axios.delete(
        `http://localhost:4000/api/orders/${id}`,
        config
      );
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
      await axios.put(`http://localhost:4000/api/orders/${id}`, {}, config);
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

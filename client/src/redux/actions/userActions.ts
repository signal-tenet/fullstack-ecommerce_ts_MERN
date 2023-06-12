import axios, { AxiosResponse } from 'axios';
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
} from '../slices/user';

import { Dispatch } from 'redux';

export const login =
  (email: string, password: string): any =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/users/login',
        { email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/users/register',
        { name, email, password },
        config
      );
      dispatch(userLogin(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
    }
  };

export const updateProfile =
  (id: string, name: string, email: string, password: string) =>
  async (dispatch: Dispatch, getState: any) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const requestData = {
        _id: id,
        name,
        email,
        password,
      };

      const { data }: AxiosResponse = await axios.put(
        `http://localhost:4000/api/users/profile/${id}`,
        requestData,
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(updateUserProfile(data));
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

export const getUserOrders =
  () => async (dispatch: Dispatch, getState: any) => {
    dispatch(setLoading(true));
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/api/users/${userInfo._id}`,
        config
      );
      dispatch(setUserOrders(data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
    }
  };

export const resetUpdateSuccess = () => async (dispatch: Dispatch) => {
  dispatch(resetUpdate());
};

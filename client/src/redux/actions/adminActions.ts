import axios, { AxiosError } from 'axios';
import { AppThunk } from '../store';
import { getUsers, userDelete, resetError, setError } from '../slices/admin';

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

import axios from 'axios';
import { setLoading, setError, userLogin, userLogout } from '../slices/user';
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

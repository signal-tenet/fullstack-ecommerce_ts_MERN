import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { setError, shippingAddressAdd, clearOrder } from '../slices/order';
import { RootState } from '../store';

export const setShippingAddress = (data: any) => (dispatch: Dispatch) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setError(value));
  };

export const createOrder =
  (order: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      order: { shippingAddress },
      user: { userInfo },
    } = getState();

    const preparedOrder = { ...order, shippingAddress };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data }: AxiosResponse = await axios.post(
        'http://localhost:4000/api/orders',
        preparedOrder,
        config
      );
    } catch (error: any) {
      dispatch(
        setError(
          error.response && error.response.data
            ? error.response.data.message
            : error.message
            ? error.message
            : 'An unexpected error has occurred. Please try again later.'
        )
      );
    }
  };

export const resetOrder = () => async (dispatch: Dispatch) => {
  dispatch(clearOrder());
};

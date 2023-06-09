import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
  userInfo: {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    isAdmin: boolean;
    token: string;
    matchPasswords(enteredPassword: string): Promise<boolean>;
  } | null;
}
const userInfoFromLocalStorage: string | null =
  localStorage.getItem('userInfo');
const parsedUserInfo: UserState['userInfo'] | null = userInfoFromLocalStorage
  ? JSON.parse(userInfoFromLocalStorage)
  : null;

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: parsedUserInfo,
  updateSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    userLogin: (state, action: PayloadAction<UserState['userInfo']>) => {
      state.userInfo = action.payload;
      state.error = null;
      state.loading = false;
    },
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
} = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state: { user: UserState }) => state.user;

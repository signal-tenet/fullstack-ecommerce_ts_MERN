import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

interface AdminState {
  loading: boolean;
  error: string | null;
  userList: any[] | null;
  userRemoval: boolean;
}

const initialState: AdminState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUsers: (state, action: PayloadAction<any[]>) => {
      state.userList = action.payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
    },
  },
});

export const { setLoading, setError, getUsers, userDelete, resetError } =
  adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = createSelector(
  (state: { admin: AdminState }) => state.admin,
  (admin) => admin
);

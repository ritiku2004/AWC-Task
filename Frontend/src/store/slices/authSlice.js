import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.status = 'succeeded';
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'failed'; // <-- THIS IS THE FIX (changed from 'idle')
    },
    authError: (state) => {
      state.status = 'failed';
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

export const { setAuthLoading, loginSuccess, logout, authError } = authSlice.actions;
export default authSlice.reducer;
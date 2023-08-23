import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Define the API endpoint URLs
const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

// Thunk to authenticate the user using the Google OAuth2Client
export const authenticateUser = createAsyncThunk('auth/authenticateUser', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/google`);
    return response.data.token;
  } catch (error) {
    throw error.response.data.error;
  }
});

// Thunk to handle logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  // You may want to call your backend logout API if needed
  // For example, you could implement '/auth/logout' on the backend to handle the logout process.
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;

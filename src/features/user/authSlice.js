import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password,
      });

      const { access_token, refresh_token } = loginResponse.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return {
        user: profileResponse.data,
        access_token,
        refresh_token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ userData }, { rejectWithValue }) => {
    try {
      await axios.post('https://api.escuelajs.co/api/v1/users/', {
        ...userData,
        avatar: userData.avatar || 'https://i.imgur.com/6VBx3io.png',
      });

      const loginResponse = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email: userData.email,
        password: userData.password,
      });

      const { access_token, refresh_token } = loginResponse.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return {
        user: profileResponse.data,
        access_token,
        refresh_token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Refresh access token
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) return rejectWithValue('No refresh token available');

    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        refreshToken: refreshToken,
      });

      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return { access_token, refresh_token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to refresh token');
    }
  }
);

const initialState = {
  user: null,
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Refresh
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

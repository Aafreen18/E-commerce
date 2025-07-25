import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Login request
      const loginResponse = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password,
      });

      const token = loginResponse.data.access_token;
      localStorage.setItem('token', token);

      // Get user profile
      const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        user: profileResponse.data,
        token,
      };
    } catch (error) {
      // Use rejectWithValue to pass custom error payload
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ userData }, { rejectWithValue }) => {
    try {
      // Register the user
      await axios.post('https://api.escuelajs.co/api/v1/users/', {
        ...userData,
        avatar: userData.avatar || 'https://i.imgur.com/6VBx3io.png',
      });

      // Automatically log in after registration
      const loginResponse = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email: userData.email,
        password: userData.password,
      });

      const token = loginResponse.data.access_token;
      localStorage.setItem('token', token);

      // Get user profile
      const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        user: profileResponse.data,
        token,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });

    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, updateUser } = authSlice.actions;

export default authSlice.reducer;

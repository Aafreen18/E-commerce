import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthAxiosInstance from '../../api/AuthAxiosInstance'; // adjust path as needed

// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await AuthAxiosInstance.post('/auth/login', {
        email,
        password,
      });

      const { access_token, refresh_token } = loginResponse.data;
      
      // Store tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Get user profile
      const profileResponse = await AuthAxiosInstance.get('/auth/profile');
      
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
      // Register new user
      await axios.post('https://api.escuelajs.co/api/v1/users/', {
        ...userData,
        avatar: userData.avatar || 'https://i.imgur.com/6VBx3io.png',
      });

      // Auto-login after registration
      const loginResponse = await AuthAxiosInstance.post('/auth/login', {
        email: userData.email,
        password: userData.password,
      });

      const { access_token, refresh_token } = loginResponse.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Get user profile
      const profileResponse = await AuthAxiosInstance.get('/auth/profile');

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
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        return rejectWithValue('No refresh token available');
      }

      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        refreshToken,
      });

      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return { access_token, refresh_token };
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return rejectWithValue(error.response?.data?.message || 'Failed to refresh token');
    }
  }
);

const initialState = {
  user: null,
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  tokenExpired: false,
};

// Rehydrate state from localStorage
const rehydrateState = () => {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  
  return {
    ...initialState,
    access_token,
    refresh_token,
    isAuthenticated: !!access_token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: rehydrateState(),
  reducers: {
    logout(state) {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.tokenExpired = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    setTokenExpired(state, action) {
      state.tokenExpired = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tokenExpired = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.loading = false;
        state.tokenExpired = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.tokenExpired = action.payload?.includes('token');
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

    // Refresh token
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.tokenExpired = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.loading = false;
        state.isAuthenticated = true;
        state.tokenExpired = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.tokenExpired = false;
      });
  },
});

export const { logout, updateUser, setTokenExpired } = authSlice.actions;
export default authSlice.reducer;
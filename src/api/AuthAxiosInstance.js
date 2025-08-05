// src/api/axiosInstance.js
import axios from 'axios';
import {store} from '../App/store'; // adjust path as needed
import { refreshAccessToken, logout } from '../features/user/authSlice';

const AuthAxiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

// Request interceptor: attach access token
AuthAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and refresh token
AuthAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const result = await store.dispatch(refreshAccessToken());

        if (refreshAccessToken.fulfilled.match(result)) {
          const newToken = result.payload.access_token;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AuthAxiosInstance;

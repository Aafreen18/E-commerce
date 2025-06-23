import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async thunk for login (simulate API call)
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password'
        ) {
          resolve({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            token: 'fake-jwt-token',
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  }
);

const initialState = {
  userInfo: null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

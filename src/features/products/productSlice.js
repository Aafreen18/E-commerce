import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get('https://fakestoreapi.in/api/products');
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const res = await axios.get(`https://fakestoreapi.in/api/products/${productId}`);
    return res.data.product; 
  }
);

export const fetchProductsCategory = createAsyncThunk(
  'products/fetchCategory',
  async () => {
    const response = await fetch(`https://fakestoreapi.in/api/products/category`);
    return await response.json();
  }
);


export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category) => {
    const response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category}`);
    return await response.json();
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null, // Add this to store the single product
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // For fetching all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // For fetching single product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch all category
      .addCase(fetchProductsCategory.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductsCategory.fulfilled, (state, action) => {
        state.status = true;
        state.items = action.payload;
      })
      .addCase(fetchProductsCategory.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })

      //fetch product by category 
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = true;
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
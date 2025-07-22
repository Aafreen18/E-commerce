import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/AxiosInstance';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axiosInstance.get('/products');
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const res = await axiosInstance.get(`/products/${productId}`);
    return res.data.product;
  }
);

export const fetchProductsCategory = createAsyncThunk(
  'products/fetchCategory',
  async () => {
    const response = await axiosInstance.get('/products/category');
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category) => {
    const response = await axiosInstance.get(`/products/category?type=${category}`);
    return response.data;
  }
);

export const fetchProductsByPage = createAsyncThunk(
  'products/fetchByPage',
  async (page, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products?page=${page}&limit=20`);
      const products = res.data.products;

      // Ensure it returns an array
      if (!Array.isArray(products)) {
        throw new Error("Invalid response: products is not an array");
      }

      return products;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || 'Something went wrong');
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // general product list
    paginatedItems: [], // infinite scroll product list
    currentProduct: null,
    currentPage: 1,
    hasMore: true,
    loading: false,
    status: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    resetPaginatedProducts: (state) => {
      state.paginatedItems = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔁 All products
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

      // 🔁 Product by ID
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

      // 🔁 Category list
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

      // 🔁 Products by Category
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
      })

      // ✅ Infinite scroll paginated products
      .addCase(fetchProductsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(fetchProductsByPage.fulfilled, (state, action) => {
        const newItems = action.payload || []; 
        state.loading = false;
        state.paginatedItems.push(...newItems); 
        state.hasMore = newItems.length === 20; 
        state.currentPage += 1;
      })
      .addCase(fetchProductsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentProduct, resetPaginatedProducts } = productSlice.actions;
export default productSlice.reducer;

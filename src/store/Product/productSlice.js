import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findProductById, findProducts } from '../../apis/products.js';
const axios = require('axios');

export const getProductById = createAsyncThunk('/products/getPRoductById', async(id, thunkAPI) => {
  try {
    const response = await findProductById(id);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});



export const loadProducts = createAsyncThunk('/products', async(data, thunkAPI) => {
  try {
    const response = await findProducts(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
 });

const initialState = {
  product: {},
  products: [],
  productId: null,
  productPending: false,
  productLoadSuccess: false,
  productLoadError: false,
  productsPending: false,
  productsLoadSuccess: false,
  productsLoadError: false,
  searchTerm: "",
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductId: (state) => {
      state.productId = action.payload;
      return state;
    },
    clearProduct: (state) => {
      state.productId = null;
      state.products = [];
      return state;
    },

    setSearchTerm: (state) => {
      state.searchTerm = action.payload;
      return state;
    },

    clearProdStatusUpdates: (state) => {
      state.productPending = false;
      state.productLoadError = false;
      state.productsPending = false;
      state.productsLoadError = false;
      return state;
    },
    extraReducers: (builder) => {
      builder
       .addCase(getProductById.pending, (state, action) => {
         state.productPending = true;
         state.productLoadError = false;
       })
       .addCase(getProductById.fulfilled, (state, action) => {
         state.productLoadSuccess = true;
         state.productLoadError = false;
         state.product = action.payload;
         state.productId = action.payload.id;
       })
       .addCase(getProductById.rejected, (state, action) => {
         state.productPending = false;
         state.productLoadError = action.payload;
        })
       .addCase(loadProducts.pending, (state, action) => {
         state.productsPending = true;
         state.productsLoadError = false;
       })
       .addCase(loadProducts.fulfilled, (state, action) => {
         state.productsLoadSuccess = true;
         state.productsLoadError = false;
         state.products = action.payload;
       })
       .addCase(loadProducts.rejected, (state, action) => {
        state.productsPending = false;
        state.productsLoadError = action.payload;
       })
    }
  }
});

export default productSlice.reducer;
export const {setSearchTerm, setProductId, clearProduct, clearProdStatusUpdates} = productSlice.actions;

export const selectProductId = state => state.product.productId;
export const selectProduct = state => state.product.product;
export const selectProducts = state => state.product.products;
export const selectProductPending = state => state.product.productPending;
export const selectProductPendError = state => state.product.productLoadError;
export const selectProductLoadSuccess = state => state.product.productLoadSuccess;
export const selectProductsPending = state => state.product.productsPending;
export const selectProductsLoadError = state => state.product.productsLoadError;
export const selectSearchTerm = state => state.product.searchTerm;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findProductById, findProducts } from '../../apis/products.js';
const axios = require('axios');

export const getProductById = createAsyncThunk('/products/getProductById', async(id, thunkAPI) => {
  try {
    const response = await findProductById(id);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err);
  }
});



export const loadProducts = createAsyncThunk('/products/loadProducts', async(thunkAPI) => {
  try {
    const response = await findProducts();
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err);
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
    setProductId: (state, action) => {
      state.productId = action.payload.id;
      return state;
    },
    clearProduct: (state, action) => {
      state.productId = null;
      state.product = {};
      return state;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      return state;
    },

    clearProdStatusUpdates: (state) => {
      state.productPending = false
      state.productLoadError = false;
      state.productsPending = false;
      state.productsLoadError = false;
      return state;
    },
   },
   extraReducers: (builder) => {
      builder
       .addCase(getProductById.pending, (state, action) => {
         state.productPending = true;
         state.productLoadError = false;
       })
       .addCase(getProductById.fulfilled, (state, action) => {
         state.productPending = false;
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
         state.productsPending = false;
         state.productsLoadSuccess = true;
         state.productsLoadError = false;
         state.products = action.payload;
       })
       .addCase(loadProducts.rejected, (state, action) => {
        state.productsLoadSuccess = false;
        state.productsPending = false;
        state.productsLoadError = action.payload;
       })
     }
});

export default productSlice.reducer;
export const {setSearchTerm, setProductId, clearProduct, clearProdStatusUpdates} = productSlice.actions;

export const selectProduct = state => state.products.product;
export const selectProducts = state => state.products.products;
export const selectProductId = state => state.products.product.id;
export const selectProductPending = state => state.products.productPending;
export const selectProductLoadError = state => state.products.productLoadError;
export const selectProductLoadSuccess = state => state.products.productLoadSuccess;
export const selectProductsPending = state => state.products.productsPending;
export const selectProductsLoadError = state => state.products.productsLoadError;
export const selectSearchTerm = state => state.products.searchTerm;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const getProductById = createAsyncThunk('/products/getProductById}', async(productId, {reject}) => {
  try {
   const response = await axios.get('/products/{productId}');
   return response.data;
  } catch(err) {
    return reject(err.response.data);
  }
});



export const loadProducts = createAsyncThunk('/products/loadProducts', async({reject}) => {
  try {
   const response = await axios.get('/products');
   return response.data;
  } catch(err) {
    return reject(err.response.data);
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
  searchTerm: false
};

const productSlice = createSlice({
  name: 'product',
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
      [getProductById.pending]: (state, action) => {
        state.productPending = true;
        state.productLoadError = false;
      },
      [getProductById.fulfilled]: (state, action) => {
        state.productLoadSuccess = true;
        state.productLoadError = false;
        state.product = action.payload;
      },
      [getProductById.rejected]: (state, action) => {
        state.productPending = false;
        state.productLoadError = action.payload;
      },
      [loadProducts.pending]: (state, action) => {
        state.productsPending = true;
        state.productsLoadError = false;
      },
      [loadProducts.fulfilled]: (state, action) => {
        state.productsLoadSuccess = true;
        state.productsLoadError = false;
        state.products = action.payload;
      },
      [loadProducts.rejected]: (state, action) => {
        state.productsPending = false;
        state.productsLoadError = action.payload;
      },
    }
});

export default productSlice.reducer;
export const {setProductId, clearProduct, clearProdStatusUpdates} = productSlice.actions;
export const selectSearchTerm = (state) => state.products.searchTerm;

export const selectProductId = state => state.product.productId;
export const selectProduct = state => state.product.product;
export const selectProducts = state => state.product.products;
export const selectProductPending = state => state.product.productPending;
export const selectProductPendError = state => state.product.productLoadError;
export const selectProductLoadSuccess = state => state.product.productLoadSuccess;
export const selectProductsPending = state => state.product.productsPending;
export const selectProductsLoadError = state => state.product.productsLoadError;


export const selectFilteredProducts = state => {
  const searchTerm = selectSearchTerm;
  let products = selectProducts(state);
  if(searchTerm) {
    products = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return products;
};

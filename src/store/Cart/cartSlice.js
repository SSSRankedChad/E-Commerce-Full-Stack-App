import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateItem, cartCheckout } from '../../apis/cart.js';
const axios = require('axios');

export const loadCart = createAsyncThunk('/cart/:cartId', async(data, thunkAPI) => {
  try {
    const response = await getCart(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateCart = createAsyncThunk('/cart/:cartId', async(data, thunkAPI) => {
  try {
    const response = await updateItem(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const checkout = createAsyncThunk('/cart/checkout', async(data, thunkAPI) => {
  try {
    const response = await cartCheckout(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  cart :{},
  cartId: null,
  loadCartPending: false,
  loadCartSuccess: false,
  loadCartError: false,
  updateCartPending: false,
  updateCartSuccess: false,
  updateCartError: false,
  checkoutPending: false,
  checkoutError: false,
  checkoutSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
      return state;
    },
    clearCartStatusUpdates: (state, action) => {
      state.loadCartError = false;
      state.loadCartSuccess = false;
      state.updateCartError = false;
      state.updateCartSuccess = false;
      state.checkoutError = false;
      state.checkoutError = false;
    },
    clearCart: (state, action) => {
      state.cart = {};
      state.cartId = null;
      return state;
    },
    extraReducers: (builder) => {
     builder
      .addCase(loadCart.pending, (state, action) => {
        state.loadCartPending = true;
        state.loadCartError = false;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.loadCartPending = false;
        state.loadCartError = false;
        state.loadCartSuccess = true;
        state.cart = action.payload;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loadCartPending = false;
        state.loadCartSuccess = false;
        state.loadCartError = action.payload;
        state.cart = {};
      })
      .addCase(updateCart.pending, (state, action) => {
        state.updateCartPending = true;
        state.updateCartError = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.updateCartPending = false;
        state.updateCartError = false;
        state.updateCartSuccess = true;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.updateCartPending = false;
        state.updateCartSuccess = false;
        state.updateCartError = action.payload;
        state.cart = {};
      })
      .addCase(checkout.pending, (state, action) => {
        state.checkoutPending = true;
        state.checkoutError = false;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.checkoutPending = false;
        state.checkoutError = false;
        state.checkoutSuccess = true;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkoutPending = false;
        state.checkoutSuccess = false;
        state.checkoutError = action.payload;
      })
     }
   }
});

export const { clearCart, clearCartStatusUpdates, setCartId } = cartSlice.actions;
export default cartSlice.reducer;


export const selectCart = state => state.cart.cart;
export const selectCartId = state => state.cart.cartId;
export const selectLoadCart = state => state.cart.loadCartPending;
export const selectLoadCartError = state => state.cart.loadCartError;
export const selctUpdatingCart = state => state.cart.updateCart;
export const selectUpdatingCartError = state => state.cart.updatingCartError;
export const selectCheckoutSuccess = state => state.cart.checkoutSuccess;
export const selectCheckoutError = state => state.cart.checkoutError;
export const selectCheckoutPending = state => state.cart.checkoutPending;

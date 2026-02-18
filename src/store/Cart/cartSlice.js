import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addItem, createCart, updateItem, cartCheckout } from '../../apis/cart.js';
const axios = require('axios');


export const create = createAsyncThunk('/cart/create', async(thunkAPI) => {
  try {
    const response = await createCart();
    return resposnse.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const addCartItem = createAsyncThunk('/cart/addItem', async(userId, thunkAPI) => {
  try {
    const response = await addItem(userId);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteCartItem = createAsyncThunk('/cart/delteeCart', async(cartItemId, thunkAPI) => {
  try {
    const response = await deleteItem(cartItemId);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const loadCart = createAsyncThunk('/cart/loadCart', async(userId, thunkAPI) => {
  try {
    const response = await getCart(userId);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateCart = createAsyncThunk('/cart/updateCart', async(id, thunkAPI) => {
  try {
    const response = await updateItem(id);
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
  cartId: 0,
  cartQuantity: 0,
  createCartPending: false,
  createCartSuccess: false,
  createCartError: false,
  addCartItemPending: false,
  addCartItemSuccess: false,
  addCartItemError: false,
  deleteCartItemPending: false,
  deleteCartItemSuccess: false,
  deleteCartItemError: false,
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
      state.cartId = action.payload.id;
    },
    clearCartStatusUpdates: (state, action) => {
      state.createCartPending = false;
      state.createCartSuccess = false;
      state.createCartError = false;
      state.addCartItemPending = false;
      state.addCartItemSuccess = false;
      state.addCartItemError = false;
      state.deleteCartItemPending = false;
      state.deleteCartItemSuccess = false;
      state.deleteCartItemError = false;
      state.loadCartPending = false;
      state.loadCartSuccess = false;
      state.loadCartError = false;
      state.loadCartSuccess = false;
      state.updateCartError = false;
      state.updateCartSuccess = false;
      state.updateCartPending = false;
      state.updateCartSuccess = false;
      state.checkoutPending = false;
      state.checkoutError = false;
      state.checkoutSuccess = false;
    },
    clearCart: (state, action) => {
      state.cart = {};
      state.cartQuantity = 0;
      state.cartId = null;
    },
  },
    extraReducers: (builder) => {
     builder
      .addCase(create.pending, (state, action) => {
        state.createCartPending = true;
        state.createCartSuccess = false;
        state.createCartError = false;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.createCartPending = false;
        state.createCartSuccess = true;
        state.createCartError = false;
        state.cart = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.createCartPending = false;
        state.createCartSuccess = false;
        state.createCartError = action.payload;
      })
      .addCase(loadCart.pending, (state, action) => {
        state.loadCartPending = true;
        state.loadCartError = false;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.loadCartPending = false;
        state.loadCartError = false;
        state.loadCartSuccess = true;
        state.cart = action.payload;
        state.cartId = action.payload.id;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loadCartPending = false;
        state.loadCartSuccess = false;
        state.loadCartError = action.payload;
        state.cart = {};
      })
      .addCase(addCartItem.pending, (state, action) => {
        state.addCartItemPending = true;
        state.addCartItemSuccess = false;
        state.addCartItemError = false;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.addCartItemPending = false;
        state.addCartItemSuccess = true;
        state.addCartItemError = false;
        state.cart = action.payload;
        state.cartQuantity = action.payload.cartQuantity;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.addCartItemPending = false;
        state.addCartItemSuccess = false;
        state.addCartItemError = action.payload;
      })
      .addCase(deleteCartItem.pending, (state, action) => {
        state.deleteCartItemPending = true;
        state.deleteCartItemSuccess = false;
        state.deleteCartItemError = false;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.deleteCartItemPending = false;
        state.deleteCartItemError = false;
        state.deleteCartItemSuccess = true;
        state.cart = action.payload;
        state.cartQuantity = action.payload.cartQuantity;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.deleteCartItemPending = false;
        state.deleteCartItemSuccess = false;
        state.deleteCartItemError = action.payload;
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
        state.cartId = action.payload.id;
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
        state.checkoutSuccess = action.payload;
        state.cart = {};
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkoutPending = false;
        state.checkoutSuccess = false;
        state.checkoutError = action.payload;
      })
   }
});

export const { clearCart, clearCartStatusUpdates, setCartId } = cartSlice.actions;
export default cartSlice.reducer;


export const selectCart = state => state.cart.cart;
export const selectCartId = state => state.cart.cartId;
export const selectCartQuantity = state => state.cart.cartQuantity;
export const selectLoadCart = state => state.cart.loadCartPending;
export const selectLoadCartError = state => state.cart.loadCartError;
export const selectLoadCartSuccess = state => state.cart.loadCartSuccess;
export const selctUpdatingCart = state => state.cart.updateCart;
export const selectUpdatingCartError = state => state.cart.updatingCartError;
export const selectUpdateCartSuccess = state => state.cart.updateCartSuccess;
export const selectCheckoutSuccess = state => state.cart.checkoutSuccess;
export const selectCheckoutError = state => state.cart.checkoutError;
export const selectCheckoutPending = state => state.cart.checkoutPending;

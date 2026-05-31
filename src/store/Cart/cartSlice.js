import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addItem, cartCheckout, updateItem, findItems, deleteItem } from '../../apis/cart.js';

export const addCartItem = createAsyncThunk('/cart/addCartItem', async({product, quantity}, { rejectWithValue }) => {
  try {

    const response = await addItem(product.id, quantity);
    const item = {
      ...product,
      cartItemId: response.data.id,
      qty: quantity,
    }
    return { item };
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteCartItem = createAsyncThunk('/cart/deleteCartItem', async(cartItemId, { rejectWithValue }) => {
  try {
    const response = await deleteItem(cartItemId);
    return { item: cartItemId };
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchCart = createAsyncThunk('/cart/fetchCart', async(userId, { rejectWithValue }) => {
  try {
    const response = await getCart(userId);
    return response.data;
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
});


export const loadItems = createAsyncThunk('/cart/loadItems', async(userId, { rejectWithValue }) => {
  try {
    const response = await findItems(userId);
    return response.data;
  } catch(err) {
    return rejectWithValue(err.response.data); 
  }
})


export const updateCart = createAsyncThunk('/cart/updateCart', async({ cartItemId, quantity} , { rejectWithValue }) => {
  try {
    const response = await updateItem(cartItemId, quantity);
    return {
      ...response.data,
      quantity,
      cartItemId
    };
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
})


export const checkout = createAsyncThunk('/cart/checkout', async({userId, cartId, paymentInfo}, { rejectWithValue }) => {
  try {
    const response = await cartCheckout(userId, cartId, paymentInfo);
    return response.data;
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  cart: {},
  cartItems: [],
  checkoutSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
    extraReducers: (builder) => { 
     builder
      .addCase(addCartItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cartItems.push(item);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cartItems = state.cartItems.filter((product) => product.cartItemId !== item.id);
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.checkoutSuccess = true;
      })

      .addCase(loadItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.map((item) => ({
          ...item,
          cartItemId: item.id
        }));

       })
      .addCase(updateCart.fulfilled, (state, action) => {
        const { quantity, cartItemId } = action.payload;
        const item = state.cartItems.find((item) => item.id === cartItemId);
        if(item) {
          item.qty = quantity;
        }
      })
    }
});

export const selectCheckoutSuccess = state => state.cart.checkoutSuccess;

export default cartSlice.reducer;

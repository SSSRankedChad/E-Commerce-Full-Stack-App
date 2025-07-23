import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Product/productSlice.js';
import cartReducer from './Cart/cartSlice.js';
import userReducer from './User/userSlice.js';
import orderReducer from './Orders/orderSlice.js';

export const store = configureStore({
   reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
  }
});

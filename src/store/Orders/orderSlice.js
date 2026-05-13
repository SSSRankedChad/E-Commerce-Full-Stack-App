import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, findOrder, orderUpdate, getOrders } from '../../apis/orders.js';

const axios = require('axios');

export const loadOrderById = createAsyncThunk('/orders/loadOrderById', async(orderId, { rejectWithValue }) => {
  try {
    const response = await findOrder(orderId);
    console.log(response);
    return response.data;
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
});



export const loadOrders = createAsyncThunk('/orders/loadOrders', async(param, { rejectWithValue }) => {
  try {
    const response = await getOrders();
    console.log(response.data);
    return response.data;
   } catch(err) {
    return rejectWithValue(err.response.data);
  }
});


export const updateOrder = createAsyncThunk('/orders/updateOrder', async({ orderId, order}, { rejectWithValue }) => {
  try {
    const response = await orderUpdate(orderId, order);
    return response.data;
  } catch(err) {
    return rejectWithValue(err.response.data);
  }
});


const initialState = {
  order: {},
  orders: [],
};


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
    extraReducers: (builder) =>  {
      builder
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.ordersPending = false;
        state.ordersLoadError = false;
        state.ordersLoadSuccess = true;
        state.orders = action.payload;
      })
      .addCase(loadOrderById.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderId = action.payload.id;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.updatingOrder = false;
        state.updateOrderError = false;
        state.updateOrderSuccess = true;
        state.order = action.payload;
      })
    }
});

  export default orderSlice.reducer;


  export const selectOrder = state => state.orders.order;
  export const selectOrders = state => state.orders.orders;

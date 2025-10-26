import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, findOrder, findOrderById, updateOrder } from '../../apis/orders.js';

const axios = require('axios');


export const loadOrderById = createAsyncThunk('/orders/loadOrderById', async((data), thunkAPI) => {
  try {
    const response = await findOrderById(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const loadOrders = createAsyncThunk('/orders/loadOrders', async((data), thunkAPI) => {
  try {
    const response = await axios.get('/orders');
    return response.data;
   } catch(err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const createOrder = createAsyncThunk('/orders/createOrder', async((data), thunkAPI) => {
  try {
    const response = await createOrder(data);
    return response.data;
  } catch(err) {
    return thuunkAPI.rejectWithValue(err);
  }
});

export const cancelOrder = createAsyncThunk('/orders/cancelOrder', async((data), thunkAPI) => {
  try {
    const response = await axios.delete('/orders/{orderId}', orderId);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWIthValue(err);
  }
});

export const updateOrder = createAsyncThunk('/orders/updateOrder', async((data), thunkAPI) => {
  try {
    const response = await orderUpdate(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err);
  }
});


const initialState = {
  order: {},
  orders: [],
  orderId: null,
  orderPending: false,
  orderLoadError: false,
  orderLoadSuccess: false,
  ordersPending: false,
  ordersLoadError: false,
  ordersLoadSuccess: false,
  cancelingOrder: false,
  cancelOrderError: false,
  cancelOrderSuccess: false,
  creatingOrder: false,
  createOrderError: false,
  createOrderSuccess: false,
  updatingOrder: false,
  updateOrderError: false,
  updateOrderSuccess: false,
};


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderId: (state) => {
      state.orderId = action.payload.order_id;
      return state;
    },

    clearOrders: (state) => {
      state.orderId = null;
      state.orders = [];
      return state;
    },
    clearOrderStatusUpdates: (state) => {
      state.orderPending = false;
      state.orderLoadError = false;
      state.ordersPending = false;
      state.ordersLoadError = false;
      state.cancelingOrder = false;
      state.cancelOrderError = false;
      state.creatingOrder = false;
      state.createOrderError = false;
      state.updatingOrder = false;
      state.updateOrderError = false;
    },
    extraReducers: (builder) =>  {
      builder
      .addCase(loadOrderById.pending, (state, action) => {
        state.orderPending = true;
        state.orderLoadError = false;
      })
      .addCase(loadOrderById.fulfilled, (state, action) => {
        state.orderPending = false;
        state.orderLoadError =  false;
        state.orderLoadSuccess = true;
        state.order = action.payload;
        state.orderId = action.payload.order_id;
      })
      .addCase(loadOrderById.rejected, (state, action) => {
        state.orderPending = false;
        state.orderLoadError = action.payload;
        state.order = {};
        state.orderId = null;
      })
      .addCase(loadOrders.pending, (state, action) => {
        state.ordersPending = true;
        state.ordersLoadError = false;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.ordersPending = false;
        state.ordersLoadError = false;
        state.ordersLoadSuccess = true;
        state.orders = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.ordersPending = false;
        state.ordersLoadError = action.payload;
        state.orders = [];
        state.orderId = null;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.creatingOrder = true;
        state.createOrderError = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.creatingOrder = false;
        state.createOrderError = false;
        state.creatOrderSuccess = true;
        state.order = action.payload;
        state.orderId = action.payload.order_id;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.creatingOrder = false;
        state.createOrderError = action.payload;
        state.order = {};
        state.orderId = null;
      })
      .addCase(cancelOrder.pending, (state, action) => {
        state.cancelingOrder = true;
        state.cancelOrderError = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelingOrder = false;
        state.cancelOrderError = false;
        state.cancelOrderSuccess = action.payload;
        state.order = {};
        state.orderId = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelingOrder = false;
        state.cancelOrderError = action.payload;
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.updatingOrder = false;
        state.updateOrderError = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.updatingOrder = false;
        state.updateOrderError = false;
        state.updateOrderSuccess = true;
        state.order = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.updatingOrder = false;
        state.updateOrderError = action.payload;
        state.order = {};
        state.orderId = null;
      })
    }
  }
});
  export const {setOrderId, clearOrderStatusUpdates, clearOrders} = orderSlice.actions;
  export default orderSlice.reducer;

  export const selectOrder = state => state.orders.order;
  export const selectOrders = state => state.orders.orders;
  export const selectOrderId = state => state.orders.orderId;
  export const selectOrderPending = state => state.orders.orderPending;
  export const selectOrdersPending = state => state.orders.orderPending;
  export const selectOrderLoadError = state => state.orders.orderLoadError;
  export const selectOrdersLoadError = state => state.orders.ordersLoadError;
  export const selectOrdersLoadSuccess = state => state.orders.ordersLoadSuccess;
  export const selectCancelingOrder = state => state.orders.cancelingOrder;
  export const selectCancelOrderSuccess = state => state.orders.cancelOrderSuccess;
  export const selectCancelingOrderError = state => state.orders.cancelOrderError;
  export const selectCreatingOrder = state => state.orders.creatingOrder;
  export const selectCreatingOrderError = state => state.orders.creatingOrderError;
  export const selectUpdatingOrder = state => state.orders.updateOrder;
  export const selectUpdatingOrderErorr = state => state.orders.updateOrderError;

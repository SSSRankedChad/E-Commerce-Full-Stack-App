import API from './client.js';

export const createOrder = async() => {
  try {
    return await API.post('/orders/');
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrder = async(orderId) => {
  try {
    return await API.get(`/orders/${orderId}`);
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrderById = async(orderId) => {
  try {
    return await API.get(`orders/${orderId}`);
  } catch(err) {
    throw err.response.data;
  }
}

export const orderUpdate = async(orderId) => {
  try {
    return await API.put(`orders/${orderId}`);
  } catch(err) {
    throw err.response.data;
  }
}

export const getOrders = async() => {
  try {
    return await API.get('/orders');
  } catch(err) {
    throw err.response.data;
  }
}

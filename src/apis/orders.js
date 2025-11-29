import API from './client.js';

export const createOrder = async(data) => {
  try {
    return await API.post('/orders', data);
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrder = async(id) => {
  try {
    return await API.get('/orders/${id}', orderId);
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrderById = async(id) => {
  try {
    return await API.get('orders/${id}', id);
  } catch(err) {
    throw err.response.data;
  }
}

export const orderUpdate = async(id) => {
  try {
    return await API.put('/orders/${id}', id);
  } catch(err) {
    throw err.response.data;
  }
}

export const getOrders = async(data) => {
  try {
    return await API.get('/orders', data);
  } catch(err) {
    throw err.response.data;
  }
}

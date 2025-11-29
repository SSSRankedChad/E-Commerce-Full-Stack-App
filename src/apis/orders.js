import API from './client.js';

export const createOrder = async(data) => {
  try {
    return await API.post('/orders', data);
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrder = async(orderId) => {
  try {
    return await API.get('/orders/${orderId}', orderId);
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrderById = async(orderId) => {
  try {
    return await API.get('orders/${orderId}', orderId);
  } catch(err) {
    throw err.response.data;
  }
}

export const orderUpdate = async(orderId) => {
  try {
    return await API.put('orders/${orderId}', orderId);
  } catch(err) {
    throw err.response.data;
  }
}

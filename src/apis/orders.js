import API from './client.js';

export const createOrder = async(userId) => {
  try {
    return await API.post('/api/orders/');
  } catch(err) {
    throw err;
  }
}

export const deleteOrder = async() => {
  try {
    return await API.delete('/api/orders/');
  } catch(err) {
    throw err;
  }
}


export const findOrder = async(orderId) => {
  try {
    return await API.get(`/api/orders/${orderId}`);
  } catch(err) {
    throw err;
  }
}


export const orderUpdate = async(orderId, order) => {
  try {
    return await API.put(`/api/orders/${orderId}`, { order });
  } catch(err) {
    throw err;
  }
}

export const getOrders = async() => {
  try {
    return await API.get(`/api/orders/`);
  } catch(err) {
    throw err;
  }
}


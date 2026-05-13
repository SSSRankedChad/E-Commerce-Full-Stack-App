import API from './client.js';

export const createOrder = async(userId) => {
  try {
    return await API.post('/orders/');
  } catch(err) {
    throw err;
  }
}

export const deleteOrder = async() => {
  try {
    return await API.delete('/orders/');
  } catch(err) {
    throw err;
  }
}


export const findOrder = async(orderId) => {
  try {
    return await API.get(`/orders/${orderId}`);
  } catch(err) {
    throw err;
  }
}


export const orderUpdate = async(orderId, order) => {
  try {
    return await API.put(`orders/${orderId}`, { order });
  } catch(err) {
    throw err;
  }
}

export const getOrders = async() => {
  try {
    return await API.get(`/orders/`);
  } catch(err) {
    throw err;
  }
}


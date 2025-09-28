import API from './client.js';

export const createOrder = async(data) => {
  try {
    const response = await API.post('/orders', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrder = async(data) => {
  try {
    const response = await API.get('/orders/:orderId', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const findOrderById = async(data) => {
  try {
    const response = await API.get('/:orderId', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

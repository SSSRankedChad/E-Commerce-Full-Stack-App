import API from './client.js';

export const findProducts = async(data) => {
  try {
    const response = await API.get('/products', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const findProductById = async(data) => {
  try {
    const response = await API.get('/products/:productId', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

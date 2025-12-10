import API from './client.js';

export const findProducts = async(data) => {
  try {
    return await API.get('/products', data);
  } catch(err) {
    throw err.response.data;
  }
}


export const findProductById = async(productId) => {
  try {
    return await API.get(`/products/${productId}`);
  } catch(err) {
    throw err.response.data;
  }
}

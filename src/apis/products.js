import API from './client.js';

export const findProducts = async(category, sort) => {
  try {
    return await API.get('/products', category, sort);
  } catch(err) {
    throw err.response.data;
  }
}


export const findProductById = async(productId) => {
  try {
    return await API.get(`/products/${productId}`,);
  } catch(err) {
    throw err.response.data;
  }
}

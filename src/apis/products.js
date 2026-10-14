import API from './client.js';

export const findProducts = async() => {
  try {
    return await API.get(`/api/products`);
  } catch(err) {
    throw err;
  }
}


export const findProductById = async(productId) => {
  try {
    return await API.get(`/api/products/${productId}`);
  } catch(err) {
    throw err;
  }
}

import API from './client.js';

export const findProducts = async() => {
  try {
    return await API.get('/products');
  } catch(err) {
    throw err.response.data;
  }
}


export const findProductById = async(id) => {
  try {
    return await API.get(`/products/${id}`);
  } catch(err) {
    throw err.response.data;
  }
}

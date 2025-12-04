import API from './client.js';


export const getCart = async(cartId) => {
  try {
   return await API.get(`/cart/${cartId}`);
  } catch(err) {
   throw err.response.data;
  }
};

export const addItem = async(userId) => {
  try {
    return await API.post(`/cart/${userId}`);
  } catch(err) {
    throw err.response.data;
  }
};


export const deleteItem = async(cartItemId) => {
  try {
    return await API.delete(`/cart/${cartItemId}`);
  } catch(err) {
    throw err.response.data;
  }
};

export const updateItem = async(cartItemId) => {
  try {
    return await API.put(`/cart/${cartItemId}`);
  } catch(err) {
    throw err.response.data;
  }
};

export const cartCheckout = async(data) => {
  try {
    return await API.post(`/cart/checkout`, data);
  } catch(err) {
    throw err.response.data;
  }
}



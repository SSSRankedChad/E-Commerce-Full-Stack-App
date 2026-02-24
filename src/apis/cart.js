import API from './client.js';


export const createCart = async() => {
  try {
    return await API.post(`/carts/mine/`);
  } catch(err) {
    throw err.response.data;
  }
}


export const getCart = async() => {
  try {
   return await API.get(`/carts/mine/`);
  } catch(err) {
   throw err.response.data;
  }
};

export const addItem = async(cartItemId) => {
  try {
    return await API.post(`/carts/mine/${cartItemId}`);
  } catch(err) {
    throw err.response.data;
  }
};


export const deleteItem = async(cartItemId) => {
  try {
    return await API.delete(`/carts/mine/${cartItemId}`);
  } catch(err) {
    throw err.response.data;
  }
};

export const updateItem = async(cartItemId) => {
  try {
    return await API.put(`/carts/mine/${cartItemId}`);
  } catch(err) {
    throw err.response.data;
  }
};

export const cartCheckout = async() => {
  try {
    return await API.post(`/cart/checkout`);
  } catch(err) {
    throw err.response.data;
  }
}



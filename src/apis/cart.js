import API from './client.js';

export const getCart = async(userId) => {
  try {
   return await API.get(`/api/cart/mine`, userId);
  } catch(err) {
   throw err;
  }
};

export const findItems = async(userId) => {
  try {
    return await API.get(`/api/cart/mine/items`, userId);
  } catch(err) {
    throw err;
  }
}

export const addItem = async(productId, quantity) => {
  try {
    return await API.post(`/api/cart/mine/items`, {productId, quantity});
  } catch(err) {
    throw err;
  }
};


export const deleteItem = async(cartItemId) => {
  try {
    return await API.delete(`/api/cart/mine/items/${cartItemId}`);
  } catch(err) {
    throw err;
  }
};

export const updateItem = async(cartItemId, quantity, userId) => {
  try {
    return await API.put(`/api/cart/mine/items/${cartItemId}`, {userId, quantity});
  } catch(err) {
    throw err;
  }
};

export const cartCheckout = async(userId, cartId, paymentInfo) => {
  try {
    return await API.post(`/api/cart/checkout`, {userId, cartId, paymentInfo});
  } catch(err) {
    throw err;
  }
}



import API from './client.js';

export const getCart = async(userId) => {
  try {
   return await API.get(`/cart/mine`, userId);
  } catch(err) {
   throw err;
  }
};

export const findItems = async(userId) => {
  try {
    return await API.get(`/cart/mine/items`, userId);
  } catch(err) {
    throw err;
  }
}

export const addItem = async(productId, quantity) => {
  try {
    return await API.post(`/cart/mine/items`, {productId, quantity});
  } catch(err) {
    throw err;
  }
};


export const deleteItem = async(cartItemId) => {
  try {
    return await API.delete(`/cart/mine/items/${cartItemId}`);
  } catch(err) {
    throw err;
  }
};

export const updateItem = async(cartItemId, quantity, userId) => {
  try {
    return await API.put(`/cart/mine/items/${cartItemId}`, {userId, quantity});
  } catch(err) {
    throw err;
  }
};

export const cartCheckout = async(cartId, paymentInfo) => {
  try {
    return await API.post(`/cart/checkout`, {cartId, paymentInfo});
  } catch(err) {
    throw err;
  }
}



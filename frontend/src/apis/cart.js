import API from './client.js';


export const getCart = async(data) => {
  try {
   const response = await API.get('/cart/:cartId', {data});
   return response.data;
  } catch(err) {
   throw err.response.data;
  }
};

export const addItem = async(userId, data) => {
  try {
    const response = await API.post('/cart/:userId', {userId, data});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
};


export const deleteItem = async(cartItemId) => {
  try {
    const response = await API.delete('/cart/:cartItemId', cartItemId);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
};

export const updateItem = async(cartItemId, data) => {
  try {
    const response = await API.put('/cart/:cartItemId', {cartItemId, data});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
};

export const cartCeckout = async(cartItem, data, payment) => {
  try {
    const response = await API.post('/cart/checkout', {cartItem, data, payment});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}



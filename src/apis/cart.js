import API from './client.js';


export const getCart = async(id) => {
  try {
   return await API.get('/cart/${id}', {id});
  } catch(err) {
   throw err.response.data;
  }
};

export const addItem = async(userId) => {
  try {
    return await API.post('/cart/${userId}', {userId});
  } catch(err) {
    throw err.response.data;
  }
};


export const deleteItem = async(cartItemId) => {
  try {
    return await API.delete('/cart/${cartItemId}', {cartItemId});
  } catch(err) {
    throw err.response.data;
  }
};

export const updateItem = async(cartItemId) => {
  try {
    return await API.put('/cart/${cartItemId}', {cartItemId});
  } catch(err) {
    throw err.response.data;
  }
};

export const cartCheckout = async(data) => {
  try {
    return await API.post('/cart/checkout', {cartItemId});
  } catch(err) {
    throw err.response.data;
  }
}



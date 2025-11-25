import API from './client.js';

export const getUser = async(data) => {
  try {
    return await API.get('/user/:userId', data);
  } catch(err) {
    throw err.response.data;
  }
}


export const userUpdate = async(data) => {
  try {
    return await API.put('/user/:userId', data);
  } catch(err) {
    throw err.response.data;
  }
}

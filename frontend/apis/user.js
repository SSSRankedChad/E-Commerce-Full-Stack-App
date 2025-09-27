import API from './client.js';

export const getUser = async(data) => {
  try {
    const response = await API.get('/user/:userId', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const userUpdate = async(data) => {
  try {
    const response = await API.put('/user/:userId', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

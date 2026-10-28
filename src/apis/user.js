import API from './client.js';

export const getUser = async(userId) => {
  try {
    return await API.get(`/api/users/${userId}`);
  } catch(err) {
    throw err;
  }
}


export const userUpdate = async(userId, data) => {
  try {
    return await API.put(`/api/users/${userId}`, data);
  } catch(err) {
    throw err;
  }
}

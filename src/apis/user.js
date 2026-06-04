import API from './client.js';

export const getUser = async(userId) => {
  try {
    return await API.get(`/user/${userId}`);
  } catch(err) {
    throw err;
  }
}


export const userUpdate = async(userId) => {
  try {
    return await API.put(`/user/${userId}`, data);
  } catch(err) {
    throw err;
  }
}

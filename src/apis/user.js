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
    return await API.post(`/user/${userId}`);
  } catch(err) {
    throw err;
  }
}

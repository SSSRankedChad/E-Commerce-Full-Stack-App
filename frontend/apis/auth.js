import API from './client.js';

export const register = async(data) => {
  try {
    const response = await API.post('/auth/register', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const login = async(data) => {
  try {
    const response = await API.post('/auth/login', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

export const isLoggedIn = async() => {
  try {
    const response = await API.get('/auth/is_logged_in');
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

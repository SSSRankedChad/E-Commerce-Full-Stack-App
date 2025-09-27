import API from './client.js';

export const register = async(data) => {
  try {
    const response = await API.post('/api/register', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const userLogin = async(data) => {
  try {
    const response = await API.post('/api/login', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

export const isLoggedIn = async() => {
  try {
    const response = await API.get('/api/login');
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

import API from './client.js';

export const register = async(data) => {
  try {
    const response = await API.post('/register', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}


export const userLogin = async(data) => {
  try {
    const response = await API.post('/login', data);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

export const isLoggedIn = async() => {
  try {
    const response = await API.get('/login');
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

import API from './client';

export const register = async(data) => {
  try {
     return await API.post('/auth/register', data);
  } catch(err) {
    throw err.response.data;
  }
}


export const userLogin = async(data) => {
  try {
    return await API.post('/auth/login', data);
  } catch(err) {
    throw err.response.data;
  }
}

export const isLoggedIn = async() => {
  try {
    return await API.get('/login');
  } catch(err) {
    throw err.response.data;
  }
}


export const userLogout = async() => {
  try {
    return await API.post('/auth/logout');
  } catch(err) {
    throw err.response.data;
  }
}

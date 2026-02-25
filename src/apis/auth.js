import API from './client';

export const register = async() => {
  try {
     return await API.post('/auth/register');
  } catch(err) {
    throw err.response.data;
  }
}


export const userLogin = async() => {
  try {
    return await API.post('/auth/login');
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

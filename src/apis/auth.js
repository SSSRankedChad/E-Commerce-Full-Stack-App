import API from './client';

export const register = async(data) => {
  try {
     return await API.post('/api/auth/register', data);
  } catch(err) {
    throw err;
  }
}


export const userLogin = async(data) => {
  try {
    return await API.post('/api/auth/login', data);
  } catch(err) {
    throw err;
  }
}

export const isLoggedIn = async() => {
  try {
    return await API.get('/api/auth/session');
  } catch(err) {
    throw err;
  }
}


export const userLogout = async() => {
  try {
    return await API.post('/api/auth/logout');
  } catch(err) {
    throw err;
  }
}

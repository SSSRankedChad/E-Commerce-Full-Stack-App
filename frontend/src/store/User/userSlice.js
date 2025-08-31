import { createSlice, createAsyncThink, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');


export const loadUserById = createAsyncThunk('/users/loadUserById', async({userId}, {reject}) => {
  try {
    const response = await axios.get('/users/{userId}', {userId});
    return response.data;
  } catch(err) {
    return reject(err.response.data);
  }
});

export const registerUser = createAsyncThunk('/users/registerUser', async({firstname, lastname, email, password, username}, {reject}) => {
  try {
   const response = await axios.post('/users/register', {firstname, lastname, username, email, password});
   return response.data;
  } catch(err) {
    return reject(err.response.data);
  }
});

export const updateUser = createAsyncThunk('/users/updateUser', async({userId, userProfile}, {reject}) => {
  try {
   const resposne = await axios.put('/users/updateUser', {userId, userProfile});
   return response.data;
  } catch (err) {
    return reject(err.response.data);
  }
});

export const changePassword = createAsyncThunk('/users/changePassword', async({userId, password}, {reject}) => {
  try {
    const response = await axios.put('/users/changePassword', {userId, password});
    return response.data;
  } catch(err) {
    return reject(err.response.data);
  }
});

export const login = createAsyncThunk('/auth/login', async({username, password}, {reject}) => {
  try {
    const resposne = await axios.post('/auth/login', {username, password});
    return response.data;
  } catch(err) {
    return reject(err.response.data);
  }
});

export const logout = createAsyncThunk('/users/logout', async() => {
    const response = await axios.get('/users/logout');
    return response.data;
});

export const session = createAsyncThunk('/auth/session', async() => {
    const response = await axios.get('/auth/session');
    return response.data;
});



const initialState = {
  user: {},
  userId: null,
  loadingUser: false,
  loadingUserSuccess: false,
  loadingUserError: false,
  registeringUser: false,
  registerUserSuccess: false,
  registerUserError: false,
  updatingUser: false,
  updateUserError: false,
  updateUserSuccess: false,
  changePasswordError: false,
  changePasswordSuccess: false,
  changingPassword: false,
  loggingIn: false,
  loginError: false,
  loginSuccess: false,
  loggingOut: false,
  logoutError: false,
  logoutSuccess: false,
  sessionSuccess: false,
  sessionError: false,
  gettingSession: false,
};


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserStatusUpdates: (state) => {
      state.loadingUser = false;
      state.loadingUserError = false;
      state.registeringUser = false;
      state.registerUserError = false;
      state.updatingUser = false;
      state.updateUserError = false;
      state.changingPassword = false;
      state.changePasswordError = false;
      state.loggingIn = false;
      state.loginError = false;
      state.logginOut = false;
      state.logoutError = false;
      state.gettingSession = false;
      state.sessionError = false;
      return state;
    }
  },
    [loadUserById.pending]: (state, action) => {
      state.loadingUser = true;
      state.loadingUserError = false;
    },
    [loadUserById.fulfilled]: (state, action) => {
      state.loadingUser = false;
      state.loadingUserError = false;
      state.loadingUserSuccess = true;
      state.user = action.payload;
    },
    [loadUserById.rejected]: (state, action) => {
      state.loadingUserError = action.payload;
      state.loadingUserSuccess = false;
      state.user = {};
    },
    [registerUser.pending]: (state, action) => {
      state.registeringUser = true;
      state.registerUserError = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.registerUserSuccess = true;
      state.registerUserError = false;
      state.registeringUser = false;
      state.user = action.payload;
      state.userId = action.payload.user_id;
    },
    [registerUser.rejected]: (state, action) => {
      state.registerUserError = action.payload;
      state.registeringUser = false;
      state.user = {};
      state.userId = null;
    },
    [updateUser.pending]: (state, action) => {
      state.updatingUser = true;
      state.updatingUserError = false;
    },
    [updateUser.fulfilled]: (state,action) => {
      state.updatingUser = false;
      state.updateUserSuccess = true;
      state.updatingUserError = false;
      state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.updatingUser = false;
      state.updateUserError = action.payload;
      state.user = {};
    },
    [changePassword.pending]: (state, action) => {
      state.changingPassword = true;
      state.changePasswordError = false;
    },
    [changePassword.fulfilled]: (state,action) => {
      state.changingPassword = false;
      state.changePasswordSuccess = true;
      state.changePasswordError = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.changingPassword = false;
      state.changePasswordError = action.payload;
    },
    [login.pending]: (state, action) => {
      state.logginIn = true;
      state.loginError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loginSuccess = true;
      state.loginError = false;
      state.loggingIn = false;
      state.user = action.payload;
      state.userId = action.payload.user_id;
    },
    [login.rejected]: (state, action) => {
      state.logginIn = false;
      state.loginError = action.payload;
      state.user = {};
    },
    [logout.pending]: (state, action) => {
      state.loggingOut = true;
      state.logoutError = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.loggingOut = false;
      state.logoutError = false;
      state.logoutSuccess = true;
    },
    [logout.rejected]: (state, action) => {
      state.logginOut = false;
      state.logoutError = action.payload;
    },
    [session.pending]: (state, action) => {
      state.gettingSession = true;
      state.sessionError = false;
    },
    [session.fulfilled]: (state, action) => {
      state.sessionSucces = true;
      state.sessionError = false;
      state.gettingSession = false;
      state.user = action.payload;
      state.userId = action.payload.user_id;
    }
});
                                 export const {clearUserStatusUpdates} = userSlice.actions;
                                 export default userSlice.reducer;

                                 export const selectUser = state => state.user.user;
                                 export const selectUserId = state => state.user.userId;
                                 export const selectUserLoading = state => state.user.loadingUser;
                                 export const selectUserLoadingError = state => state.user.loadingUserError;
                                 export const selectRegisterUserError = state => state.user.registerUserError;
                                 export const selectRegisteringUser = state => state.registeringUser;
                                 export const selectRegisterUserSuccess = state => state.user.registerUserSuccess;
                                 export const selectUpdatingUser = state => state.user.updatingUser;
                                 export const selectUpdateUserError = state => state.user.updateUserError;
                                 export const selectUpdateUserSuccess = state => state.user.updateUserSuccess;
                                 export const selectChangePasswordError = state => state.user.changePasswordError;
                                 export const selectChangePasswordSuccess = state => state.user.changePasswordSuccess;
                                 export const selectLogginIn = state => state.user.loggingIn;
                                 export const selectLogginOut = state => state.user.loggingOut;
                                 export const selectLoginError = state => state.user.loginError;
                                 export const selectLoginSuccess = state => state.user.loginSuccess;
                                 export const selectLogoutError = state => state.user.logoutError;
                                 export const selectLogoutSuccess = state => state.user.logoutSuccess;
                                 export const selectSession = state => state.user.gettingSession;
                                 export const selectSessionError = state => state.user.sessionError;
                                 export const selectSessionSuccess = state => state.user.sessionSuccess;

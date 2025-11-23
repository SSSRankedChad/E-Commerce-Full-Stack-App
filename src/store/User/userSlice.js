import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, userLogin, register } from '../../apis/auth.js';
import { getUser, userUpdate } from '../../apis/user.js';


export const loadUserById = createAsyncThunk('/user/loadUserById', async(userId, thunkAPI) => {
  try {
    const response = await getUser(userId);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const registerUser = createAsyncThunk('/auth/registerUser', async(userData, thunkAPI) => {
  try {
    const response = await register(userData);
    return response.data
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateUser = createAsyncThunk('/user/updateUser', async(data, thunkAPI) => {
  try {
    const response = await userUpdate(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const changePassword = createAsyncThunk('user/changePassword', async({userId, password}, thunkAPI) => {
  try {
    const response = await axios.put('/users/changePassword', {userId, password});
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async(data, thunkAPI) => {
  try {
    const response = await userLogin(data);
    return response.data; 
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async(thunkAPI) => {
    try {
       const response = await axios.post('/auth/logout');
       return response.data;
    } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
   }
});

export const session = createAsyncThunk('auth/session', async(data, thunkAPI) => {
  try {
    const response = await isLoggedIn(data);
    return response.data;
  } catch(err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
})  

const initialState = {
  user: {},
  userId: null,
  loadingUser: false,
  loadingUserSuccess: false,
  loadingUserError: false,
  logginIn: false,
  loginSuccess: false,
  loginError: false,
  loginPending: false,
  registeringUser: false,
  registerUserSuccess: false,
  registerUserError: false,
  updatingUser: false,
  updatingUserError: false,
  updatingUserSuccess: false,
  updateUserError: false,
  updateUserSuccess: false,
  changePasswordError: false,
  changePasswordSuccess: false,
  changingPassword: false,
  logginOut: false,
  logoutSuccess: false,
  logoutError: false,
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserById.pending, (state, action) => {
       state.loadingUser = true;
       state.loadingUserError = false;
      })

      .addCase(loadUserById.fulfilled, (state, action) => {
       state.loadingUser = false;
       state.loadingUserError = false;
       state.loadingUserSuccess = true;
       state.user = action.payload;
      })

      .addCase(loadUserById.rejected, (state, action) => {
       state.loadingUserError = action.payload;
       state.loadingUserSuccess = false;
       state.user = {};
      })

      .addCase(registerUser.pending, (state, action) => {
       state.registeringUser = true;
       state.registerUserError = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
       state.registerUserSuccess = true;
       state.registerUserError = false;
       state.registeringUser = false;
       state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
       state.registeringUser = false;
       state.registerUserError = action.payload;
       state.user = {};
       state.userId = null;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.updatingUser = true;
        state.updatingUserError = false;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatingUser = false;
        state.updateUserSuccess = true;
        state.updatingUserError = false;
        state.user = action.payload;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.updatingUser = false;
        state.updateUserError = action.payload;
        state.user = {};
      })

      .addCase(changePassword.pending, (state, action) => {
        state.changingPassword = true;
        state.changePasswordError = false;
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordError = false;
        state.changePasswordSuccess = true;
        state.user = action.payload;
        state.changingPassword = false;
      })


      .addCase(changePassword.rejected, (state, action) => {
        state.changingPassword = false;
        state.changePasswordError = action.payload;
      })


      .addCase(login.fulfilled, (state, action) => {
        state.logginIn = false;
        state.loginError = false;
        state.loginSuccess = true;
        state.user = action.payload;
      })

      .addCase(login.pending, (state, action) => {
        state.logginIn = true;
        state.loginError = true;
      })

      .addCase(login.rejected, (state, action) => {
        state.logginIn = false;
        state.loginError = action.payload;
      })

      .addCase(logout.pending, (state, action) => {
        state.loggingOut = true;
        state.logoutError = false;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.logoutSuccess = action.payload;
        state.logoutError = false;
        state.user = {}
        state.userId = null;
      })

      .addCase(logout.rejected, (state, action) => {
        state.logoutError = action.payload;
        state.loggingOut = false;
      })

      .addCase(session.pending, (state, action) => {
        state.gettingSession = true;
        state.sessionError = false;
      })

      .addCase(session.fulfilled, (state, action) => {
        state.sessionSuccess = true;
        state.sessionError = false;
        state.gettingSession = false;
        state.session = action.payload;
      })

  }
});


export const {clearUserStatusUpdates} = userSlice.actions;
export default userSlice.reducer;

export const selectUser = state => state.users.user;
export const selectUserId = state => state.users.userId;
export const selectUserLoading = state => state.users.loadingUser;
export const selectUserLoadingError = state => state.users.loadingUserError;
export const selectRegisterUserError = state => state.users.registerUserError;
export const selectRegisteringUser = state => state.users.registeringUser;
export const selectRegisterUserSuccess = state => state.users.registerUserSuccess;
export const selectUpdatingUser = state => state.users.updatingUser
export const selectUpdateUserError = state => state.users.updateUserError;
export const selectUpdateUserSuccess = state => state.users.updateUserSuccess;
export const selectChangePasswordError = state => state.users.changePasswordError;
export const selectChangePasswordSuccess = state => state.users.changePasswordSuccess;
export const selectLogginIn = state => state.users.logginIn;
export const selectLogginOut = state => state.users.logginOut;
export const selectLoginError = state => state.users.loginError;
export const selectLoginSuccess = state => state.users.loginSuccess;
export const selectLogoutError = state => state.users.logoutError;
export const selectLogoutSuccess = state => state.users.logoutSuccess;
export const selectSessionSuccess = state => state.users.sessionSuccess;

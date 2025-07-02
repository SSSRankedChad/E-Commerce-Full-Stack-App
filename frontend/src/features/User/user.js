import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material';
import TextInput from '@mui/material';
import Loader from '../../components/Loader/loader.js';
import Alert from '@mui/material/Alert';
import Buttom from '@mui/material';
import { loadUserById, updateUser, changePassword, selectUser, selectUserId, selectLoadingUser, selectLoadUserError, selectRegisterUserSuccess,
        selectUpdatingUser, selectUpdateUserSuccess, selectUpdateUserError,  selectChangePasswordSuccess, selectChangePasswordError,
        selectLoginSuccess, clearUsersStatusUpdates } from '../../store/User/usersSlice.js';
import { useSelector, useDispatch } from '@reduxjs/toolkit';

export const User = () => {
    const user = useSelector(selectUser);
    const userId = useSelector(selectUserId);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [gender, setGender] = useState(user.gender);
    let [dob, setDob] = useState(user.date_of_birth);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [streetAddress, setStreetAddress] = useState(user.street_address);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zip, setZip] = useState(user.zip_code);
    const [password, setPassword] = useState('');
    const [passMatch, setPassMatch] = useState('');
    const passwordMatch = password === passMatch;
    const loadingUser = useSelector(selectLoadingUser);
    const loadUserError = useSelector(selectLoadUserError);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const updatingUser = useSelector(selectUpdatingUser);
    const updateUserSuccess = useSelector(selectUpdateUserSuccess);
    const updateUserError = useSelector(selectUpdateUserError);
    const changePasswordSuccess = useSelector(selectChangePasswordSuccess);
    const changePasswordError = useSelector(selectChangePasswordError);
    const loginSuccess = useSelector(selectLoginSuccess);
    const dispatch = useDispatch();

  const handleChange = ({target}) => {
    if(target.name === "username") {
      setUsername(target.value);
    }
    else if(target.name === "changepassword") {
        setPassword(target.value);
    }
    else if (target.name === 'gender') {
          setGender(target.value);
    }
      else if (target.name === 'phonenumber') {
          setPhone(target.value);
      }
      else if (target.name === 'city') {
          setCity(target.value);
      }
      else if (target.name === 'date_of_birth') {
          setDob(target.value);
      }
      else if (target.name === 'passwordmatch') {
          setPassMatch(target.value);
      }
      else if (target.name === 'firstname') {
          setFirstName(target.value);
      }
      else if (target.name === 'lastname') {
          setLastName(target.value);
      }
      else if (target.name === 'streetaddress') {
          setStreetAddress(target.value);
      }
      else if (target.name === 'zip') {
          setZip(target.value);
      }
  };

  const userProfile = {
    firstName,
    lastName,
    gender,
    username,
    email,
    phone,
    state,
    city,
    zip,
    streetAddress,
  };

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.id === 'updateuser-button') {
            dispatch(updateUser({userId, userProfile}));
        }
        else if (e.target.id === 'changepassword-button') {
            dispatch(changePassword({userId, password }));
        }
    };


    useEffect(() => {
        return () => dispatch(clearUsersStatusUpdates())
    }, []);

    useEffect(() => {
        dispatch(loadUserById({userId}))
    }, [])

    useEffect(() => {
        if(registerUserSuccess || loginSuccess || updateUserSuccess) {
            dispatch(loadUserById({userId}))
        }
        else if (changePasswordSuccess) {
            setPassword('');
            setPassMatch('');
        }
        else if (loadUserError || changePasswordError || updateUserError) {
            dispatch(clearUsersStatusUpdates());
        }
    }, [dispatch, loadUserError, registerUserSuccess, loginSuccess, changePasswordSuccess]);

    if(userLoading || updatingUser) {
      return (
        <Loader />
      )
    };

    return (

    )
}

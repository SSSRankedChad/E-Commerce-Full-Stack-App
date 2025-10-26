import React, { useState, useEffect } from 'react';
import AvatarCircle from '@mui/material/Avatar';
import TextInput from '@mui/material/TextField';
import Loader from '../../components/Loader/loader.js';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { loadUserById, updateUser, changePassword, selectUser, selectUserId, selectUserLoading, selectUserLoadingError, selectRegisteringUserSuccess,
        selectUpdatingUser, selectUpdateUserSuccess, selectUpdateUserError,  selectChangePasswordSuccess, selectChangePasswordError,
        selectLoginSuccess, clearUserStatusUpdates } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const User = () => {
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
      else if(target.name === "password") {
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
      else if (target.name === 'passwordmatch') {
       setPassMatch(target.value);
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
       dispatch(clearUsersStatusUpdates())
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadUserById({userId}))
    }, [dispatch])

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
        <div className="Loading__container">
         <Loader />
        </div>
      );
    };

    return (
      <section className="user__container">
      {loginSuccess && <Alert severity="error" msg={loadUserError} onClose={(() => dispatch(clearUserStatusUpdates()))}/>}
      {updateUserSuccess && <Alert severity="error" msg={updateUserError} onClose={(() => dispatch(clearUserStatusUpdates()))}/>}
      <h3 className="profile_title">{`Welcome, ${user.first_name}!`}</h3>
       <AvatarCircle />
       <TextInput name="username" value={username} onChange={handleChange}/>
       <TextInput name="firstname" value={first_name} onChange={handleChange}/>
       <TextInput name="lastname" value={last_name} onChange={handleChange}/>
       <TextInput name="gender" value={gender} onChange={handleChange}/>
       <TextInput name="streetaddress" value={street_address} onChange={handleChange}/>
       <TextInput name="city" value={city} onChange={handleChange}/>
       <TextInput name="state" value={state} onChange={handleChange}/>
       <TextInput name="zip" value={zip} onChange={handleChange}/>

       <section className="change__password__container">
        <h3 className> Change Password </h3>
        {changePasswordSuccess && <Alert severity="error" msg={changePasswordError} onClose={(() => dispatch(clearUserStatusUpdates()))}/>}
        <TextInput name="New Password" value={password} onChange={handleChange}/>
        {password && <TextInput name="password_match" value={passMatch} type="password" onChange={handleChange} placeholder="Please enter a new password"/>}
        {passMatch && <Button id="changepassword-buttton" name="Change Password" onClick={handleClick}>Submit</Button>}
       </section>
        <Button id="updateuser-button" name="Update User" onClick={handleClick}> Update Account </Button>
        <Link to='/orders'><p className="order__link"> View order history</p></Link>
      </section>
    )
}

export default User;

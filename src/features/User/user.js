import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AvatarCircle from '@mui/material/Avatar';
import TextInput from '@mui/material/TextField';
import Loader from '../../components/Loader/loader.js';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { loadUserById, updateUser, selectUser, selectUserId, selectUserLoading, selectUserLoadingError, selectRegisterUserSuccess,
        selectUpdatingUser, selectUpdateUserSuccess, selectUpdateUserError,  selectChangePasswordSuccess, selectChangePasswordError,
        selectLoginSuccess, selectSessionSuccess, clearUserStatusUpdates } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const User = () => {
    const user = useSelector(selectUser);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [gender, setGender] = useState("");
    const genderList = ["Male", "Female" ,"Non-Binary"];
    const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    let [dob, setDob] = useState(user.date_of_birth);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [streetAddress, setStreetAddress] = useState(user.street_address);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zip, setZip] = useState(user.zip_code);
    const [password, setPassword] = useState('');
    const passMatch = user.password === password;
    const userId = useSelector(selectUserId);
    const passwordMatch = password === passMatch;
    const userLoading = useSelector(selectUserLoading);
    const loadUserError = useSelector(selectUserLoadingError);
    const registerUserSuccess = useSelector(selectRegisterUserSuccess);
    const updatingUser = useSelector(selectUpdatingUser);
    const updateUserSuccess = useSelector(selectUpdateUserSuccess);
    const updateUserError = useSelector(selectUpdateUserError);
    const changePasswordSuccess = useSelector(selectChangePasswordSuccess);
    const changePasswordError = useSelector(selectChangePasswordError);
    const loginSuccess = useSelector(selectLoginSuccess);
    const session = useSelector(selectSessionSuccess);
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
      else if (target.name === 'password_match') {
       setPassMatch(target.value);
      }
      else if (target.name === "state") {
        setState(target.value);
      }
  };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(updateUser(userId));
     };

    useEffect(() => {
       dispatch(clearUserStatusUpdates())
    }, [dispatch]);

    useEffect(() => {
      if(userId) {
        dispatch(loadUserById(userId));
      }
    }, [dispatch, userId]);

    if(userLoading || updatingUser) {
      return (
       <div className="Info__loading__container">
        <Loader /> 
       </div> 
      );
    };

    return (
      <section className="user__container">
       {loginSuccess && <Alert severity="error" msg={loadUserError} onClose={(() => dispatch(clearUserStatusUpdates()))}/>}
       {updateUserSuccess && <Alert severity="error" msg={updateUserError} onClose={(() => dispatch(clearUserStatusUpdates()))}/>}
        <h3 className="profile_title">{`Welcome, ${user.username}!`}</h3>
         <AvatarCircle />
         <TextInput name="username" value={username} onChange={handleChange}/>
         <TextInput name="firstname" placeholder="Last Name" value={firstName} onChange={handleChange}/>
         <TextInput name="lastname" placeholder="First Name" value={lastName} onChange={handleChange}/>
         <select name="gender" value={gender} onChange={handleChange}>
         {genderList.map((gender, i) => <option key={`${gender}___${i}`} value={gender}>{gender}</option>)}
         </select>
         <TextInput name="streetaddress" placeholder="Street Address" value={streetAddress} onChange={handleChange}/>
         <TextInput name="city" placeholder= "City" value={city} onChange={handleChange}/>
         <select name="state" value={state} onChange={handleChange}>
         {states.map((state, i) => <option key={`${state}___${i}`} value={state}>{state}</option>)}
         </select>
         <TextInput name="zip" value={zip} onChange={handleChange}/>

       <section className="change__password__container">
         <h3 className> Change Password </h3>
         {changePasswordSuccess && <Alert severity="error" msg={changePasswordError} onClose={(() => dispatch(clearUserStatusUpdates()))}/>}
         <TextInput name="password_match" value={passMatch} type="password" onChange={handleChange} placeholder="Enter your password"/>
         {passMatch && <TextInput name="password" value={password} type="password" onChange={handleChange} placeholder="Enter new password"/>}
        </section>
         <Button id="updateuser-button" name="Update User" onClick={handleClick}> Update Account </Button>
         <Link to='/orders'><p className="order__link"> View order history</p></Link>
         <Link to='/home'><p className="home__link">Home</p></Link>
      </section>
    );

}

export default User;

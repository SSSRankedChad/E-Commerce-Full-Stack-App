import React, {useState, useEffect} from 'react';
import "./register.css";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Loader from '../../components/Loader/loader.js';
import { registerUser } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@mui/material/TextField';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleChange = ({target}) => {
    if(target.name === 'firstname') {
      setFirstname(target.value);
    }
    else if (target.name === 'lastname') {
      setLastname(target.value);
    }
    else if (target.name === 'email') {
      setEmail(target.value);
    }
    else if (target.name === 'username') {
      setUsername(target.value);
    }
    else if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({firstname, lastname, email, username, password}));
  }


  return (
   <div className="register__user__container">
     <form className="register__form" onSubmit={handleSubmit}>
      <h2 title="Register__user__title"> New User Registeration </h2>
      <Link to='/login'><p>Already registered? Login here!</p></Link>
      <p> First Name: </p><TextInput className="firstname" name="firstname" value={firstname} onChange={handleChange} placeholder="Enter first name"/>
      <p> Last Name: </p><TextInput className="lastname" name="lastname" value={lastname} onChange={handleChange} placeholder="Enter last name"/>
      <p> Email: </p><TextInput className="email" name="email" value={email} type="email" onChange={handleChange} placeholder ="Enter email"/>
      <p> Username: </p><TextInput className="username" name="username" value={username} onChange={handleChange} placeholder= "Enter username"/>
      <p> Password: </p><TextInput className="password" name="password" value={password} type="password" onChange={handleChange} placeholder= "Enter password"/>
      <Button type="submit" id="register-button" name="register-button"> Register </Button>
    </form>
   </div>
  );

}

export default Register;


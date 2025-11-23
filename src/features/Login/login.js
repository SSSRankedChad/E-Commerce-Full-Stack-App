import React, {useState, useEffect} from 'react';
import "./login.css";
import Loader from '../../components/Loader/loader.js';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@mui/material/TextField';
import { login, logout, selectLogoutSuccess, selectLogginIn, selectLogginOut, selectLoginSuccess, selectLoginError, selectSessionSuccess, clearUserStatusUpdates } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logginIn = useSelector(selectLogginIn);
  const logginOut = useSelector(selectLogginOut);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const loginSuccess = useSelector(selectLoginSuccess);
  const loginError = useSelector(selectLoginError);
  const sessionSuccess = useSelector(selectSessionSuccess);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleChange = ({target}) => {
    if(target.name === 'email') {
      setEmail(target.value);
    }
    else if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login({email, password}));
  }


  const handleLogout = (e) => {
    e.preventDefault();
    if(e.target.id === 'logout-button') {
      dispatch(logout);
    }
  }


  useEffect(() => {
    if(logoutSuccess) {
      setEmail('');
      setPassword('');
      navigate('/');
      dispatch(clearUserStatusUpdates());
    }
  }, [logoutSuccess, navigate, dispatch]);


   if(logginIn || logginOut) {
       <div className="login__loading__container"> 
          <Loader /> 
       </div>
   }

  useEffect(() => {
    dispatch((clearUserStatusUpdates()))
  }, [dispatch]);

  useEffect(() => {
    if(sessionSuccess) {
      navigate('/home')
    }
  }, [sessionSuccess, dispatch]);

  useEffect(() => {
    if(loginSuccess) {
      setEmail('');
      setPassword('');
      navigate('/');
      dispatch(clearUserStatusUpdates());
    }
  }, [loginSuccess, navigate, dispatch]);

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
       <h3 className="login__form__title"> Login </h3>
       {loginError && <Alert msg={loginError} onClose={() => dispatch(clearUserStatusUpdates())}/>}
       <Link to='/register'><p className="Login__registerLink"> New User? Please Register! </p></Link>
       <p> Enter Email: </p><TextInput name="email" value={email} onChange={handleChange}/>
       <p> Enter Password: </p><TextInput name="password" type="password" value={password} onChange={handleChange}/>
       <Button type="submit" id="login-button" name="login-button" fullWidth> Login </Button>
      </form>
      <Button id="logout-button" name="logout-button" onClick={handleLogout}>Logout</Button>
    </div>
  );

}

export default Login;

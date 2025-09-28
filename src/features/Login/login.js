import React, {useState, useEffect} from 'react';
import "./login.css";
import Loader from '../../components/Loader/loader.js';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@mui/material/TextField';
import { login, selectLogginIn, selectLoginSuccess, selectLoginError, selectSessionSuccess, clearUserStatusUpdates } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const logginIn = useSelector(selectLogginIn);
  const loginSuccess = useSelector(selectLoginSuccess);
  const loginError = useSelector(selectLoginError);
  const sessionSuccess = useSelector(selectSessionSuccess);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleChange = ({target}) => {
    if(target.name === 'username') {
      setUsername(target.value);
    }
    else if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(login({username, password}));
  }


  if(logginIn) {
      return (
       <div className="login__loader">
        <Loader />
       </div>
      );
  };

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
      setUsername('');
      setPassword('');
      navigate('/');
      dispatch(clearStatusUserUpdates());
    }
  }, [loginSuccess, navigate, dispatch]);

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
       <h3 className="login__form__title"> Login </h3>
       {loginError && <Alert msg={loginError} onClose={() => dispatch(clearStatusUserUpdates())}/>}
       <Link to='/register'><p className="Login__registerLink"> New User? Please Register! </p></Link>
       <p> Enter Username: </p><TextInput name="Username" name="username" value={username} onChange={handleChange}/>
       <p> Enter Password: </p><TextInput name="Password" name="password" type="password" value={password} onChange={handleChange}/>
       <Button type="submit" id="login-button" name="login-button" fullWidth> Login </Button>
     </form>
    </div>
  );

}

export default Login;

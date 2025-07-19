import React, {useState, useEffect} from 'react';
import Buttom, { Alert } from '@mui/material';
import Loader from '../../components/Loader/loader.js';
import Avatar from '@mui/material';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '@mui/material';
import { login, selectLogginIn, selectLoginSuccess, selectLoginError, selectSessionSuccess, clearStatusUserUpdates } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loggingIn = useSelector(selectLogginIn);
  const loginSuccess = useSelector(selectLoginSuccess);
  const loginErorr = useSelector(selectLoginError);
  const sessionSuccess = useSelector(selectSessionSuccess);
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleChange = ({target}) => {
    if(target.name === 'username') {
      setUsername(target.value);
    }
    else if (target.password === 'password') {
      setPassword('target.value');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.id === 'login-button') {
      dispatch(login({username, password}));
    }
  }


  if(logginIn) {
      return (
        <Loader />
      )
  };

  useEffect(() => {
    dispatch(clearStatusUserUpdates())
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
     <form className="login__form" method="post" action="">
      <h3 className="login__form__title"> Login </h3>
      <Avatar> H </Avatar>
      {<loginError && <Alert msg={loginError} onClose={() => dispatch(clearStatusUserUpdates())}/>}
      <TextInput name="Username" value={username} onChange={handleChange}/>
      <TextInput name="Password" value={password} onChange={handleChange}/>
      <Button name="Login" fullWidth onClick={handleClick}/>
      <Link to='/register'><p className="Login__registerLink"> New User? Please Register! </p></Link>
     </form>
   <div/>
  );

}

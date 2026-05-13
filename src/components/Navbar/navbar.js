import React, {useEffect} from 'react';
import "./navbar.css";
import {useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import AvatarCircle from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { HomeOutlined } from '@mui/icons-material';
import { selectUser, selectUserId, clearUserStatusUpdates, logout, selectLogoutSuccess } from '../../store/User/userSlice.js';
import Button from '@mui/material/Button';

const Navbar = () => {

  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    await dispatch(logout());
    navigate('/');
  }

  useEffect(() => {
    if(logoutSuccess) {
      dispatch(clearUserStatusUpdates());
    }
  }, [dispatch, logoutSuccess]);




  if(!userId) {
   return (
    <div className='navbar'>
      <div className="userButton">
        <Link to="/login">
         <AvatarCircle size="medium"/>
        </Link>
      </div>
      <div className="productButton">
        <IconButton>
         <Link to="/products">
          <ShoppingBagIcon size="medium"/>
         </Link>
        </IconButton>
      </div>
    </div>
   )
  }

  else {
   return (
    <div className='navbar'>
      <div className="userButton">
       <Link to={`/user`} alt="Login">
        <AvatarCircle size="medium" alt="User"/>
       </Link>
      </div>
     <div className="productButton">
        <IconButton>
         <Link to="/products">
          <ShoppingBagIcon size="medium" alt="Products"/>
         </Link>
        </IconButton>
       </div>
       <div className='cartButton'>
        <IconButton>
         <Link to="/cart">
          <ShoppingCartIcon size="medium" alt="Cart"/>
         </Link>
        </IconButton>
       </div>
      <div className='orderButton'>
          <IconButton>
           <Link to="/orders">
            <HistoryIcon size="medium" alt="Order History"/>
           </Link>
          </IconButton>
      </div>
      <div className="logout-button">
        <IconButton onClick={handleClick}>
         <Link to="/">
          <LogoutIcon size="medium" alt="Logout" />
         </Link>
        </IconButton>
       </div>
     </div>
    )
   }
 }

export default Navbar;

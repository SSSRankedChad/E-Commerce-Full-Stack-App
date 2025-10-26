import React, {useEffect} from 'react';
import "./navbar.css";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import AvatarCircle from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import { HomeOutlined } from '@mui/icons-material';
import { logout, clearUserStatusUpdates } from '../../store/User/userSlice.js';

const Navbar = () => {

  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logout());
  }


  useEffect(() => {
    if(handleSubmit) {
      dispatch(clearUserStatusUpdates());
    }
  }, [dispatch]);

  return (

    <div className='navbar'>
      <div className="userButton">
       <Link to="/login" alt="Go to account">
        <AvatarCircle />
       </Link>
      </div>
      <div className="homeButton">
       <IconButton>
        <Link to="/home">
         <HomeOutlined />
        </Link>
       </IconButton>
      </div>
      <div className="productButton">
        <IconButton>
         <Link to="/products">
          <ShoppingBagIcon />
         </Link>
        </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
        <Link to="/cart">
         <ShoppingCartIcon />
        </Link>
        </IconButton>
      </div>
      <div className='orderButton'>
          <IconButton>
           <Link to="/orders">
            <HistoryIcon />
           </Link>
          </IconButton>
      </div>
      <div className="logoutButton">
       <Button className="logout-button" name="logout-button" onClick={handleSubmit}>Log Out</Button>
      </div> 
     </div>
  )
}

export default Navbar;

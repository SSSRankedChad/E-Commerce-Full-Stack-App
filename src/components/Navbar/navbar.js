import React, {useState, useEffect} from 'react';
import "./navbar.css";
import { selectSearchTerm, clearSearchTerm, setSearchTerm } from '../../store/SearchTerm/searchTerm.js';
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

const Navbar = () => {

  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleChange = ({target}) => {
    dispatch(setSearchTerm(target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearSearchTerm());
  }

  return (

    <div className='navbar'>
      <div className="userButton">
       <Link to="/login" alt="Go to account">
        <AvatarCircle />
       </Link>
      </div>
      <div className="homeButton">
       <IconButton>
        <Link to="/home" alt="Go to homepage">
         <HomeOutlined />
        </Link>
       </IconButton>
      </div>
      <div className="productButton">
        <IconButton>
         <Link to="/products" alt="View products">
          <ShoppingBagIcon />
         </Link>
        </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
        <Link to="/cart" alt="View cart">
         <ShoppingCartIcon />
        </Link>
        </IconButton>
      </div>
      <div className='orderButton'>
          <IconButton>
           <Link to="/orders" alt="View past orders">
            <HistoryIcon />
           </Link>
          </IconButton>
      </div>
     <form className="searchBar" onSubmit={handleSubmit}>
      <TextField className="searchBar"
        value={searchTerm}
        onChange={handleChange}
        size="small"
        placeholder="Searching..."/>
      <IconButton type="submit" id="submit-button">
	   <SearchIcon />
      </IconButton> 
      </form>
     </div>
  )
}

export default Navbar;

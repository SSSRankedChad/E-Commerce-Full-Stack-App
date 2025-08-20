import React, {useState, useEffect} from 'react';
import "./navbar.css";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import AvatarCircle from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { selectSearchTerm, selectFilteredProducts } from '../../store/Product/productSlice.js';
import { HomeOutlined } from '@mui/icons-material';

const Navbar = () => {

  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleChange = ({target}) => {
    setSearchTermLocal(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTermLocal === searchTerm) {
      dispatch(selectFilteredProducts());
    }
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
      <TextField className="searchBar"
        value={searchTermLocal}
        onChange={handleChange}
        onSubmit={handleSubmit}
        size="small"
        placeholder="Search"/>
     </div>
  )
}

export default Navbar;

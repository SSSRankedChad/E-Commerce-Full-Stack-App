import React, {useState, useEffect} from 'react';
import "./navbar.css";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AvatarCircle from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Inventory2Icon from '@mui/icons-material/Inventory2';
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
        <AvatarCircle alt="Go to account"/>
      </div>
      <div className="homeButton">
       <IconButton>
         <HomeOutlined alt="Back to home"/>
       </IconButton>
      </div>
      <div className="productButton">
        <IconButton>
          <Inventory2Icon aria-label="product" alt="View products"/>
        </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
         <ShoppingCartIcon aria-label='cart' alt="View current cart"/>
        </IconButton>
      </div>
      <div className='orderButton'>
          <IconButton>
            <ReceiptIcon aria-label='orders' alt="View past orders" />
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

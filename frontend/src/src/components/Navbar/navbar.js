import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AvatarCircle from '@mui/material/Avatar';
import TextInput from '@mui/material/TextField';
import Inventory2 from '@mui/icons-material/Inventory2';
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
    if(searchTermLocal === searchTerm) {
      dispatch(selectFilteredProducts());
    }
  }

  return (

    <div className='navbar'>
      <div className='orderButton'>
          <IconButton>
            <ReceiptIcon aria-label='orders' />
          </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
         <ShoppingCartIcon aria-label='cart'/>
        </IconButton>
      </div>
      <div className="productButton">
        <IconButton>
          <Inventory2Icon aria-label="product" />
        </IconButton>
      </div>
      <div className="userButton">
        <AvatarCircle />
      </div>
      <div className="homeButton">
       <IconButton>
         <HomeOutlined />
       </IconButton>
      </div>
       <TextInput className="searchBar"
        onChange={handleChange}
        onSubmit={handleSubmit}
        fullWidth/>
     </div>
  )
}

export default Navbar;

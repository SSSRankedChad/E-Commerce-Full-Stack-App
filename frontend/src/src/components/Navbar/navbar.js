import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Avatar from '@mui/material/Avatar';
import TextInput from '@mui/material/TextField';
import { selectSearchTerm, selectFilteredProducts } from '../../store/Product/productSlice.js';

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

    <div className='header'>
      <div className='avatar'>
        <Avatar> H </Avatar>
      </div>
      <div className='searchBar'>
      <TextInput
        value= {searchTerm}
        onChange={onHandleChange}
        onSubmit={handleSubmit}
        />
      </div>
      <div className='orderButton'>
       <IconButton>
         <ReceiptIcon aria-label='orders' />
         <ReceiptIcon aria-label='orders' />
       </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
         <ShoppingCartIcon aria-label='cart'/>
        </IconButton>
      </div>
     </div>
  )
}

export default Navbar;

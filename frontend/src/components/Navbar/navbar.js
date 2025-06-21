import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Avatar from '@mui/material/Avatar';
import SearchBar from '../SearchBar/SearchBar.js';


export const Navbar = () => {

  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector((state) => state.product.searchTerm);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    searchTermLocal(e.target.value);
  }


  useEffect(() => {
    setSearchTermLocal(searchTerm)
  }, [searchTerm]);

  const onHandleChange = (e) => {
    e.preventDefault();
    dispatch(setSearchTermLocal(searchTerm));
  }

  return (

    <div className='header'>
      <div className='avatar'>
        <Avatar> H </Avatar>
<<<<<<< HEAD
      </div> 
=======
      </div>
>>>>>>> a7e3c02 (Up to date to last month and restructured project)
      <div className='searchBar'>
      <SearchBar
        value= {searchTerm}
        onChange={onHandleChange}
        onRequestSearch={handleSubmit}
        />
      </div>
      <div className='orderButton'>
       <IconButton>
<<<<<<< HEAD
         <ReceiptIcon aria-label='orders' /> 
=======
         <ReceiptIcon aria-label='orders' />
>>>>>>> a7e3c02 (Up to date to last month and restructured project)
       </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
<<<<<<< HEAD
         <ShoppingCartIcon aria-label='cart' /> 
        </IconButton>
      </div> 
=======
         <ShoppingCartIcon aria-label='cart' />
        </IconButton>
      </div>
>>>>>>> a7e3c02 (Up to date to last month and restructured project)
     </div>
  )
}

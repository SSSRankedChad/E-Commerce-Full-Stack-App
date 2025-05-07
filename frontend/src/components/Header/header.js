import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Avatar from '@mui/material/Avatar';
import SearchBar from 'material-ui-search-bar';


export const Header = () => {

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
      </div> 
      <div className='searchBar'>
      <SearchBar
        value= {searchTerm}
        onChange={onHandleChange}
        onRequestSearch={handleSubmit}
        />
      </div>
      <div className='orderButton'>
       <IconButton>
         <ReceiptIcon aria-label='orders' /> 
       </IconButton>
      </div>
      <div className='cartButton'>
        <IconButton>
         <ShoppingCartIcon aria-label='cart' /> 
        </IconButton>
      </div> 
     </div>
  )
}

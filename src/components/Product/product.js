import React , { useState, useEffect } from 'react';
import "./product.css";
import Loader from '../../components/Loader/loader.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { selectUserId } from '../../store/User/userSlice.js';
import { loadCart, updateCart, addCartItem, deleteCartItem } from '../../store/Cart/cartSlice.js';
import AddCircle  from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';


const Product = ({product, page }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartItemId = cartItem?.cartItemId;
  const [cartQuantity, setCartQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const deleteFromCart = () => {
   setCartQuantity(prev => {
    if(!prev) return;
    else if (prev) return prev - 1;

   })
  }

  const handleAddClick = () => {
    setCartQuantity(prev => prev + 1);
  }

  const handleCartClick = () => {
    dispatch(addCartItem({product, quantity: cartQuantity}));
  }


  useEffect(() => {
    if(quantity !== cartQuantity) {
      dispatch(updateCart({cartItemId, quantity: cartQuantity}));
      setQuantity(cartQuantity);
    }
  }, [dispatch, cartItemId, quantity, cartQuantity]);

  if(!product) {
    return (
      <div className="empty__product__container">
       <h1 className="empty__product__header"> Under Construction </h1>
       <p className="empty__product__message"> Redirecting..... </p>
       {setTimeout(() => {
         navigate("/")
        }, 3000)}
       <Loader /> 
      </div>
    );
  }

 if(page == 'cart') {
	return (
	   <div className="Product__cart__container">
	      <div className="Product__image__container">
	        <img style= {{maxWidth: "100%", maxHeight: "100%"}} src={product.url} alt=""/>
	       </div>
	       <div className="Product__cart__name__container">
	         <p className="Product__cart__label">Name: </p>
		     <Link to={`products/${product.id}`}>
		      <h2 className="product__cart__name" id={product.id}>{product.name}</h2>
	       </Link>
	       </div>
	       <div className="Product__cart__price">
		    <p className="Product__price__label"> Price: </p>
		    <p className="Product__price__value">{product.price} </p>
	       </div>
	       <div className="Product__category__container">
	 	    <p className="Product__category__label"> Category: </p>
		    <p className="Product__category__value"> {product.category} </p>
	       </div>
	       <div className="Product__quantity__container">
		    <p className="Product__cart__label"> Quantity: </p>
	        <IconButton onClick={handleAddClick}><AddCircle /></IconButton>
		     <input className="Product__cart__quantity" type="number" id="quantity" min="0" max="100" value={cartQuantity} readOnly/>
	        <IconButton onClick={deleteFromCart}><RemoveCircle /></IconButton>
	       </div>
	    </div>
	  );
   }

  if(page == 'details') {
	return (
	  <div className="Product__details__container">
	    <div className="Product__details__category">
	     <p className="Product__details__category__label"> Category: </p>
	     <p className="Product__details__category__value"> {product.category} </p>
	    </div>
	    <div className="Product__details__name">
	      <p className="Product__details__name__label"> Name: </p> 
	      <p className="Product__details__name__value"> {product.name} </p>
	    </div> 
	    <div className="Product__details__price">
	       <p className="Product__details__price__label"> Price: </p>
	       <p className="Product__details__price__value"> {product.price} </p>
	    </div>
	    <div className="Product__details__description">
	       <p className="Product__details__description__label"> Description: </p>
	       <p className="Product__details__description__value"> {product.description} </p>
	   </div>
     </div>
	);
  }

  else {

	return (
	   <div className="Product__default__container">
	    <div className="Product__default__image">
	      <img style={{maxWidth: "100%", maxHeight: "100%"}} src={product.url} /> 
	    </div>
	     <div className="Product__default__name__container">
	       <p className="Product__default__name__label">Name: </p>
		     <Link to={`products/${product.id}`}>
		      <h2 className="product__cart__name" id={product.id}>{product.name}</h2>
	       </Link>
	     </div>
	    <div className="Product__default__description">
	      <p className="Product__default__description__label"> Description: </p>
	      <p className="Product__default__description__value"> {product.description} </p>
        <p className="Product__default__price__label"> Price: </p>
        <p className="Product__default__price__value">{product.price}</p>
	    </div>
	    <div className="Product__default__button">
		   <IconButton className="Product__default__add" onClick={handleAddClick}><AddCircle /></IconButton>
       <IconButton className="Product__default__remove" onClick={deleteFromCart}><RemoveCircle /></IconButton>
       <Button className="Product__default__cart__button" onClick={handleCartClick}> Add to Cart </Button> 
       <input className="Product__cart__quantity" type="number" id="quantity" min="0" max="100" value={cartQuantity} readOnly/>
	    </div>
     </div>
	  );
   }
}
	    

export default Product;

import React , { useState, useEffect } from 'react';
import "./product.css";
import Loader from '../../components/Loader/loader.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { setProductId, selectProducts, selectFilteredProducts, selectProduct } from '../../store/Product/productSlice.js';
import { selectUserId } from '../../store/User/userSlice';
import { selectCartId, loadCart, updateCart } from '../../store/Cart/cartSlice';
import { AddCircle } from '@mui/icons-material';
import { RemoveCircle } from '@mui/icons-material';


const Product = ({product, page}) => {
  const products = useSelector(selectProducts);
  const [cartQuantity, setCartQuantity] = useState(product?.cart_quantity);
  const [quantity, setQuantity] = useState(product?.cart_quantity);
  const cartId = useSelector(selectCartId);
  const userId = useSelector(selectUserId);
  const productId = product?.product_id;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleProductClick = () => {
    dispatch(setProductId(productId));
  };

  const handleAddClick = () => {
    dispatch(setCartQuantity(prev => prev + 1));
  }

  const handleRemoveClick = () => {
    setCartQuantity(prev => {
      if(!prev) return;
      else return prev - 1
      });
  }

  const handleCartClick = () => {
    if(!userId) {
      navigate('/login', { replace: true});
    }
    else if (cartQuantity) {
      setCartQuantity(prev => prev + 1);
    }
    else {
      setCartQuantity(1)
    }
  }


  useEffect(() => {
  if(quantity !== cartQuantity) {
    dispatch(updateCart({ cartId, userId, cartQuantity, productId}));
    dispatch(loadCart( { cartId, userId } ));
    setQuantity(cartQuantity);
    }
  }, [cartId, userId, productId, cartQuantity, quantity, dispatch]);

  if(!product) {
    return (
      <div className="empty__product__container">
       <h1 className="empty__product__header"> Under Construction </h1>
       <p className="empty__product__message"> Redirecting..... </p>
       <Loader /> 
       {setTimeout(() => {
         navigate("/")
        }, 3000)}
      </div>
    );
  }

 if(page == 'cart') {
	return (
	   <div className="Product__cart__container">
	      <div className="Product__image__container">
	        <img src={product.url} alt=""/>
	       </div>
	       <div className="Product__cart__name__container">
	         <p className="Product__cart__label">Name: </p>
		     <Link to={`product/{productId}`}>
		      <h2 className="product__cart__name" id={products.productId} onClick={handleProductClick}>{product.name}</h2>
	         </Link>
	       </div>
	       <div className="Product__cart__price">
		    <p className="Product__price__label"> Price: </p>
		    <p className="Product__price__value">{product.sell_price} </p>
	       </div>
	       <div className="Product__category__container">
	 	    <p className="Product__category__label"> Category: </p>
		    <p className="Product__category__value"> {product.category} </p>
	       </div>
	       <div className="Product__quantity__container">
		    <p className="Product__cart__label"> Quantity: </p>
	        <IconButton onClick={handleAddClick}><AddCircle /></IconButton>
		     <input className="Product__cart__quantity" type="number" id="quantity" min="0" max="100" value={cartQuantity} readOnly/>
	        <IconButton onClick={handleRemoveClick}><RemoveCircle /></IconButton>
	       </div>
	       <div className="Product__button__container">
		    <Button id="cart-button" className="Product__cart__button" onClick={handleCartClick}></Button>
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
	       <p className="Product__details__price__value"> {product.sell_price} </p>
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
	      <img src={product.url} /> 
	    </div>
	     <div className="Product__default__name__container">
	       <p className="Product__default__name__label">Name: </p>
		   <Link to={`product/{productId}`}>
		     <h2 className="product__cart__name" id={`products.productId`} onClick={handleProductClick}>{product.name}</h2>
	       </Link>
	     </div>
	    <div className="Product__default__description">
	      <p className="Product__default__description__label"> Description: </p>
	      <p className="Product__default__description__value"> {product.description} </p>
	    </div>
	    <div className="Product__default__button">
		<IconButton className="Product__default__add" onClick={handleAddClick}><AddCircle /></IconButton>
	     <Button className="Product__default__cart" onClick={handleCartClick}></Button>
	    </div>
      </div>
	  );
   }
}
	    

export default Product;

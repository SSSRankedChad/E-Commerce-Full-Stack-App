import React , { useState, useEffect } from 'react';
import "./product.css";
import Loader from '../Loader/loader.js';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { setProductId, selectProducts, selectFilteredProducts, selectProduct } from '../../store/Product/productSlice.js';
import { selectUserId } from '../../store/User/userSlice';
import { selectCartId, loadCart, updateCart } from '../../store/Cart/cartSlice';
import { AddCircle } from '@mui/icons-material';
import { RemoveCircle } from '@mui/icons-material';


const Product = () => {

  const [cartQuantity, setCartQuantity] = useState(product?.cart_quantity);
  const [quantity, setQuantity] = useState(product?.cart_quantity);
  const products = useSelector(selectProducts);
  const cartId = useSelector(selectCartId);
  const userId = useSelector(selectUserId);
  const product = product?.product_id;
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
       <Loader />
       <h1 className="empty__product__header"> Under Construction </h1>
       <p className="empty__product__message"> Redirecting..... </p>
       {setTimeout(() => {
         navigate("/")
        }, 3000)}
      </div>
    );
  }


  return (
    <div className="Product__container">
      <div className="Product__name__container">
       <h2 className="Product__name__header">{product.name}</h3>
      </div>
      <div className="Product__category__container">
       <h3 className="Product__category__label"> Category: </h3>
       <p className="Product__category__header"> {product.category} </p>
      <div className="Product__image__container">
       <img src={product.url}/>
      </div>
      <div className="Product__price__container">
       <h3 className="Product__price__label"> Price: </h3>
       <p className="Product__details__price"> {product.sell_price} </p>
      </div>
      <div className="Product__description__container">
       <h3 className="Product__category__label"> Description: </h3>
       <p className="Product__details__description">{product.description} </p>
      </div>
     <div className="Product__button_container">
       <Button name="Add item" onClick={handleAddClick}></Button>
       <Button name="Remove item" onClick={handleRemoveClick}></Button>
       <Button name="Add to cart" onClick={handleCartClick}></Button>
      </div>
    </div>
  );
}

export default Product;

import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import  IconButton  from '@mui/material/IconButton';
import  Button  from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { selectCartId, selectCart, selectloadCart, selectCheckoutSuccess, selectLoadCartError, selectCheckoutPending,
         clearCartStatusUpdates, selectCheckoutError} from '../../store/Cart/cartSlice.js';
import { selectUserId, selectUser } from '../../store/User/userSlice.js';
import Loader from '../../components/Loader/loader.js';
import Product from '../../features/Product/product.js';



export const Cart = () => {
  const cart = useSelector(selectCart);
  const cartId = useSelector(selectCartId);
  const cartLoading = useSelector(selectLoadCart);
  const loadCartError = useSelector(selectLoadCartError);
  const checkoutPending = useSelector(selectCheckingPending);
  const checkout = useSelector(checkout);
  const checkoutError = useSelector(selectCheckoutError);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [shipToName, setShipToName] = useState(user.first_name + '' + user.last_name);
  const [email, setEmail] = useState(user.email);
  const [shipToCity, setShipToCity] = useState(user.city);
  const [shipToState, setShipToState] = useState(user.state);
  const [shipToStreet, setShipToStreet] = useState(user.street);
  const [shipToZip, setShipToZip] = useState(user.zip);
  const [payMethod, setPayMethod] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [inCheckout, setInCheckout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const address = {
    shipToName,
    shipToStreet,
    shipToCity,
    shipToState,
    shipToZip,
    email
  };


  useEffect(() => {
    if(checkingOut || cartLoading ) {
      return (
        <Loader />
      );
    }
  });

  const handleChange = ({target}) => {
    if(target.name === 'fullname') {
      setShipToName(target.value);
    }
    else if(target.street === 'streetaddress') {
      setShipToStreet(target.value);
    }
    else if(target.state === 'state') {
      setShipToState(target.value);
    }
    else if(target.zip === 'zipcode') {
      setShipToZip(target.value);
    }
    else if(target.city === 'city') {
      setShipToCity(target.value);
    }
  };

  const handleSubmit = async() => {
    if(!stripe || !elements) {
      return;
    }

    const {error, paymentMethod } = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElements(CardNumberElement),
      billing_details: {
        name: shipToName,
        email
      }
    })

    if(!error) {
      const { stripeId } = paymentMethod;
      const amount = (cart.subtotal * 0.0725 + 5.99).toFixed(2);
      const paymentInfo = {
        cardNum,
        payMethod,
        stripeId,
        amount
      };

      dispatch(checkout( {cardId, userId, address, paymentInfo} ));
    }
  };


  if (inCheckout) {
    return (
      <Button name="Submit Order" size="large" disabled={!stripe} onClick={handleClick} />
    )
  } else  {
    return (
       <Link to="/cart/checkout"><Button name="Go to checkout" size="large" onClick={() => setInCheckout(true)}/></Link>
    )
  }


  useEffect(() => {
    dispatch(clearCartStatusUpdates)
  }, [dispatch]);

  useEffect(() => {
    if(!userId){
      navigate('/login');
    }
    else {
      dispatch(setCartId(user.cart_id));
      disaptch(loadCart({cartId, userId}));
    }

    if(location.pathname !== 'cart/checkout') {
      setInCheckout(false);
    }
  }, [userId, cartId, user, location, navigate, dispatch]);

  useEffect(() => {
    if(checkoutSuccess) {
      setShipToCity('');
      setShipToName('');
      setShipToState('');
      setShipToZip('');
      setCardNum('');
      setPayMethod('');
      setEmail('');
      dispatch(loadCart({cartId, userID}));
      setTimeout(() => {
        navigate('/orders');
        dispatch(clearCartStatusUpdates());
      }, 2500);
    }
  }, [checkoutSuccess, cartId, userId, dispatch, navigate]);


  if(checkoutSuccess) {
    return (
      <div className="cart__order__container">
       <p className="cartSuccess"> Your order has been placed! </p>
      </div>
    )
  }

 return (
      <section className="Cart">
            {inCheckout && <form className="Cart__form" method="post" action="">
                <div className="Cart__address">
                    <h2 className="Cart__address__heading">Ship To Address</h2>
                    <TextInput name="Full Name" value={shipToName} onChange={handleChange}/>
                    <TextInput name="Street Address" value={shipToStreet} onChange={handleChange}/>
                    <TextInput name="City" value={shipToCity} onChange={handleChange}/>
                    <TextInput name="State" value={shipToState} onChange={handleChange}/>
                    <TextInput name="Zip Code" value={shipToZip} onChange={handleChange}/>
                    <TextInput name="Email" value={email} type="email" onChange={handleChange}/>
                </div>
                <div className="Cart__payment">
                    <h2 className="Cart__payment__heading">Payment Information</h2>
                    <CardNumberElement className="Cart__input" id="cardNumStripe" name="cardNumStripe" required/>
                    <TextInput name="Verify Card Number" value={cardNum} placeholder="Re-enter your card number" onChange={handleChange}/>
                    <TextInput name="Card Type" value={payMethod}/>
                    <CardExpiryElement className="Cart__input" id="cardExp" name="cardExp" required/>
                    <CardCvcElement className="Cart__input" id="cardCVC" name="cardCVC" required/>
                </div>
                {checkoutError && <Alert severity='error' msg={checkoutError} onClose={() => dispatch(clearCartStatusUpdates())}/>}
            </form>}
            {cart.items ? <section className="Cart__items">
                <h2 className="Cart__items__heading">Items in Cart</h2>
                {loadCartError && <Alert severity='error' msg={loadCartError} onClose={() => dispatch(clearCartStatusUpdates())}/>}
                {cart.items.map((cartItem, i) => <Product product={cartItem} display='inCart' key={cart.items[i].product_id}/>)}
                <div className="Cart__info">
                    {inCheckout ?
                    <div className="Cart__info__details">
                        <div className="Cart__info__pay__details">
                            <p className="Cart__shipping">Shipping: $9.99</p>
                            <p className="Cart__tax">{`Tax: $${(cart.subtotal * 0.0825).toFixed(2)}`}</p>
                            <p className="Cart__subtotal">{`Subtotal: $${cart.subtotal.toFixed(2)}`}</p>
                        </div>
                        <p className="Cart__total">{`Total: $${(cart.subtotal + (cart.subtotal * 0.0825) + 9.99).toFixed(2)}`}</p>
                    </div> :
                    <p className="Cart__subtotal">{`Subtotal: $${cart.subtotal.toFixed(2)}`}</p>}
                    {button}
                </div>
             </section> :
            <section className="Cart__items">
                <h2 className="Cart__items__heading">Items in Cart</h2>
                Your cart is empty.
            </section>}
      </section>
    );
  }

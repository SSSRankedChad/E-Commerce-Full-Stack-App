import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextInput from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, loadStripe, Elements  } from '@stripe/react-stripe-js';
import { fetchCart, checkout, loadItems } from '../../store/Cart/cartSlice.js';
import { selectUserId, selectUser } from '../../store/User/userSlice.js';
import { selectProduct } from '../../store/Product/productSlice.js';
import Loader from '../../components/Loader/loader.js';
import Product from '../../components/Product/product.js';



const Cart = () => {

  const { cartItems } = useSelector(state => state.cart);
  const { cart } = useSelector(state => state.cart);
  const cartId = cart.id;
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId) || user.id;
  const product = useSelector(selectProduct);
  const [shipToName, setShipToName] = useState(user.firstname + '' + user.lastname);
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

  const handleChange = ({target}) => {
    if(target.name === 'fullname') {
      setShipToName(target.value);
    }
    else if(target.name === 'streetaddress') {
      setShipToStreet(target.value);
    }
    else if(target.name === 'state') {
      setShipToState(target.value);
    }
    else if(target.name === 'zipcode') {
      setShipToZip(target.value);
    }
    else if(target.name === 'city') {
      setShipToCity(target.value);
    }
  };



  
   const total = cartItems.reduce((sum, item) => {
      return sum += (item.price * item.qty); 
    }, 0);

  const handleSubmit = async() => {
    if(!stripe || !elements) {
      return;
    }

    const {error, paymentMethod } = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: shipToName,
        email
      }
    })

    if(!error) {
      const { stripeId } = paymentMethod;
      const amount = (total * 0.0725 + 5.99).toFixed(2);
      const paymentInfo = {
        cardNum,
        payMethod,
        stripeId,
        amount
      };

      dispatch(checkout({ cartId, userId, address, paymentInfo} ));
    }
  };

  useEffect(() => {
    if(userId) {
      dispatch(fetchCart(userId));
      dispatch(loadItems());

    }
  }, [dispatch]);

  
  if(inCheckout) {
    return (
      <div className="cart__order__container">
       <p className="cartSuccess"> Your order has been placed! </p>
      </div>
    )
  }

  if(!cartItems || !userId) {
    return (
      <section className="cart__items">
        <h2 className="cart__items__label"> Items in Cart </h2>
        Your cart is empty.
      </section>
    )
  }




 return (
      <section className="Cart">
            <form className="Cart__form" method="post" action="">
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
            
            <section className="Cart__items">
                <h2 className="Cart__items__heading">Items in Cart</h2>
                {cartItems.map((cartItem, i) => <Product product={cartItem} page='cart' key={cartItems[i].productId}/>)}
                <div className="Cart__info">
                    <div className="Cart__info__details">
                        <div className="Cart__info__pay__details">
                            <p className="Cart__shipping">Shipping: $9.99</p>
                            <p className="Cart__tax">{`Tax: $${(total * 0.0825).toFixed(2)}`}</p>
                        </div>
                        <p className="Cart__total">{`Total: $${(total * 0.0825 + 9.99).toFixed(2)}`}</p>
                    </div> 
                    <Button className="checkout-button" id="checkout" onClick={handleSubmit}> Submit Order </Button>
                </div>
             </section>
          </form>
    </section>
  );
}

export default Cart;

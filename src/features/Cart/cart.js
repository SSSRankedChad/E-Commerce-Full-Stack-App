import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextInput from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardNumberElement , CardExpiryElement, CardCvcElement, loadStripe, Elements  } from '@stripe/react-stripe-js';
import { fetchCart, checkout, loadItems, selectCheckoutSuccess } from '../../store/Cart/cartSlice.js';
import { makeOrder } from '../../store/Orders/orderSlice.js';
import { selectUserId, selectUser } from '../../store/User/userSlice.js';
import { selectProduct } from '../../store/Product/productSlice.js';
import Loader from '../../components/Loader/loader.js';
import Product from '../../components/Product/product.js';



const Cart = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useSelector(state => state.cart);
  const { cart } = useSelector(state => state.cart);
  const cartId = cart.id;
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId) || user.id;
  const checkoutSuccess = useSelector(selectCheckoutSuccess);
  const product = useSelector(selectProduct);
  const [shipToName, setShipToName] = useState(user.firstname + '' + user.lastname);
  const [email, setEmail] = useState(user.email);
  const [shipToCity, setShipToCity] = useState(user.city);
  const [shipToState, setShipToState] = useState(user.state);
  const [shipToStreet, setShipToStreet] = useState(user.street);
  const [shipToZip, setShipToZip] = useState(user.zip);
  const [payMethod, setPayMethod] = useState('');
  const [inCheckout, setInCheckout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();




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
    else if (target.name === "card-input") {
      setCardNum(target.value);
    }
    else if(target.name === 'card-type') {
      setPayMethod(target.value);
    }
  };



  
   const calculateTotal = cartItems.reduce((sum, item) => {
      return sum += (item.price * item.qty); 
    }, 0);


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }


    try {
      const cardElement = elements.getElement(CardNumberElement);

      const { token } = await stripe.createToken(cardElement);

      dispatch(checkout({cartId, userId, paymentInfo: token}));

    } catch(err) {
      throw err;
    }
  }

  useEffect(() => {
    if(userId) {
      dispatch(fetchCart(userId));
      dispatch(loadItems());

    }
  }, [dispatch]);

  useEffect(() => {
    if(checkoutSuccess) {
      navigate("/");
    }
  }, [navigate]);

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
            <form className="Cart__form" onSubmit={handleSubmit}>
                <div className="Cart__address">
                    <h2 className="Cart__address__heading">Ship To Address</h2>
                    <TextInput name="Full Name" place="Enter name" value={shipToName} onChange={handleChange}/>
                    <TextInput name="Street Address" placeholder="Enter Street Address" value={shipToStreet} onChange={handleChange}/>
                    <TextInput name="City" placeholder="Enter City" value={shipToCity} onChange={handleChange}/>
                    <TextInput name="State" placeholder="Enter State" value={shipToState} onChange={handleChange}/>
                    <TextInput name="Zip Code" placeholder="Enter Zip Code" value={shipToZip} onChange={handleChange}/>
                    <TextInput name="Email" placeholder="Enter email" value={email} type="email" onChange={handleChange}/>
                </div>
                <div className="Cart__payment">
                    <h2 className="Cart__payment__heading">Payment Information</h2>
                    <CardNumberElement className="Cart__input" id="cardNumStripe" name="cardNumStripe" required/>
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
                            <p className="Cart__tax">{`Tax: $${(calculateTotal * 0.0825).toFixed(2)}`}</p>
                        </div>
                        <p className="Cart__total">{`Total: $${(calculateTotal * 0.0825 + 9.99).toFixed(2)}`}</p>
                    </div> 
                    <Button className="checkout-button" type="submit" id="checkout"> Submit Order </Button>
                </div>
             </section>
          </form>
    </section>
  );
}

export default Cart;

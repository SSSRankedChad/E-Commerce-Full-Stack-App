import React from 'react';
import Cart from '../../features/Cart/cart.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const PUBLIC_KEY = "pk_test_51QpyhaPOpAye6nyzpjWArLlaDq3lZhEFoKNOUFumsjBW1e5gwYCk6pLnEWpfvCEVZJ7dvL8wSJii7v1XwnyhB6U900WKmey0Zw";


const StripeContainer = () => {
  const stripePromise = loadStripe(PUBLIC_KEY);

  return (
    <div className="Cart__stripe__container">
     <Elements stripe={stripePromise}>
       <Cart />
     </Elements>
    </div>
  );

}

export default StripeContainer;

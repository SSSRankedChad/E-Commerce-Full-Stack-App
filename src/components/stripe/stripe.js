import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Cart } from '../../features/Cart/cart.js';

const PUBLIC_KEY = 'pk_test_51QpyhaPOpAye6nyzpjWArLlaDq3lZhEFoKNOUFumsjBW1e5gwYCk6pLnEWpfvCEVZJ7dvL8wSJii7v1XwnyhB6U900WKmey0Zw';

const stripe = await loadStripe(PUBLIC_KEY);


const stripeContainer = () => {
  <Elements stripe ={stripe}>
    <Cart />
  </Elements>
};

export default stripeContainer;

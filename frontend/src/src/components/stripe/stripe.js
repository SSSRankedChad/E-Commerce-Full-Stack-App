import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/react-stripe-js';
import { Cart } from '../../features/Cart/cart.js';

const PUBLIC_KEY = pk_test_51QpyhaPOpAye6nyzpjWArLlaDq3lZhEFoKNOUFumsjBW1e5gwYCk6pLnEWpfvCEVZJ7dvL8wSJii7v1XwnyhB6U900WKmey0Zw;

const stripe = loadStripe(PUBLIC_KEY);


export const stripeContainer = () => {
  <Elements stripe ={stripe}>
    <Cart />
  </Elements>
};

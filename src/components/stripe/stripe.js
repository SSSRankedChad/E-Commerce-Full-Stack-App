import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Cart from '../../features/Cart/cart.js';

export const PUBLIC_KEY = 'pk_test_51QpyhaPOpAye6nyzpjWArLlaDq3lZhEFoKNOUFumsjBW1e5gwYCk6pLnEWpfvCEVZJ7dvL8wSJii7v1XwnyhB6U900WKmey0Zw';

export const stripePromise = await loadStripe(PUBLIC_KEY);


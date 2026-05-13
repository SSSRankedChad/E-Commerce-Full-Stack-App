import React, {useEffect} from 'react';
import Orders  from './features/Orders/orders.js';
import Order  from './components/Order/order.js';
import User  from './features/User/user.js';
import Products  from './features/Products/products.js';
import Cart from './features/Cart/cart.js';
import Login  from './features/Login/login.js';
import Home from './features/Home/home.js';
import Register from './features/Register/register.js';
import ProductDetails from './features/ProductDetails/productDetails.js';
import StripeContainer from './components/stripe/stripe.js';
import Navbar from './components/Navbar/navbar.js';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const App = () => {

  return (
    <div className="App__main__container">
      <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/products" element={<Products />}/>
       <Route path="/products/:productId" element={<ProductDetails />}/>
       <Route path="/user" element={<User />}/>
       <Route path="/orders" element={<Orders />}/>
       <Route path="/orders/:orderId" element={<Order />}/>
       <Route path="/cart" element={<StripeContainer />}/>
       <Route path="/" element={<Home />}/>
       <Route path="*" element={<Home />}/>
       <Route path='register' element={<Register />}/>
      </Routes>
    </div>
  );


}

export default App;

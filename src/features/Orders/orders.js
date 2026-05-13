import React, {useEffect, useState} from 'react';
import "./orders.css";
import Loader from "../../components/Loader/loader.js";
import Navbar from "../../components/Navbar/navbar.js";
import Alert from '@mui/material/Alert';
import Order from '../../components/Order/order.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loadOrders, loadOrderById, makeOrder, updateOrder, selectOrder, selectOrders } from '../../store/Orders/orderSlice.js';
import { selectUser, selectUserId, selectLoginSuccess, selectLogoutSuccess } from '../../store/User/userSlice.js';


const Orders = () => {
  const order = useSelector(selectOrder);
  const orderId = order.id;
  const orders = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const userId = user.id;
  const loginSuccess = useSelector(selectLoginSuccess);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);


  useEffect(() => {
    dispatch(loadOrderById(orderId))
  }, [dispatch, orderId]);



  if(!orders) {
    return (
      <div className="Orders__empty__container">
        <h1> No orders! Please make an order </h1>
      </div> 
    )
  }



  return (
    <section className="orders">
     <h2 className="Orders__heading__container"> Order History </h2>
     <div className="Orders__container">
       <ul className="Orders__list">
       {orders.map((order) => <li key={order.id}> <Order order={order}/></li>)}
     </ul>
    </div>
   </section>
  );
}

export default Orders;

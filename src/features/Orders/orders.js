import React, {useEffect, useState} from 'react';
import "./orders.css";
import Loader from "../../components/Loader/loader.js";
import Navbar from "../../components/Navbar/navbar.js";
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearOrders, loadOrders, selectOrdersPending, selectCancelOrderSuccess, clearOrderStatusUpdates, selectOrders, selectOrdersLoadSuccess, selectCancelingOrderError} from '../../store/Orders/orderSlice.js';
import { selectUserId, selectLoginSuccess, selectLogoutSuccess } from '../../store/User/userSlice.js';


const Orders = ({orders}) => {
  const loadingOrders = useSelector(selectOrdersPending);
  const loadOrdersSuccess = useSelector(selectOrdersLoadSuccess);
  const cancelOrderSuccess = useSelector(selectCancelOrderSuccess);
  const userId = useSelector(selectUserId);
  const cancelOrderError = useSelector(selectCancelingOrderError);
  const loginSuccess = useSelector(selectLoginSuccess);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const handleChange = ({target}) => {
    setSort(target.value);
  };


  useEffect(() => {
    if(userId) {
      dispatch(loadOrders({userId}))
    }
  }, [dispatch, userId]);


  useEffect(() => {
    if(cancelOrderSuccess || loginSuccess ) {
      dispatch(loadOrders({userId}))
    }
    if(loadOrdersSuccess) {
      dispatch(clearOrderStatusUpdates())
    }
  }, [userId, dispatch, cancelOrderSuccess, loginSuccess, loadOrdersSuccess]);


  if(loadingOrders) {
    return (
      <div className="Order__loading__container">
       <span> Orders loading......</span>
       <Loader /> 
      </div>
    )
  }


  if(!orders) {
    return (
      <div className="Orders__empty__container">
        <span> No orders! Please make an order </span> 
        {setTimeout(() => {
         navigate("/")
        }, 3000)}
      </div> 
    )
  }



  return (
    <section className="orders">
     <h2 className="Orders__heading__container"> Order History </h2>
     <div className="Orders__container">
       <ul className="Orders__list">
       {loadOrdersError && <Alert severity="error" msg={loadOrdersError} onClose={() => dispatch(clearOrderStatusUpdates())}/>}
       {orders.map((order) => <li key={order.order_id}> <Order order={order}/></li>)}
     </ul>
    </div>
   </section>
  );
}

export default Orders;

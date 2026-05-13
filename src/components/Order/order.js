import React, {useEffect} from 'react';
import Moment from 'moment';
import Button from '@mui/material/Button';
import Loader from '../Loader/loader.js';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { clearOrderStatusUpdates} from '../../store/Orders/orderSlice.js';
import { selectUserId } from '../../store/User/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';


const Order = ({order}) => {
  const orderId = order.id;
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();



  const handleButtonClick = () => {
    dispatch(cancelOrder({userId, orderId}));
  };


  if(Object.entries(order).length === 0) return null;


  if(!order) {
    return (
     <section className="Order__empty__container">
        <h1 className="Order__empty__label"> No orders crrently in list</h1>
        <p className="Order__empty__message"> Redirecting </p>
        <Loader />
        {setTimeout(() => {
          navigate("/")
        }, 3000)}
     </section>
    );
  }


  return (
    <section className="Order">
     <div className="order__info__container">
      <Link to={`/orders/${orderId}`}>
       <h3 className="order__id">{order.id}</h3>
      </Link>
     <p className="order__date"> Date: {order.date} </p>
     <p className="order__status"> Status: {order.status} </p>
     <div/>
     <div className="order__container"/>
      <img className="order__image" src={order.url} alt=""/>
       <div className="Order__address">
                    <h3 className="Order__shipping__info">Shipping Address</h3>
                    <p className="Order__fullname">{order.shipto_name}</p>
                    <p className="Order__streetAddress">{order.shipto_street}</p>
                    <span className="Order__city">{order.shipto_city}, </span>
                    <span className="Order__state">{order.shipto_state} </span>
                    <span className="Order__zipcode">{order.shipto_zipcode}</span>
                    <p className="Order__email">{order.email}</p>
       </div>
      <div className="Order__payment">
                    <h3 className="Order__total">Order Total: {order.total}</h3>
                    <p className="Order__cardNum">Card Number: *{order?.card_num}</p>
       </div>
      </div>
    </section>
    );
}

export default Order;

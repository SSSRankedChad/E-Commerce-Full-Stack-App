import React, {useEffect, useState} from 'react';
import "./orders.css";
import Loader from "../../components/Loader/loader.js";
import Alert from '@mui/material/Alert';
import Navbar from '../../components/Navbar/navbar.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearOrders, loadOrders, selectOrdersPending, selectCancelOrderSuccess, clearOrderStatusUpdates, selectOrders, selectOrdersLoadSuccess, selectCancelingOrderError} from '../../store/Orders/orderSlice.js';
import { selectUserId, selectLoginSuccess, selectLogoutSuccess } from '../../store/User/userSlice.js';
import { selectCheckoutSuccess } from '../../store/Cart/cartSlice.js';



const Orders = () => {
  const sortingOptions = ['', 'newest', 'oldest'];
  const [sort, setSort] = useState('');
  const orders = useSelector(selectOrders);
  const loadingOrders = useSelector(selectOrdersPending);
  const loadOrdersSuccess = useSelector(selectOrdersLoadSuccess);
  const cancelOrderSuccess = useSelector(selectCancelOrderSuccess);
  const userId = useSelector(selectUserId);
  const cancelOrderError = useSelector(selectCancelingOrderError);
  const loginSuccess = useSelector(selectLoginSuccess);
  const logoutSuccess = useSelector(selectLogoutSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutSuccess = useSelector(selectCheckoutSuccess);


  const handleChange = ({target}) => {
    setSort(target.value);
  };


  useEffect(() => {
    if(userId) {
      dispatch(loadOrders({userId, sort}))
    }
  }, [dispatch, userId, sort]);


  useEffect(() => {
    if(cancelOrderSuccess || loginSuccess || checkoutSuccess) {
      dispatch(loadOrders({userId, sort}))
    }
    if(logoutSuccess) {
      dispatch(clearOrders());
    }
    if(loadOrdersSuccess) {
      dispatch(clearOrderStatusUpdates())
    }
  }, [sort, userId, dispatch, cancelOrderSuccess, logoutSuccess, loginSuccess, checkoutSuccess, loadOrdersSuccess]);


  useEffect(() => {
    if(loadingOrders) {
      return (
        <div className="order__loading__container">
         <Loader />
        </div>
      );
    }
  }, []);

  if(!orders.length) {
    return (
      <div className="order__history__container">
        <h1 className="order_history"> No order history! </h1>
        <p className="order__history__message"> Redirecting....</p>
        {setTimeout(() => {
          navigate("/")
        }, 3000)}
        <Loader /> 
      </div>
    );
  }

  return (
    <section className="orders">
     <h2 className="Orders__heading__container"> Order History </h2>
     <div className="Orders__container">
      <span className="Orders__label"> Sort: </span>
      <select className="Orders__select__container" name="sort" value={sort} onChange={handleChange}>
      {sortOptions.map((sortOpt,i) => <option key={`${sortOpt}__${i}`} value={sortOpt}>{sortOpt}</option>)}
      </select>
     <ul className="Orders__list">
     {loadOrdersError && <Alert severity="error" msg={loadOrdersError} onClose={() => dispatch(clearOrderStatusUpdates())}/>}
     {orders.map((order) => <li key={order.order_id}> <Order order={order}/></li>)}
     </ul>
    </div>
   </section>
  );
}

export default Orders;

const createError = require('http-errors');
const cartModel = require('../models/cart/cart.js');
const cartModelInstance = new cartModel();
const cartItemModel = require('../models/cartItem/cartItem.js');
const cartItemModelInstance = new cartItemModel();
const orderModel = require('../models/orders/orders.js');
const orderModelInstance = new orderModel();

module.exports = class cartService {
  
  async create(data) {

     const { userId } = data;
     try {
	const cart = await cartModelInstance.creata(data);
	return cart;
    } catch(err) {
	throw err;
   }
 }

 async addItem(userId, data) {

    try {
     
     const cart = await cartModelInstance.findOneById(userId);
     
     const cartItem = await cartItemModelInstance.create({userId, ...data});
    
      return cartItem;
    } catch(err) {
	throw err;
    }

async deleteCartItem(cartItemId) {
 try {

  const cartItem = await cartItemModelInstance.deleteCartId(cartItemId);
  return cartItem;
 } catch(err) {
   throw err;
  }
}

async updateItem(cartItemId, data) {
   try {
    const cartItem = await cartItemModelInstance.update({cartItemId, ...data});
    return cartItem;
   } catch(err) {
    throw err;
   }


async checkout(cartItem, data, payment) {

 try {

  const stripe = require('stripe')('pk_test_51QpyhaPOpAye6nyzpjWArLlaDq3lZhEFoKNOUFumsjBW1e5gwYCk6pLnEWpfvCEVZJ7dvL8wSJii7v1XwnyhB6U900WKmey0Zw');
  
  const cartItems = await cartModelInstance.findOneById(cartId);

  const total = cartItems.reduce((total, items) => {
    return total + Number(item.price);
  }, 0);

  const Order = orderModelInstance({total, cartId});
  Order.addItems(cartItems);
  await Order.create();


  const charge = await stripe.charges.create({
	  amount: total,
	  currency: 'usd'
	  source: payment.id,
	  description: "E_Commerce_App"
  }); 

 const order = Order.update({status: 'SUCCESSFUL'});
 return order;
} catch(err) {
    throw err;
 }
}

}

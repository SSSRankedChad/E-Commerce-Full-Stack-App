const createError = require('http-errors');
const cartModel = require('../models/cart/cart.js');
const cartModelInstance = new cartModel();
const cartItemModel = require('../models/cartItems/cartItems.js');
const cartItemModelInstance = new cartItemModel();
const orderModel = require('../models/orders/orders.js');
const orderItemModel = require('../models/orderItems/orderItems.js');


module.exports = class cartService {

  async get(data) {
    const { userId } = data;
    try {
      const cart = await cartModelInstance.findOneById(data);
      return cart;
    } catch(err) {
      throw err;
    }
  }

  async findItems(data) {
    const { userId } = data;
    try {
      const cart = await cartModelInstance.findOneById(data);
      const cartItems = await cartItemModelInstance.findItemsById(cart.id);
      return cartItems;
    } catch(err) {
      throw err;
    }
  }
  
  async create(data) {

     const { userId } = data;
     try {
    	const cart = await cartModelInstance.create(data);
    	return cart;
    } catch(err) {
	throw err;
   }
 }

 async addItem(userId, data) {

    try {

    const { quantity, productId } = data;
     
     const cart = await cartModelInstance.findOneById(userId);
     
     const cartItem = await cartItemModelInstance.create({
       qty: quantity,
       cartid: cart.id,
       productid: productId });
    
      return cartItem;
    } catch(err) {
	throw err;
    }
 }

async deleteCartItem(cartItemId) {
 try {
  const cartItem = await cartItemModelInstance.deleteItem(cartItemId);
  return cartItem;
 } catch(err) {
   throw err;
  }
}

async updateItem(cartItemId, data) {
   try {
    const cartItem = await cartItemModelInstance.update({id: cartItemId, ...data});
    return cartItem;
   } catch(err) {
    throw err;
   }
 }


async checkout(userId, cartId, paymentInfo) {

 try {

  const stripe = require('stripe')("sk_test_51QpyhaPOpAye6nyzD3VqC72xpapWJwTGgNfVyapzWaiuqOus7tOI7IuJ1oUgkwDXFiUzA5eXoy3jn7KlQ3JnTRKA00EkuFkW92");

  const cartItems = await cartItemModelInstance.findItemsById(cartId);

  const orderItem = new orderItemModel();

  const total = cartItems.reduce((total, item) => {
    return total += (item.price * item.qty);
  }, 0);


  const Order = new orderModel({total, userid: userId});

  await Order.addItems(cartItems);
  Order.createOrder();

  const charge = await stripe.charges.create({
	  amount: total,
	  currency: 'usd',
	  source: paymentInfo.id,
	  description: "E_Commerce_App"
  });

  const order = Order.updateOrder({status: "Successfull"});
  return order;

} catch(err) {
    throw err;
 }
}

}

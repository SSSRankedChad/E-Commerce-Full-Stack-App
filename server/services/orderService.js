const createError = require('http-errors');
const orderModel = require('../models/orders/orders.js');
const orderItemModel = require('../models/orderItems/orderItems.js');
const orderModelInstance = new orderModel();
const orderItemModelInstance = new orderItemModel();


module.exports = class orderService {
   
  async create(data) {
    try {
      const { userId } = data;
	    const order = await orderModelInstance.createOrder({ userId, total });
	    return order;
     } catch(err) {
	      throw err;
     }
  }

 async list(userId) {
    try {
	    const orders = await orderModelInstance.findOrderByUser(userId);
	    return orders;
	    if(!orders) {
	     throw createError('409', 'Order not found!');
	    }
    } catch(err) {
	    throw err;
	  }
  }

 async get(orderId) {
  try {
	  const order = await orderItemModelInstance.findOrderById(orderId);
    console.log(order);
	  return order;
	  if(!order) {
	   throw createError('409','Order not found!');
	  }
   } catch(err) {
	    throw err;
   }
 }

}

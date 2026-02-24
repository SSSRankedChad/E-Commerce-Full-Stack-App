const createError = require('http-errors');
const orderModel = require('../models/orders/orders.js');
const orderModelInstance = new orderModel();


module.exports = class orderService {
   
  async create() {
    try {
	    const order = await orderModelInstance.createOrder();
	    return order;
     } catch(err) {
	      throw err;
     }
  }

 async find(id) {
    try {
	    const { id } = data;
	    const order = await orderModelInstance.findOrderByUser(id);
	    return order;
	    if(!order) {
	     throw createError('409', 'Order not found!');
	    }
    } catch(err) {
	    throw err;
	  }
  }

 async get(id) {
  try {
	  const { id } = data;
	  const order = await orderModelInstance.findOrderById(id);
	  return order;
	  if(!order) {
	   throw createError('409','Order not found!');
	  }
   } catch(err) {
	    throw err;
   }
 }

}

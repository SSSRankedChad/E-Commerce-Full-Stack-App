const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService.js');
const orderServiceInstance = new orderService();



module.exports = (app) => {

  app.use('/api/orders', router);

  router.post('/', async(req, res, next) => {
    try {
	    const response = await orderServiceInstance.create();
	    res.status(200).send(response);
    } catch(err) {
	    next(err);
    }
  });
	
  router.get('/:orderId', async(req, res, next) => {
    try {
	    const { orderId } = req.params;
	    const response = await orderServiceInstance.get(orderId);
	    res.status(200).send(response);
	} catch(err) {
	   next(err);
	 }
  });

  router.get('/:userId', async(req, res, next) => {
  try {
	  const { userId } = req.params;
	  const response = await orderServiceInstance.find(userId);
	  res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 }); 

 router.put('/:orderId', async(req, res, next) => {
   try {
      const { orderId } = req.params;
	    const { order } = req.body;
	    const response = await orderServiceInstance.update({orderId, ...order});
	    res.status(200).send(response);
    } catch(err) {
      throw new Error(err);
    }
  });

}

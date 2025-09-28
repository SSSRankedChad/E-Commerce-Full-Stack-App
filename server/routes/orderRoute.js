const express = require('express');
const orderService = require('../services/orderService.js');
const orderServiceInstance = new orderService();



module.exports = (app) => {

  const router = express.Router();

  router.post('/', async(err, req, res, next) => {
    try {
	    const data = req.body;
	    const response = await orderServiceInstance.create(data);
	    res.status(200).send(response);
    } catch(err) {
	    next(err);
    }
  });
	
  router.get('/:orderId', async(req, res, next) => {
    try {
	    const { orderId } = req.params;
	    const response = await orderServiceInstance.get({ orderId });
	    res.status(200).send(response);
	} catch(err) {
	   next(err);
	 }
  });

  router.get('/:userId', async(req, res, next) => {
  try {
	  const { userId } = req.params;
	  const response = await orderServiceInstance.find({userId});
	  res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 }); 

 router.put('/:orderId', async(req, res, next) => {
   try {
      const { orderId } = req.params;
	    const data = req.body;
	    const response = await orderServiceInstance.update({orderId, data});
	    res.status(200).send(response);
    } catch(err) {
      throw new Error(err);
    }
  });

  app.use('/api/orders', router);
}


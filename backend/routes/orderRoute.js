const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService.js');
const orderServiceInstance = new orderService();



module.exports = (app) => {
  
  app.use('/orders', router);

  router.post('/orders', async(req, res, next, err) => {
     try {
	const data = req.body;
	const response = await orderServiceInstance.create(data);
	res.status(200).send(response);
     } catch(err) {
	throw new Error(err);
     }
   
  });
	
  router.get('/orders/:orderId', async(req, res, next, err) => {
       try {
	 const { orderId } = req.params;
	 const response = await orderServiceInstance.get({ orderId });
	 res.status(200).send(response);
	} catch(err) {
	 throw new Error(err);
	}
  });

 router.get('/orders/:userId', async(req, res, next, err) => {
        try {
	  const { userId } = req.params;
	  const response = await orderServiceInstance.find({userId});
	  res.status(200).send(response);
	} catch(err) {
	  throw new Error(err);
	}
 }); 

 router.put('/orders/:orderId', async(req, res, next, err) => {
     try {
        const { orderId } = req.params;
	const data = req.body;
	const response = await orderServiceInstance.update({orderId, data});
	res.status(200).send(response);
    } catch(err) {
       throw new Error(err);
    }
  });

}


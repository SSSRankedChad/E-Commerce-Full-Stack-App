const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService.js');
const cartServiceInstance = new cartService();



module.exports = (app) => {

  app.use('/cart', router);


  router.post('/cart', async(req, res, next, err) => {
     try {
       const data = req.body;
       const response = await cartServiceInstance.create(data);
       res.status(200).send(response);
    } catch(err) {
	throw new Error(err);
    }
   });

  router.post('/cart', async(req, res, next, err) => {
	try {
	  const data = req.body;
	  const response = await cartServiceInstance.checkout(data);
	  res.status(200).send(response);
	 } catch(err) {
	   throw new Error(err);
	 }
  });


 router.put('/cart/:cartItemId', async(req, res, next, err) => {
	try {
	  const { cartItemId } = req.params;
	  const data = req.body;
	  const response = await cartServiceInstance.updateItem({cartItemId, data});
	  res.status(200).send(response);
	} catch(err) {
	  throw new Error(err);
	}
  });

 router.post('/cart/:userId', async(req, res, next, err) => {
	try {
	   const { userId } = req.params;
	   const data = req.body;
	   const response = await cartServiceInstance.addItem({userId, data});
	   res.status(200).send(response);
	} catch(err) {
	  throw new Error(err);
	}
 });

 router.delete('/cart/:cartItemId', async(req, res, next, err) => {
	try {
	  const { cartItemId } = req.params;
	  const data = req.body;
	  const response = await cartServiceInstance.deleteCartItem({cartItemId});
	  res.status(200).send(response);
	} catch(err) {
	  throw new Error(err);
	}
});


const express = require('express');
const cartService = require('../services/cartService.js');
const cartServiceInstance = new cartService();



module.exports = (app) => {

  const router = express.Router();


  router.post('/mine', async(req, res, next) => {
    try {
       const data = req.body;
       const response = await cartServiceInstance.create(data);
       res.status(200).send(response);
    } catch(err) {
	     next(err);
    }
   });

  router.post('/mine', async(req, res, next) => {
	  try {
	    const data = req.body;
	    const response = await cartServiceInstance.checkout(data);
	    res.status(200).send(response);
	  } catch(err) {
	     next(err);
	  }
  });


  router.put('mine/items/:cartItemId', async(req, res, next) => {
	 try {
	   const { cartItemId } = req.params;
	   const data = req.body;
	   const response = await cartServiceInstance.updateItem({cartItemId, data});
	   res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 });

 router.post('mine/items', async(req, res, next) => {
	try {
	   const { userId } = req.params;
	   const data = req.body;
	   const response = await cartServiceInstance.addItem({userId, data});
	   res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 });

  router.delete('mine/items/:cartItemId', async(req, res, next) => {
	try {
	  const { cartItemId } = req.params;
	  const data = req.body;
	  const response = await cartServiceInstance.deleteCartItem({cartItemId});
	  res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 });

  app.use('/api/cart', router);

}


const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService.js');
const cartServiceInstance = new cartService();



module.exports = (app) => {

  app.use('/api/cart', router);

  function requireAuth(req, res, next) {
    if(!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }
    next();
  }

  router.post('/mine', requireAuth, async(req, res, next) => {
    try {
       const userId = req.user.id;
       const response = await cartServiceInstance.create(userId);
       res.status(200).send(response);
    } catch(err) {
	     next(err);
    }
   });

  router.get('/mine/items', requireAuth, async(req, res, next) => {
    try {
      const userId = req.user.id;
      const response = await cartServiceInstance.findItems(userId);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  })

  router.get('/mine', requireAuth, async(req, res, next) => {
    try {
      const userId = req.user.id;
      const response = await cartServiceInstance.get(userId);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  })

  router.post('/checkout', requireAuth, async(req, res, next) => {
	  try {
	    const userId = req.user.id;
      const { cartId, paymentInfo } = req.body;
	    const response = await cartServiceInstance.checkout(userId, cartId, paymentInfo);
	    res.status(200).send(response);
	  } catch(err) {
	     next(err);
	  }
  });


  router.put('/mine/items/:cartItemId', requireAuth, async(req, res, next) => {
	 try {
     const userId = req.user.id;
     const { quantity } = req.body;
	   const { cartItemId } = req.params;
	   const response = await cartServiceInstance.updateItem(cartItemId, { qty: quantity });
	   res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 });

 router.post('/mine/items', requireAuth, async(req, res, next) => {
	try {
	   const userId = req.user.id;
     const { quantity } = req.body;
	   const response = await cartServiceInstance.addItem(userId, quantity);
	   res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 });

  router.delete('/mine/items/:cartItemId', requireAuth, async(req, res, next) => {
	try {
	  const { cartItemId } = req.params;
	  const response = await cartServiceInstance.deleteCartItem(cartItemId);
	  res.status(200).send(response);
	} catch(err) {
	  next(err);
	}
 });

}


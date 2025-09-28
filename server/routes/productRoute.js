const express = require('express');
const productService = require('../services/productsService.js');
const prodcutServiceInstance = new productService();


module.exports = (app) => {

  const router = express.Router();

  router.get('/:productId', async(req, res, next) => {
   try { 
	   const { productId } = req.params;
	   const response = await productServiceInstance.findProductById({productId});
	   res.status(200).send(response);
   } catch(err) {
	  next(err);
   }
  });


  router.get('/', async(req, res, next) => {
	 try {
	    const data = req.body;
	    const response = await productServiceInstance.get(data);
	    res.status(200).send(response);
	  } catch(err) {
	    next(err);
	  }
   });

  app.use('/api/products', router);
}

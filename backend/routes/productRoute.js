const express = require('express');
const router = express.Router();
const productService = require('../services/productsService.js');
const prodcutServiceInstance = new productService();


module.exports = (app) => {
 
  app.use('/products', router);
  
  router.get('/:productId', async(err, req, res, next) => {
      try { 
	const { productId } = req.params;
	const response = await productServiceInstance.findProductById({productId});
	res.status(200).send(response);
      } catch(err) {
	throw new Error(err);
      }
   });


  router.get('/products', async(err, req, res, next) => {
	 try {
	    const data = req.body;
	    const response = await productServiceInstance.get(data);
	    res.status(200).send(response);
	  } catch(err) {
	    throw new Error(err);
	 }
   });

}

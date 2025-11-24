const express = require('express');
const router = express.Router();
const productService = require('../services/productsService.js');
const prodcutServiceInstance = new productService();


module.exports = (app) => {

 app.use('/api/products', router);

	
  router.get('/:productId', async(req, res, next) => {
   try { 
	   const { productId } = req.params;
	   const response = await productServiceInstance.find({productId});
	   res.status(200).send(response);
   } catch(err) {
	  next(err);
   }
  });


  router.get('/', async(req, res, next) => {
	 try {
	    const data = req.query;
	    const response = await productServiceInstance.get(data);
	    res.status(200).send(response);
	  } catch(err) {
	    next(err);
	  }
   });

}

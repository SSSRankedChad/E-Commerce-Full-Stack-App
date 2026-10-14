const express = require('express');
const router = express.Router();
const productService = require('../services/productsService.js');
const productServiceInstance = new productService();


module.exports = (app) => {

 app.use('/', router);


  router.get('/api/products/', async(req, res, next) => {
	 try {
      const products = req.query;
	    const response = await productServiceInstance.get(products);
	    res.status(200).send(response);
	  } catch(err) {
	    next(err);
	  }
   });

	
 router.get('/api/products/:productId', async(req, res, next) => {
   try { 
   	 const { productId } = req.params;
	   const response = await productServiceInstance.find(productId);
	   res.status(200).send(response);
   } catch(err) {
	  next(err);
   }
  });


}

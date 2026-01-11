const express = require('express');
const router = express.Router();
const productService = require('../services/productsService.js');
const productServiceInstance = new productService();


module.exports = (app) => {

 app.use('/api/products', router);


  router.get('/', async(req, res, next) => {
	 try {
	    const response = await productServiceInstance.get();
	    res.status(200).send(response);
	  } catch(err) {
	    next(err);
	  }
   });

	
 router.get('/:id', async(req, res, next) => {
   try { 
   	 const { id } = req.params;
	   const response = await productServiceInstance.find(id);
	   res.status(200).send(response);
   } catch(err) {
	  next(err);
   }
  });


}

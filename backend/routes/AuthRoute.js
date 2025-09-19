const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService.js');
const authServiceInstance = new authService();


module.exports = (app) => {

   app.use('/register', router);
  
   router.post('/register', async(req, res, next, err) => {
      try {
	 const data = req.body;
	 const response = await authServiceInstance.register(data);
	 res.status(200).send(response);
      } catch(err) {
	 throw new Error(err);
       }
    });

    
    router.post('/login', async(req, res, next, err) => {
	try {
	   const {email, passsword} = req.body;
	   const response = await authServiceInstance.login({email, password});
	    res.status(200).send(response);
	} catch(err) {
	   throw new Error(err);
	}
    }); 

 }

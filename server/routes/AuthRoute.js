const express = require('express');
const authService = require('../services/AuthService.js');
const authServiceInstance = new authService();


module.exports = (app, passport) => {
   const router = express.Router();

   router.post('/register', async(req, res, next) => {
    try {
	   const data = req.body;
	   const response = await authServiceInstance.register(data);
	   res.status(200).send(response);
    } catch(err) {
	   next(err);
    }
   });

    
  router.post('/login', passport.authenticate('local'), async(req, res, next) => {
	 try {
	   const {email, passsword} = req.body;
	   const response = await authServiceInstance.login({email, password});
	   res.status(200).send(response);
	  } catch(err) {
	   next(err);
	  }
   });

   app.use('/api/auth', router);

 }


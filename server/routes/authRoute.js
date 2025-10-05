const express = require('express');
const passport = require('passport');
const router = express.Router();
const authService = require('../services/authService.js');
const authServiceInstance = new authService();


module.exports = (app, passport) => {

   app.use('/api/auth', router);

   router.post('/register', async(req, res, next) => {
    try {
	   const data = req.body;
	   console.log("Register route hit!", req.body);
	   const response = await authServiceInstance.register(data);
	   res.status(200).send(response);
    } catch(err) {
	   next(err);
    }
   });

    
  router.post('/login', passport.authenticate('local'), async(req, res, next) => {
	 try {
	   const {email, password} = req.body;
	   console.log("Login route hit!", req.body);
	   const response = await authServiceInstance.login({email, password});
	   res.status(200).send(response);
	  } catch(err) {
	   next(err);
	  }
   });

}

const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');
const authServiceInstance = new authService();


module.exports = (app, passport) => {

   app.use('/api/auth', router);

   router.post('/register', async(req, res, next) => {
    try {
	   const data = req.body;
	   const response = await authServiceInstance.register(data);
	   res.status(200).send(response);
    } catch(err) {
	   next(err);
    }
   });

    
  router.post('/login', passport.authenticate('local'), (req, res) => {
     res.status(200).send(req.user);
  });

  router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if(err) {
        res.status(500).json({message: "Logout was unsuccesfull."})
      }
      else {
        res.status(200).json({message: "Logout was succesfull!"})
      }
    })
  });
}

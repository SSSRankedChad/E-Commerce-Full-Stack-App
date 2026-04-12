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

    
  router.post('/login', passport.authenticate('local'), async(req, res, next) => {
     try {
       const { email, password } = req.body;
       const response = await authServiceInstance.login({ email, password });
       res.status(200).send(response);
     } catch(err) {
       next(err);
     }
  });

  router.get('/session', (req, res, next) => {
   try {
    res.status(200).json({user: req.session.user});
    } catch(err) {
      next(err); 
    }
  });

  router.post('/logout', async (req, res, next) => {
    req.session.destroy((err => {
         if(err) {
           res.status(500).json({message: "Session not destroyed"});
          }
          res.status(200).json({message: "Session was destroyed"});
        }));
    });
}

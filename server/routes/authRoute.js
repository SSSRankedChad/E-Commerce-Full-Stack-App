const express = require('express');
const router = express.Router();
const authService = require('../services/authService.js');
const authServiceInstance = new authService();


module.exports = (app, passport) => {

   app.use('/', router);

   router.post('/api/ruth/register', async(req, res, next) => {
    try {
	   const data = req.body;
	   const response = await authServiceInstance.register(data);
	   res.status(200).send(response);
    } catch(err) {
	   next(err);
    }
   });

    
  router.post('/api/auth/login', passport.authenticate('local'), async(req, res, next) => {
     try {
       const { email, password } = req.body;
       const response = await authServiceInstance.login({ email, password });
       res.status(200).send(response);
     } catch(err) {
       next(err);
     }
  });

  router.get('/api/auth/session', (req, res, next) => {
   try {
    res.status(200).json({user: req.session.user});
    } catch(err) {
      next(err); 
    }
  });

  router.post('/api/auth/logout', async (req, res, next) => {
    req.session.destroy((err => {
         if(err) {
           res.status(500).json({message: "Session not destroyed"});
          }
          res.status(200).json({message: "Session was destroyed"});
        }));
    });
}

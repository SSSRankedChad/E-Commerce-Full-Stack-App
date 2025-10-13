const express = require('express');
const router = express.Router();
const userService = require('../services/userService.js');
const userServiceInstance = new userService();



module.exports = (app) => {

   app.use('/api/user', router);

   router.put('/:userId', async(req, res, next) => {
    try {
	   const { userId } = req.params;
	   const data = req.body;
	   const response = await userServiceInstance.update({id: userId, ...data});
	   res.status(200).send(response);
    } catch(err) {
	    next(err);
    }
   });


  router.get('/:userId', async(req, res, next) => {
	 try {
	    const { userId } = req.params;
	    const response = await userServiceInstance.get({userId});
	    res.status(200).send(response);
	  } catch(err) {
	    next(err);
	 }
  });

}


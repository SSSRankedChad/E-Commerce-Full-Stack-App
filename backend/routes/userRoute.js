const express = require('router');
cont router = express.Router();
const userService = require('../services/user/userService.js);
const userServiceInstance = new userService();



module.exports = (app) => {
   app.use('/user', router);
   
   router.put('/:userId', async(req, res, next, err) => {
     try {
	const { userId } = req.params;
	const data = req.body;
	const response = await userServiceInstance.update({id: userId, data});
	res.status(200).send(response);
    } catch(err) {
	throw new Error(err);
     }
    });


    router.get('/userId', async(req, res, next, err) => {
	 try {
	    const { userId } = req.params;
	    const response = await userServiceInstance.get({userId});
	    res.status(200).send(response);
	  } catch(err) {
	    throw new Error(err);
	 }
     });
}


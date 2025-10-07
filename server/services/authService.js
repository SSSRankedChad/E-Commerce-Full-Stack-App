const createError = require('http-errors');
const userModel = require('../models/user/user.js');
const userModelInstance = new userModel();


module.exports = class authService {
  async register(data) {
    try {
       const { email } = data;
       const user = userModelInstance.createUser(data);
       return await userModelInstance.createUser(data);
     } catch(err) {
	      throw err;
     }

   }

  async login(data) {
    try {
      const {email, password} = data;
      const user = await userModelInstance.findUserByEmail(data);
      if(!user) {
	createError('409','User not found');
      }
      else if(user.password !== password) {
	 createError('409', 'Password does not match');
      }
      return user;
    } catch(err) {
	 throw err;
    }
  }
}

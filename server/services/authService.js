const createError = require('http-errors');
const userModel = require('../models/user/user.js');
const userModelInstance = new userModel();


module.exports = class authService {
  async register(data) {
    try {
       const { email } = data;
       const user = userModelInstance.createUser(data);
       if(!user) {
	 throw createError('404', 'User not found!');
       }
       return await userModelInstance.createUser(data);
     } catch(err) {
	throw err;
     }

   }

  async login(data) {
    try {
      const {email, password} = data;
      const user = userModelInstance.findUserByEmail(data);
      if(!user) {
	    throw createError('404','User not found!');
      }
      if(user.password !== password) {
        throw createError('404', "Password does not match!")
      }
      return user;
    } catch(err) {
	 throw err;
    }
  }
}

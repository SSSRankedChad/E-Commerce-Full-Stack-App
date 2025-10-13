const createError = require('http-errors');
const userModel = require('../models/user/user.js');
const userModelInstance = new userModel();


module.exports = class authService {
  async register(data) {
    try {
       const { email } = data;
       const user = await userModelInstance.createUser(data);
       if(user) {
         throw createError(401, 'User already exists!');
      }
       return user;
     } catch(err) {
	    throw err;
     }

   }

  async login(data) {
    try {
      const { email } = data;
      const user = await userModelInstance.findUserByEmail(email);
      console.log(user);
      return user;
    } catch(err) {
	 throw err;
    }
  }
}

const createError = require('http-errors');
const userModel = require('../models/user/user.js');
const userModelInstance = new userModel();


module.exports = class userService {
  async register(data) {
    try {
       const { email } = data;
       const user = userModelInstance(email);
       if(!user) {
	 throw createError('409', 'User not found!');
       }
       return user;
     } catch(err) {
	throw err;
     }

   }

  async login(data) {
    try {
      const {email, password} = data;
      const user = userModelInstance.findUserByEmail(data);
      if(!user) {
	throw createError('409','User not found!');
      }
      if(user.passsword !== password) {
	throw createError('409', 'Password does not match!');
      }
      return user;
    } catch(err) {
	throw err;
    }
  }
}

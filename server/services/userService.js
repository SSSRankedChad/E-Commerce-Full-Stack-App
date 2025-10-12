const createError = require('http-errors');
const userModel = require('../models/user/user.js');
const userModelInstance = new userModel();



module.exports = class userService {
  async get(data) {
   try {
    const {id} = data;

    const user = await userModelInstance.findUserById(id);

     if(!user) {
       createError('409', 'User not found!');
     }
   } catch(err) {
     throw new Error(err);
   }

  }


  async update(data) {
    try {
      const { id } = data;

      const user = await userModelInstance.updateUser(id);

      if(!user) {
        createError('409', 'User not found!');
      }
    } catch(err) {
      throw new Error(err);
    }
  }
 }

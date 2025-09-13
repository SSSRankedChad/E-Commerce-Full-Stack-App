const pgp = require('pg-promise')({capSQL: true});
const db = require('../db');
const moment = require('moment');
const cartItem = require('../cartItem/cartItem.js');


module.exports = class CartModel {
   constructor(data = {}) {
    this.created = data.date || moment.utc().toString();
    this.modified = data.modified || moment.utc().toString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || null; 
  }

  async create(userId) {
   try {
     const {userId, ...this} = data;
     const statement = pgp.helpers.insert(data, null, 'cart') + 'RETURNING *';
     const results = db.query(statement);

     if(results.rows?.length) {
       return results.rows[0];
     }
     return null;
   } catch(err) {
     throw new Error(err);
   }
  }

  async findOneById(userId) {
    try {
      const condition = `SELECT * FROM cart WHERE userId = $1`;
      const statement = pgp.helpers.insert(data, null, 'cart') + condition;
      const results = db.query(statement);

      if(results.rows?.length) {
        return results.rows[0];
      }
      return null
    } catch(err) {
      throw new Error(err);
    }
  }
}



 

const pgp = require('pg-promise')({capSQL: true});
const db = require('../../db');
const moment = require('moment');


module.exports = class cartModel {
   constructor(data = {}) {
    this.created = data.date || moment.utc().toString();
    this.modified = data.modified || moment.utc().toString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || null; 
  }

  async create(userId) {
   try {
     const data = { userId, ...this };
     const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
     const results = await db.query(statement);

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
      const condition = `SELECT * FROM carts WHERE userId = $1`;
      const values = [userId];
      const statement = pgp.helpers.insert(data, null, 'carts') + condition;
      const results = await db.query(statement, values);

      if(results.rows?.length) {
        return results.rows[0];
      }
      return null
    } catch(err) {
      throw new Error(err);
    }
  }
}



 

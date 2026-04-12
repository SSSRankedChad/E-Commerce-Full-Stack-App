const pgp = require('pg-promise')({capSQL: true});
const db = require('../../db');
const moment = require('moment');


module.exports = class cartModel {
   constructor(data = {}) {
    this.created = data.date || moment.utc().toString();
    this.modified = data.modified || moment.utc().toString();
    this.converted = data.converted || null;
    this.isactive = data.isactive || null; 
  }

  async create(userid) {
   try {
     const data = { userid, ...this };
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

  async findOneById(userid) {
    try {
      const statement = `SELECT * FROM carts WHERE userid = $1`;
      const values = [userid];
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



 

const db = require('../../db');
const pgp = require('pg-promise')({capSQL: true });


module.exports = class userModel {
 
  async createUser(data) {
   try {
     const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
     const results = await db.query(statement);
     if(results.rows?.length) {
       return results.rows[0];
     }
     return null;
   } catch(err) {
     throw new Error(err)
    }
  }

  async findUserById(id) {
   try {
     const statement = `SELECT id FROM users where id = $1`;
     const values = [id];
     const results = await db.query(statement);
     if(results.rows?.length) {
       return results.rows[0];
    }
     return null;
   } catch(err) {
     throw new Error(err);
   }
 }

  async updateUser(data, id) {
   try {
     const condition = `WHERE id = ${id}` + 'RETURNING *';
     const statement = pgp.helpers.insert(data, null, 'users') + condition;
     
     const results = await db.query(statement);
    
     if(results.rows?.length) {
	      return results.rows[0];
     }
     return null; 
   } catch(err) {
     throw new Error(err);
   }
 }
 
 async findUserByEmail(email, password) {
    try {
      const statement = `SELECT email, password FROM users WHERE email = $1`;
      const values = [email, password];
      const results = await db.query(statement, values);
      if(results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch(err) {
	throw new Error(err);
    }
  }
}

const db = require('../../db');
const pgp = require('pg-promise')({capSQL: true });


module.exports = class userModel {
 
  async createUser(data) {
   try {
     const statement = pgp.helpers.insert(data, null, 'user') + 'RETURNING *';
     const results = db.query(statement);
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
     const statement = `SELECT FROM user where id = $1`;
     const values = [id];
     const results = db.query(statement);
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
     const statement = pgp.helpers.insert(data, null, 'user') + condition;
     
     const results = db.query(statement);
    
     if(results.rows?.length) {
	      return results.rows[0];
     }
     return null; 
   } catch(err) {
     throw new Error(err);
   }
 }
 
 async findUserByEmail(email) {
    try {
      const statement = `SELECT email FROM user WHERE email = $1`;
      const values = [email];
      const results = db.query(statement, values);
      if(results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch(err) {
	throw new Error(err);
    }
  }
}

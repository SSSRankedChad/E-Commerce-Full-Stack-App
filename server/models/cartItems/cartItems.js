const pgp = require('pg-promise')({capSQL: true});
const db = require('../../db');


module.exports = class cartItemModel {
 async create(data) {
   try {
     const statement = pgp.helpers.insert(data, null, 'cartItems') + 'RETURNING *';
     const results = await db.query(statement);
   
     if(results.rows?.length) {
         return results.rows[0];
      }
      return null;
     } catch(err) {
      throw new Error(err);
     }
  }
	
 async update(data) {
    try {
     const condition = pgp.as.format('WHERE id = $1') + 'RETURNING *';
     const statement = pgp.helpers.insert(data, null, 'cartItems') + condition;
     const results = await db.query(statement);

     if(results.rows?.length) {
	   return results.rows[0];
     }
     return null;
    } catch(err) {
     throw new Error(err);
    }
 }

 async findItemById(id) {
    try {
     const statement = `SELECT ci.qty
	                ci.id as "cartItemId"
	                p.* FROM cartItems 
	                INNER JOIN product p
	                ON p.id = cartItem.id WHERE cartItem = $1`;
     const values = [id];
     const results = await db.query(statement, values);
     
     if(results.rows?.length) {
	     return results.rows[0];
     }
     return null;
    } catch(err) {
      throw new Error(err);
   }
 }

 async deleteItem(id) {
    try {
     const statement = `DELETE cartItem FROM cartItems WHERE id = $1`;
     const values = [id];
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
    



   
   

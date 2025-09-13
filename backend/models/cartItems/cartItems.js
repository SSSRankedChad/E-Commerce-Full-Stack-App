const pgp = require('pg-promise')({capSQL: true});
const db = require('../db');


module.exports = class CartItemModel {
 async create(data) {
   try {
     const statement = pgp.helpers.insert(data, null, 'cartItem') + 'RETURNING *';
     const results = db.query(statement);
   
     if(results.rows?.length) {
         return results.rows[0];
      }
      return null;
     } catch(err) {
      throw new Error(err);
     }
	
 async update(data) {
    try {
     const condition = pgp.as.format('WHERE id = $1') + 'RETURNING *';
     const statement = pgp.helpers.insert(data, null, 'cartItem') + condition;
     
     if(results.rows?.length) {
	return results.rows[0];
     }
     return null;
    } catch(err) {
       throw new Error(err);
    }

 async findItemById(id) {
    try {
     const statement = `SELECT ci.qty
	                ci.id as "cartItemId"
	                p.* FROM cartItems 
	                INNER JOIN product p
	                ON p.id = cartItem.id WHERE cartItem = $1`;
     const values = [id];
     const results = db.query(statement, values);
     
     if(results.rows?.length) {
	return results.rows[0];
     }
     return null;
    } catch(err) {
      throw new Error(err);
   }

 async deleteItem(id) {
    try {
     const statement = `DELETE cartItem FROM cartItem WHERE id = $1`;
     const values = [id];
     const results = db.query(statement, values);
    
     if(results.rows?.length) {
	return results.rows[0];
     }
     return null;
    } catch(err) {
     throw new Error(err);
    }
 } 
    



   
   

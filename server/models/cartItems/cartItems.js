const pgp = require('pg-promise')({capSQL: true});
const db = require('../../db');


module.exports = class cartItemModel {
 async create(data) {
   try {
     const statement = pgp.helpers.insert(data, null, 'cartitems') + 'RETURNING *';
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
     const { id, qty } = data;
     const condition = pgp.as.format(' WHERE "id" = $1', [id]);
     const statement = pgp.helpers.update({qty}, ['qty'], 'cartitems') + condition + ' RETURNING * ';
     const results = await db.query(statement);

     if(results.rows?.length) {
	   return results.rows[0];
     }
     return null;
    } catch(err) {
     throw new Error(err);
    }
 }

 async findItemsById(cartid) {
    try {
     const statement = `SELECT ci.qty,
	                ci.id as "cartItemId",
	                p.* FROM cartitems ci
	                INNER JOIN products p
	                ON p.id = ci.productid WHERE ci.cartid = $1`;
     const values = [cartid];
     const results = await db.query(statement, values);
     
     if(results.rows?.length) {
	     return results.rows;
     }
     return [];
    } catch(err) {
      throw new Error(err);
   }
 }

 async deleteItem(id) {
    try {
     const statement = `DELETE FROM "cartItems" WHERE id = $1 RETURNING *`;
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
    



   
   

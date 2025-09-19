const pgp = require('pg-promise')({capSQL: true});
const db = require('../../db'); 


module.exports = class ProductModel {
  
async findProducts(product = {}) {
 try {
  const statement = `SELECT * FROM product`;
  const values = [product];
  const results = db.query(statement, values);
  
  if(results.rows?.length) {
     return results.rows[0];
  }
  return null; 
 } catch(err) {
   throw new Error(err);
 }
}


async findProductById(id) {
 try {
  const statement = `SELECT * FROM product WHERE id = $1`;
  const values = [id];
  const results = db.query(statement);
  
  if(results.rows?.length) {
    return results.rows[0];
  }
   return null;
  } catch(err) {
   throw new Error(err);
  };
 }

}


	

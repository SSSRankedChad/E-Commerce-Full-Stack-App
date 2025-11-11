const pgp = require('pg-promise')({capSQL: true});
const db = require('../../db'); 


module.exports = class ProductModel { 
  
  async findProducts(products = []) {
   try {
    const statement = `SELECT * FROM products`;
    const results = await db.query(statement);
  
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
     const statement = `SELECT * FROM products WHERE id = $1`;
     const values = [id];
     const results = await db.query(statement, values);
  
     if(results.rows?.length) {
      return results.rows[0];
     }
     return null;
   }  catch(err) {
     throw new Error(err);
   };
  }

}
	

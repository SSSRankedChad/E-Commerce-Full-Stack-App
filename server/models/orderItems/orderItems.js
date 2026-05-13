const db = require('../../db');
const pgp = require('pg-promise')({capSQL: true});
const moment = require('moment');


module.exports = class orderItemModel {
   constructor(data = {}) {
    this.created = data.created || moment.utc().toString();
    this.modified = moment.utc().toString();
    this.qty = data.qty || 1;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price || 0;
    this.productId = data.id;
    this.orderId = data.orderid || null;
 } 
 async create(data) {
   try {
    const statement = pgp.helpers.insert(data, null, 'orderitems') + 'RETURNING *';
    const results = await db.query(statement);
    if(results.rows?.length) {
	    return results.rows[0];
    }
   return null;
  } catch(err) {
    throw new Error(err);
  }
}

 async findOrderById(orderid) {
  try {
  const statement = `SELECT oi.qty,
	                   oi.id AS "cartitemid",
		                 p.* FROM "orderitems" oi
		                 INNER JOIN products p ON p.id = oi."productid"
		                 WHERE "orderid" = $1 `;
   const values = [orderid];
   const results = await db.query(statement, values);
   if(results.rows?.length) {
    return results.rows;
   }
   return [];
   } catch(err) {
   throw new Error(err);
  }
 }

}

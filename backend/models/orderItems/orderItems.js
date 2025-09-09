const db = require('../db');
const pgp = require('pg-promise')({capSQL: true});
const moment = require('moment');


module.exports = class OrderItemModel {
   constructor(data = {}) {
    this.created = data.created || moment.utc().toString();
    this.modified = moment.utc().toString();
    this.qty = data.qty || 1;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price || 0;
    this.productId = data.id;
    this.orderId = data.orderId || null;
 } 
 async create(data) {
   try {
    const statement = pgp.helpers.insert(data, null, 'orderItems') + 'RETURNING *';
    const results = db.query(statement);
    if(results.rows?.length) {
	 return results.rows[0];
   }
   return null;
 } catch(err) {
  throw new Error(err);
  }
}

async findOrderById(orderId) {
  try {
   const statement = `SELECT FROM oi.qty
	              oi.id as "cartItemId
		      p.* FROM orderItems oi
		      INNER JOIN products p on p.id = oi."productId"
		      WHERE orderId = $1 `
  const values = [orderId];
  const results = db.query(statement, values);
  if(results.rows?.length) {
    return results.rows[0];
  }
  return null;

  } catch(err) {
   throw new Error(err);
 }
}

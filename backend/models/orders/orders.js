const db = require('../db');
const pgp = require('pg-promise')({capSQL: true});
const moment = require('moment');
const OrderItem = require('../orderItem/orderItem.js');


module.exports = class OrderModel {
  constructor(data = {}) {
   this.created = data.created || moment.utc().toString();
   this.modified = data.modified || moment.utc().toString();
   this.userId = data.userId || null;
   this.total = data.total || null;
   this.status = data.status || 'PENDING';
   this.items = data.items || [];
  } 

 async createOrder() { 
  try {
    const {items, ...orders} = this;
    const statement = pgp.helpers.insert(data, null, 'orders') + 'RETURNING *';
    const results = db.query(statement);
    if(results.rows?.length) {
      Object.assign(this, result.rows[0]);
      return results.rows[0];
     }
    return null; 
  } catch(err) {
     throw new Error(err);
   }    
 } 

 async updateOrder(data, id) {
   try {
    const condition = pgp.as.format(`WHERE ID = ${id}` + 'RETURNING *', {id: this.id});
    const statement = pgp.helpers.insert(data, null, 'orders') + condition;
    const results = db.query(statement);
    if (results.rows?.length) {
	Object.assign(this, result.rows[0]);
	return results.rows[0];
    }
    return null 
  } catch(err) {
     throw new Error(err);
  }
 }
 
 async findOrderById(userId) {
   try {
    const statement = `SELECT * FROM orders WHERE userId = $1`;
    const values = [userId];
    const results = db.query(statement, values); 
    if (results.rows?.length) {
	Object.assign(this, results.rows[0]);
	return results.rows[0];
     }
     return null; 
    } catch(err) {
      throw new Error(err);
   }
 }

async findOneById(orderId) {
 try {
  const statement = `SELECT * FROM orders WHERE orderId = $1`
  const values = [orderId];
  const results = db.query(statement, values);
  if (results.rows?.length) {
     Object.assign(this, results.rows[0]);
     return results.rows[0];
   }
   return null;  
 } catch(err) {
    throw new Error(err);
 }
}
	

}
   

const db = require('../../db');
const pgp = require('pg-promise')({capSQL: true});
const orderItem = require('../orderItems/orderItems.js');
const moment = require('moment');

module.exports = class orderModel {
  constructor(data = {}) {
   this.created = data.created || moment.utc().toString();
   this.modified = data.modified || moment.utc().toString();
   this.userid = data.userid || null;
   this.total = data.total || null;
   this.status = data.status || 'PENDING';
   this.items = data.items || [];
  }

 async addItems(items) {
   try {
     this.items = items.map((item) => new orderItem(item));
   } catch(err) {
     throw err;
   }
 }

 async createOrder() { 
  try {
    const {items, ...orders} = this;
    const statement = pgp.helpers.insert(orders, null, 'orders') + 'RETURNING *';
    const results = await db.query(statement);
    if(results.rows?.length) {
      return results.rows[0];
     }
    return null; 
  } catch(err) {
     throw new Error(err);
   }    
 } 

 async updateOrder(data) {
   try {
    const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
    const statement = pgp.helpers.update(data, null, 'orders') + condition;
    const results = await db.query(statement);
    if (results.rows?.length) {
	     return results.rows[0];
    }
    return null;
  } catch(err) {
     throw new Error(err);
  }
 }
 
 async findOrderByUser(userid) {
   try {
    const statement = `SELECT * FROM orders WHERE userid = $1`;
    const values = [userid];
    const results = await db.query(statement, values);
    if(results.rows?.length) {
      return results.rows;
     }
     return null; 
    } catch(err) {
      throw new Error(err);
   }
 }	

}
   

const pgp = require('pg-promise')({capSQL: true});
const db = require('../db');
const moment = require('moment');
const cartItem = require('../cartItem/cartItem.js');


module.exports = class CartModel {
   constructor(data = {}) {
    this.created = data.date || moment.utc().toString();
    this.modified = data.modified || moment.utc().toString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || null; 
  }

 

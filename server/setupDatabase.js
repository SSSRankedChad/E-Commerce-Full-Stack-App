const { Client } = require('pg');
const { DB } = require('./config.js');

(async() => {
  
 const usersTableStmt = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    email varchar(50),
    password TEXT,
    firstname varchar(50),
    lastname varchar(50),
    google JSON,
    facebook JSON
 );
`

const productsTableStmt = `
  CREATE TABLE IF NOT EXISTS products (
   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
   name varchar(50) NOT NULL,
   price INT NOT NULL, 
   description varchar(50) NOT NULL,
   category varchar(50) NOT NULL 
 );
`

const ordersTableStmt = `
  CREATE TABLE IF NOT EXISTS orders (
   id iNT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
   created DATE NOT NULL,
   total INT NOT NULL,
   modified DATE NOT NULL,
   status varchar(50) NOT NULL,
   userId INT NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id)
 );
`


const orderItemsTableStmt = ` 
  CREATE TABLE IF NOT EXISTS orderItems (
    id iNT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    created DATE NOT NULL,
    qty INT NOT NULL,
    orderId INT NOT NULL,
    description varchar(50) NOT NULL,
    price INT NOT NULL,
    name TEXT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id)
 );
`

const cartsTableStmt = ` 
   CREATE TABLE IF NOT EXISTS carts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NUll,
    userId INT NOT NULL,
    modified DATE NOT NULL,
    created DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
   );
`

const cartItemsTableStmt = `
  CREATE TABLE IF NOT EXISTS cartItems (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    qty INT NOT NULL,
    cartId INT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY (cartId) REFERENCES carts(id),
    FOREIGN KEY (productId) REFERENCES products(id)

  );
`

try {  
  const db = new Client({
     user: DB.PGUSER || "halim",
     password: DB.PGPASSWORD,
     host: DB.PGHOST,
     database: DB.PGDATABASE || "codecademy",
     port: DB.PGPORT,
  });

   await db.connect();

   await db.query(usersTableStmt);
   await db.query(productsTableStmt);
   await db.query(ordersTableStmt);
   await db.query(orderItemsTableStmt);
   await db.query(cartsTableStmt);
   await db.query(cartItemsTableStmt);
   
   await db.end();

} catch(err) {
  console.log("Error creating one or more tables: ", err);
 }
})();
  

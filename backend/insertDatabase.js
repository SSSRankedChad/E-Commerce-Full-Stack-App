const Client = require('pg');
const { DB } = require('./config.js');

(async() => {
  const productInsertStmt = `
    INSERT INTO products (id, sell_price, category, description, name) VALUES ('384920', '10', 'Clothing', 'Plain Cotton Blue T-Shirt', 'Blue T-Shirt');
    INSERT INTO products (id, sell_ price, category, description, name) VALUES ('487156', '12', 'Accessories', 'Chained Necklace', 'Gold Chain Necklace');
    INSERT INTO products (id, sell_price, category, description, name) VALUES ('630198', '7', 'Accessories', 'Pink Candle For Desk', 'Pink Desk Candle');
    INSERT INTO products (id, sell_price, category, description, name) VALUES ('819203', '20', 'Accessories', 'Black Handbag', 'Black Travel Handbag');`

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      port: DB.PGPORT,
      password: DB.PGPASSWORD,
    });


    await db.connect();
    await db.query(productInsertStmt);
    await db.end();
  } catch(err) {
    console.log('Error processing query', err);
  }
});

const Client = require('pg');
const { DB } = require('./config.js');

(async() => {

  const productInsertStmt = `
    INSERT INTO products (sell_price, url, category, description, name) VALUES ('10','../src/public/resources/blue-t-shirt.jpg', 'Clothing', 'Plain Cotton Blue T-Shirt', 'Blue T-Shirt');
    INSERT INTO products (sell_price, url, category, description, name) VALUES ('12','../src/public/resources/gold-zipper-on-black-fashion-backpack.jpg', 'Accessories', 'Chained Necklace', 'Gold Chain Necklace');
    INSERT INTO products (sell_price, url, category, description, name) VALUES ('7','../src/public/resources/stacked-bracelets.jpg', 'Accessories', 'Bracelets', 'Stacked Bracelets');
    INSERT INTO products (sell_price, url, category, description, name) VALUES ('20','../src/public/resources/black-bag-over-the-shoulder.jpg', 'Accessories', 'Black Handbag', 'Black Travel Handbag');`

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

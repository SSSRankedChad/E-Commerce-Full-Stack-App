const { Pool } = require('pg');
const { DB } = require('../config.js');



const pool = new Pool({
   user: DB.PGUSER,
   password: DB.PGPASSWORD,
   host: DB.PGHOST,
   port: DB.PGPORT,
   database: DB.PGDATABASE,
});

module.exports = {
 query: (text, params) => pool.query(text, params)
}

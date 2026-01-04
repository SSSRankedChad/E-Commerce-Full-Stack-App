const { Pool } = require('pg');
const { DB } = require('../config.js');



const pool = new Pool({
   USER: DB.PGUSER,
   PASSWORD: DB.PGPASSWORD,
   HOST: DB.PGHOST,
   PORT: DB.PGPORT,
   DATABASE: DB.PGDATABASE,
});


module.exports = {
 query: (text, params) => pool.query(text, params)
}

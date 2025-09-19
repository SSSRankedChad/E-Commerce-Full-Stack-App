const { Pool } = require('pg');
const { DB } = require('../config.js');



const pool = new Pool({
   USER: DB.USER,
   PASSWORD: DB.PASSWORD,
   HOST: DB.HOST,
   PORT: DB.PORT,
   DATABASE: DB.PORT,
   SESSION_SECRET: DB.SESSION_SECRET
});


module.exports = {
 query: (text, params) => pool.query(text, params)
}

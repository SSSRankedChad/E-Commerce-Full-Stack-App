const dotenv = require('dotenv');

const path = require('path');

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

module.exports = {
  PORT: process.env.PORT || 5000,
  DB: {
   PGHOST: process.env.PGHOST,
   PGUSER: process.env.PGUSER,
   PGPASSWORD: process.env.PGPASSWORD,
   PGPORT: process.env.PGPORT,
   PGDATABASE: process.env.PGDATABASE
  }, 
  SESSION_SECRET: process.env.SESSION_SECRET
 };



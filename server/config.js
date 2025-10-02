const dotenv = require('dotenv');

dotenv.config();


module.exports = {
  PORT: process.env.PORT || 5000,
  DB: {
   PGHOST: process.env.PGHOST,
   PGUSER: process.env.PGUSER,
   PGPASSWORD: process.env.PGPASSWORD,
   PGPORT: process.env.PGPORT,
  }, 
  SESSION_SECRET: process.env.SESSION_SECRET
 };



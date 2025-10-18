const dotenv = require('dotenv');

dotenv.config();


module.exports = {
  PORT: process.env.PORT || 5000,
  DB: {
   PGHOST: process.env.PGHOST || "localhost",
   PGUSER: process.env.PGUSER || "whales",
   PGPASSWORD: process.env.PGPASSWORD || "shodan",
   PGPORT: process.env.PGPORT || 5432,
  }, 
  SESSION_SECRET: process.env.SESSION_SECRET
 };



const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const SESSION_SECRET = require('../config.env');


module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended: true});

  app.use(
    session({
      session: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
	secure: false,
	maxAge: 24 * 24 * 60 * 1200,
	}
     }));
    
   return app;

};

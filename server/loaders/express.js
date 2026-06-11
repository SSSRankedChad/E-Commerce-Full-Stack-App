const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { SESSION_SECRET } = require('../config.js');


module.exports = (app) => {
  app.use(cors({
    origin:"https://e-commerce-full-stack-app.netlify.app/" ,
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.set('trust proxy', 1); 

  app.use(
    session({
      name: "express-session",
      secret: SESSION_SECRET || "session_secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
	      secure: false,
	      httpOnly: true,
        sameSite: 'lax',
	    }
  }));
    
  return app;

};

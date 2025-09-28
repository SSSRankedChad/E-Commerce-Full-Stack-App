const express = require('express');
const app = express();
const loaders = require('./loaders');
const { PORT }= require('./config');
import * as passport from 'passport';
import apiRouter from './routes/index.js';

async function startServer() {

  try {

    apiRouter(app, passport);

    loaders(app);

    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
    
  } catch(err) {
    console.log("Error starting server", err);
 } 
}

startServer();

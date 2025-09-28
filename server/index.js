const express = require('express');
const app = express();
const loaders = require('./loaders');
const { PORT }= require('./config');

async function startServer() {

  try {

    loaders(app);

    app.use((req, res, next) => {
      console.log(`${req.method}${req.url}`);
      next();
    });

    app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
    });

    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
    
  } catch(err) {
    console.log("Error starting server", err);
 } 
}

startServer();

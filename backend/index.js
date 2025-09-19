const express = require('express');
const app = express();
const loaders = require('./loaders');
const { PORT }= require('./config');

async function startServer() {

  try { 

    await loaders(app);

    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
    
  } catch(err) {
    console.log("Error starting server", err);
 } 
}

startServer();

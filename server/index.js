const express = require('express');
const app = express();
const loaders = require('./loaders');

async function startServer() {

  try {

    loaders(app);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Listening on PORT ${PORT}`);
    });
    
  } catch(err) {
    console.log("Error starting server", err);
 } 
}

startServer();

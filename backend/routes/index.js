const express = require('express');
const router = express.Router();
const userRouter = require('./userRoute.js');
const productRouter = require('./productRoute.js');
const orderRouter = require('./orderRoute.js');
const cartRouter = require('./cartRoute.js');
const authRouter = require('./AuthRoute.js');



module.exports = (app) => {
  app.use(userRouter(app))
  app.use(productRouter(app))
  app.use(orderRouter(app)); 
  app.use(cartRouter(app));
  app.use(authRouter(app));
}

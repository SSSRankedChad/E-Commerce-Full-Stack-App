const express = require('express');
const passport = require('passport');
const router = express.Router();
const userRouter = require('./userRoute.js');
const productRouter = require('./productRoute.js');
const orderRouter = require('./orderRoute.js');
const cartRouter = require('./cartRoute.js');
const authRouter = require('./AuthRoute.js');



module.exports = (app) => {
  userRouter(app);
  productRouter(app);
  orderRouter(app);
  cartRouter(app);
  authRouter(app, passport);
}

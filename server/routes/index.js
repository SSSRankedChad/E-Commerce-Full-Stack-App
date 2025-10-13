const userRouter = require('./userRoute.js');
const productRouter = require('./productRoute.js');
const orderRouter = require('./orderRoute.js');
const cartRouter = require('./cartRoute.js');
const authRouter = require('./authRoute.js');

module.exports = (app, passport) => {
  userRouter(app);
  productRouter(app);
  orderRouter(app);
  cartRouter(app);
  authRouter(app, passport);
}

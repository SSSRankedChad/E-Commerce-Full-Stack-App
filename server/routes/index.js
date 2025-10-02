const userRouter = require('./userRoute.js');
const productRouter = require('./productRoute.js');
const orderRouter = require('./orderRoute.js');
const cartRouter = require('./cartRoute.js');
const authRouter = require('./authRoute.js');

module.exports = (app, passport) => {
  console.log("Loading routes......");
  console.log('Passport object: ', passport ? 'exists' : 'missing');
  
  userRouter(app);
  productRouter(app);
  orderRouter(app);
  cartRouter(app);
  authRouter(app, passport);
}

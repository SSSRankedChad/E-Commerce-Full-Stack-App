const passportLoader = require('./passport.js');
const expressLoader = require('./express.js');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger.js');

module.exports = async(app) => {
 
 const expressApp = await expressLoader(app);

 const passport = await passportLoader(expressApp);

 await swaggerLoader(app);
 
 await routeLoader(app, passport);

 
 app.use((err, req, res, next) => {
  const {message, status} = err;
  return res.status(status || 500).send({ message });
 });

}

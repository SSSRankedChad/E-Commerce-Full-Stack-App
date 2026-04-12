const passportLoader = require('./passport.js');
const expressLoader = require('./express.js');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger.js');

module.exports = async(app) => {
 
 expressLoader(app);

 const passport = passportLoader(app);

 swaggerLoader(app);
 
 routeLoader(app, passport);

 
 app.use((err, req, res, next) => {
  const {message, status} = err;
  return res.status(status || 500).send({ message });
 });

}

const passportLoader = require('./passport.js');
const expressLoader = require('./express.js');
const routeLoader = require('../routes');

module.exports = async(app) => {
 
 const expressApp = await expressLoader(app);

 const passport = await passportLoader(expressApp);
 
 await routeLoader(app, passport);

 
 app.use((err, req, res, next) => {
  const {message, status} = err;
  return res.status(status).send( {message });
 });

}

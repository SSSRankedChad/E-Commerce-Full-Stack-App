const passportLoader = require('./passport');
const expressLoader = require('./express');
const routeLoader = require('../routes');

module.exports = async(app) => {
 
 const expressApp = await expressLoader(app);
 const passportApp = await passportLoader(app); 
 
 await routeLoader(app, passport);

 
 app.use({err, req, res, next} => {
  const {message, status} = err;
  res.status({status}).send({message});
 });

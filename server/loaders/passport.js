const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const authService = require('../services/authService');
const authServiceInstance = new authService();


module.exports = (app) => {
 app.use(passport.initialize());
 app.use(passport.session());


 passport.serializeUser((user, done) => {
   done(null, user.id)
 });
 
 passport.deserializeUser(async(id, done) => {
  try {
   const user = await authServiceInstance.findUserById(id);
   if(!user) {
    return done(null, false);
   } 
   return done(null, user);
  } catch(err) {
    return done(err);
  }
 });


passport.use(new LocalStrategy( 
 async(username, password, done) => {
  try {
   const user = await authServiceInstance.login({email: username, password});

   const isValidPassword = await bcrypt.compare(password, user.password);

   if(!isValidPassword) {
      return done(null, false, { message: "Password does not match!"});
    }
   return done(null, user);
  } catch(err) {
   return done(err);
  }
}
));


return passport;

}


   

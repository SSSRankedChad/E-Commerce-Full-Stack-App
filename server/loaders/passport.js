const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const authService = require('../services/authService');
const authServiceInstance = new authService();


module.exports = (app) => {
 app.use(passport.initialize());
 app.use(passport.session());


 passport.serializeUser((user, done) => {
   done(null, user.id);
 });
 
 passport.deserializeUser((id, done) => {
   done(null, { id });
 });


passport.use(new LocalStrategy(
 {
   usernameField: 'email',
   passwordField: 'password',
 },
 async(email, password, done) => {
  try {
    const user = await authServiceInstance.login({email});
    console.log(user);

    if(!user) {
      return done(null, false, { message: "User does not exist!" });
    }

    if(user.password !== password) {
      return done(null, false, { message: "Password does not match" });
    }

    return done(null, user);
  } catch(err) {
   return done(err);
  }
 }
));


return passport;

}


   

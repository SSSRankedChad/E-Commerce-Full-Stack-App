const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authService = require('../services/authService');
const authServiceInstance = new authService();
const userService = require('../services/userService.js');
const userServiceInstance = new userService();


module.exports = (app) => {
 app.use(passport.initialize());
 app.use(passport.session());


 passport.serializeUser((user, done) => {
   done(null, user.id);
 });
 
 passport.deserializeUser(async (id, done) => {
   try { 
     const user = await userServiceInstance.get({id});
     done(null, user);
   } catch(err) {
     done(err);
   }
 });


passport.use(new LocalStrategy(
 {
   usernameField: 'email',
   passwordField: 'password',
 },
 async(email, password, done) => {
  try {
    const user = await authServiceInstance.login({email});

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


   

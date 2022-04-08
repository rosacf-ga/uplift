const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    // a user has logged in via OAuth!
    console.log(profile)
    User.findOne({googleId: profile.id}, function(err, user) {
      if(user) return done(null, user); //will return user
      if(err) return done(err); 
      //if user undefined, we want to create a user
      User.create({
        //values on the right come from profile object (logged on line 14)
        name: profile.displayName, 
        googleId: profile.id, 
        email: profile.emails[0].value, 
        avatar: profile.photos[0].value
      }, function(err, createdUser){
          if(createdUser) return done(null, createdUser);
          if(err) return done(err);
      })
    })
  })
  );

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  User.findById(id, function(err, user){
    if(err) return done(err);
    done(null, user);
  })
});




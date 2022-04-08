const express = require('express');
const router = express.Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  //will redirect localhost:3000 to localhost:3000/programs
  res.render('index', {title: 'Uplift'})
});

// Google OAuth login route
//takes client to 3rd party login screen
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/programs', // where you want the client to go after you login 
    failureRedirect : '/' // where you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;

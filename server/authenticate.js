var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User   = require('./api/users/user.model');
var config = require('./config/environment');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthId: profile.id }, function(err, user) {
      if(err) {
        console.log(err); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
            username: profile.displayName
        });
        if (profile.name.familyName) {
            user.lastname = profile.name.familyName;
        }
        if (profile.name.givenName) {
            user.firstname = profile.name.givenName;
        }
        user.oauthId = profile.id;
        user.oauthToken = accessToken;
        user.save(function(err) {
          if(err) {
            console.log(err); // handle errors!
          } else {
            done(null, user);
          }
        });
      }
    });
  }
));
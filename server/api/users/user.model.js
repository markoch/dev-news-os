'use strict';

var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var authTypes = ['facebook'];

var User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    password: String,
    oauthId: String,
    oauthToken: String,
    provider: {
        type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function() {
    return (this.username);
};

/**
 * Validations
 */

// Validate empty email
User
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) {return true;}
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
User
.path('password')
.validate(function(password) {
  if (authTypes.indexOf(this.provider) !== -1) {return true;}
  return password.length;
}, 'Password cannot be blank');

// Validate email is not taken
// User
//   .path('email')
//   .validate(function(value, respond) {
//     var self = this;
//     this.constructor.findOne({email: value}, function(err, user) {
//       if(err) {throw err;}
//       if(user) {
//         if(self.id === user.id) {return respond(true);}
//         return respond(false);
//       }
//       respond(true);
//     });
// }, 'The specified email address is already in use.');

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

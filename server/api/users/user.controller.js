var passport = require('passport');
var User     = require('./user.model');
var Verify   = require('../verify');

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.index = function(req, res) {
  User.find({}, function (err, user) {
      if(err) { return handleError(res, err); }
      res.json(user);
  });
};

exports.register = function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if(err) { return handleError(res, err); }
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        user.save(function(err) {
            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
};

exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if(err) { return handleError(res, err); }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token,
        admin: user.admin
      });
    });
  })(req,res);
};

exports.logout = function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
};

exports.facebook = function() {
};

exports.facebookCallback = function(req, res) {
  passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
 }, function(err, user, info) {
    if(err) { return handleError(res, err); }
    if (!user) {
        return res.status(401).json({
            err: info
        });
    }

    req.logIn(user, function(err) {
        if (err) {
            return res.status(500).json({
                err: 'Could not log in user'
            });
        }
        var token = Verify.getToken(user);
        // res.status(200).json({
        //     status: 'Login successful!',
        //     success: true,
        //     token: token,
        //     username: user.username
        // });
        //http://stackoverflow.com/questions/11758079/how-to-get-the-url-parameters-using-angular-js
        //use Hashbang mode to be compatible with older browsers
        //https://docs.angularjs.org/guide/$location
        var newLocation = '/#!/?';
        newLocation += 'success=true&';
        newLocation += 'token=' + token + '&';
        newLocation += 'admin=' + user.admin + '&';
        newLocation += 'username=' + user.username;

        res.writeHead(302, {'Location': newLocation});
        res.end();
    });
  })(req,res);
};

var _ = require('lodash');

var all = {
    // define nodejs runtime environment
    server: {
        port :      process.env.OPENSHIFT_NODEJS_PORT || 8080,
        host :      process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
        staticDir : '/../../dist'
    },

    //secret encryption key
    secretKey: process.env.PP_SECRET_KEY,

    //Facebook oauth implementation
    facebook: {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SEC,
        callbackURL:  (process.env.DOMAIN || '') + '/api/v1/users/facebook/callback'
    },

    // MongoDB connection options
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },
    
    // Should we populate the DB with sample data?
    seedDB: false
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

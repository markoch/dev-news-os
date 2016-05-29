
var all = {
    // define openshift runtime environment
    server: {
        port : process.env.OPENSHIFT_NODEJS_PORT || 8080,
        host : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
    },

    //secret encryption key
    secretKey: process.env.PP_SECRET_KEY,

    //Facebook oauth implementation
    facebook: {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SEC,
        callbackURL: 'http://www.javascript-news.org/api/v1/users/facebook/callback'
    },

    // default to a 'localhost' mongodb configuration:
    mongodb: {
        uri: 'mongodb://localhost/devnews-dev'
    },

    // Should we populate the DB with sample data?
    seedDB: false
};

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.MONGOLAB_URI) {
    all.mongodb.uri = process.env.MONGOLAB_URI;
} else if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    all.mongodb.uri = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

module.exports = all;

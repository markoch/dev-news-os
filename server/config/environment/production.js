'use strict';

// Production specific configuration
// ==================================
var production = {
    server: {
        staticDir : '/../../dist'
    },

    // MongoDB connection options
    mongodb: {
        uri: 'mongodb://localhost/devnews-dev'
    },

    seedDB: false
};

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.MONGOLAB_URI) {
    production.mongodb.uri = process.env.MONGOLAB_URI;
} else if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    production.mongodb.uri = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

module.exports = production;

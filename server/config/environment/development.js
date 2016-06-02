'use strict';

// Development specific configuration
// ==================================
module.exports = {
    server: {
        staticDir : '/../../app'
    },

    // MongoDB connection options
    mongodb: {
        uri: 'mongodb://localhost/devnews-dev'
    },

    seedDB: true
};

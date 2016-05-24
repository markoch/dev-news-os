
var all = {
    // define openshift runtime environment
    server: {
        port : process.env.OPENSHIFT_NODEJS_PORT || 8080,
        host : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
    },

    // define mongodb runtime environment
    mongodb: {
        uri :   process.env.MONGOLAB_URI ||
                process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
                'mongodb://localhost/devnews-dev'
    },

    // Should we populate the DB with sample data?
    seedDB: false
};

// default to a 'localhost' configuration:
all.mongodb = {
    uri: 'mongodb://localhost/devnews-dev'
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

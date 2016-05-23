
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
                'mongodb://localhost/jsnews-dev'
    },

    // Should we populate the DB with sample data?
    seedDB: false,
};

module.exports = all;

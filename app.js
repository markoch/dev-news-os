/*eslint-env node*/

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express      = require('express');
var mongoose     = require('mongoose');
var config       = require('./server/config/environment');

//connect to the database
mongoose.connect(config.mongodb.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
    }
);

// Populate DB with sample data
if(config.seedDB) { require('./server/config/seed.js'); }

// create a new express server
var app = express();
var server = require('http').createServer(app);
require('./server/config/express')(app);
require('./server/authenticate.js');
require('./server/routes')(app);

// Start server on the specified port and binding host
server.listen(config.server.port, config.server.host, function () {
  console.log(`Application worker ${process.pid} started`);
  console.log( 'Server listening on ' + config.server.host + ', server_port ' + config.server.port + ' in ' + process.env.NODE_ENV + ' mode');
});

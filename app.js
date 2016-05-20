/*eslint-env node*/

var express     = require('express');

// define openshift runtime environment
var server_port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// create a new express server
var app = express();
require('./server/config/express')(app);
require('./server/routes')(app);

// Start server on the specified port and binding host
app.listen(server_port, server_ip_address, function () {
  console.log( 'Listening on ' + server_ip_address + ', server_port ' + server_port + ' in mode ' + process.env.NODE_ENV);
});

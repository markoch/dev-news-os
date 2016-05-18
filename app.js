/*eslint-env node*/

var express     = require('express');

// define openshift runtime environment
var server_port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// create a new express server
var app = express();
//require('./server/config/express')(app);
//require('./server/routes')(app);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/dist'));

// start server on the specified port and binding host
app.listen(server_port, server_ip_address, function () {
  // print a message when the server starts listening
  console.log( 'Listening on ' + server_ip_address + ', server_port ' + server_port );
});

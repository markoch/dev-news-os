'use strict';

var express     = require('express');
var morgan      = require('morgan');
var compression = require('compression');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());

    // serve the files out of ./dist as our main files
    app.use(express.static(__dirname + '/../../dist'));

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
    }
};

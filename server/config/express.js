'use strict';

var express     = require('express');
var morgan      = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // serve the files out of ./dist as our main files
    app.use(express.static(__dirname + '/../../dist'));

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
    }
};

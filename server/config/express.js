'use strict';

var express      = require('express');
var morgan       = require('morgan');
var compression  = require('compression');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var cors         = require('cors');
var passport     = require('passport');

module.exports = function(app) {
    var env = app.get('env');
    
    app.use(cors());
    app.options('*', cors());
    app.use(compression());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // passport config
    app.use(passport.initialize());
    app.use(passport.session());

    // serve the files out of ./dist as our main files
    app.use(express.static(__dirname + '/../../dist', { maxAge: '1d' }));

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
    }
};

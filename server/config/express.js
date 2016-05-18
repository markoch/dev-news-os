'use strict';

var morgan      = require('morgan');
var compression = require('compression');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
    }
};

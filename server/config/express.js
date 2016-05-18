'use strict';

var compression = require('compression');

module.exports = function(app) {
    app.use(compression());
};

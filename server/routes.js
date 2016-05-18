'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/foo', require('./api/articles'));

};

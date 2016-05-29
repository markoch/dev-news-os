'use strict';

module.exports = function(app) {

    app.use('/api/v1/articles', require('./api/articles'));
    app.use('/api/v1/headlines', require('./api/headlines'));
    app.use('/api/v1/podcasts', require('./api/podcasts'));
    app.use('/api/v1/videos', require('./api/videos'));
    app.use('/api/v1/users', require('./api/users'));

};

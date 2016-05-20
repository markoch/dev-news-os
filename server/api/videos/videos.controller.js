/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Videos = require('./videos.model');

// Get list of things
exports.index = function(req, res) {
    var videos = [
   {
        'title': 'The Better Parts - Forward 2 Web Summit',
        'author': 'Douglas Crockford',
        'acronym': 'DC',
        'publish': 'October 15, 2015',
        'summary': '',
        'content': '',
        'url': 'https://www.youtube.com/watch?v=rhV6hlL_wMc',
        'dataURL': 'https://www.youtube-nocookie.com/v/rhV6hlL_wMc?rel=0',
        'tags': 'Teams',
        'counter': 1,
        'likes': 0,
        'label': '',
        'image': '',
        'isHeadline': false
    },
    {
        'title': 'Classical Inheritance is Obsolete: How to Think in Prototypal OO',
        'author': 'Eric Elliott',
        'acronym': 'EE',
        'publish': 'June 30, 2013',
        'summary': '',
        'content': '',
        'url': 'https://www.youtube.com/watch?v=lKCCZTUx0sI',
        'dataURL': 'https://www.youtube-nocookie.com/v/lKCCZTUx0sI?rel=0',
        'tags': 'OO',
        'counter': 1,
        'likes': 0,
        'label': '',
        'image': '',
        'isHeadline': false
    }
    ];

    return res.status(200).json(videos);
};
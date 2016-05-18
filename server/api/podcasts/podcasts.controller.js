/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Podcasts = require('./podcasts.model');

// Get list of things
exports.index = function(req, res) {
    var podcasts = [
    {
        'title': 'Interview with Eric Elliott: On JavaScript, Writing, and Creating High Velocity Development Teams',
        'author': 'Eric Elliott',
        'acronym': 'EE',
        'publish': 'September 14, 2015',
        'summary': '',
        'content': '',
        'url': 'http://spec.fm/podcasts/developer-tea/17181',
        'dataURL': 'http://audio.simplecast.com/17181.mp3',
        'tags': 'Teams',
        'category': 'podcast',
        'counter': 1,
        'likes': 0,
        'label': '',
        'image': '',
        'isHeadline': false
    },
    {
        'title': 'Refactoring Based on Code Responsibility',
        'author': 'DeveloperTea',
        'acronym': 'DT',
        'publish': 'April 20, 2016',
        'summary': '',
        'content': '',
        'url': 'http://spec.fm/podcasts/developer-tea/35739',
        'dataURL': 'http://audio.simplecast.com/35739.mp3',
        'tags': 'Refactoring',
        'category': 'podcast',
        'counter': 2,
        'likes': 0,
        'label': '',
        'image': '',
        'isHeadline': false
    },
    {
        'title': 'The 80/20 Guide to ES2015 Generators',
        'author': 'Valeri Karpov',
        'acronym': 'VK',
        'publish': 'May 4, 2016',
        'summary': '',
        'content': '',
        'url': 'https://www.acast.com/javascriptjabber/210-jsj-the-80-20-guide-to-es2015-generators-with-valeri-karpov',
        'dataURL': 'https://media.devchat.tv/js-jabber/JSJ210Generators.mp3?rss=true?player=true',
        'tags': '',
        'category': 'podcast',
        'counter': 2,
        'likes': 0,
        'label': '',
        'image': '',
        'isHeadline': false
    }
    ];

    return res.status(200).json(podcasts);
};
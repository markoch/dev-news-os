/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Headlines = require('./headlines.model');

// Get list of things
exports.index = function(req, res) {
    var headlines = [
    {
        'title': 'Let’s Learn JavaScript Closures',
        'author': 'Preethi Kasireddy',
        'acronym': 'PK',
        'publish': 'April 29, 2016',
        'summary': 'Closures are a fundamental JavaScript concept that every serious programmer should know inside-out. The Internet is packed with great explanations of “what” closures are, but few deep-dives into the “why” side of things.',
        'content': '',
        'url': 'https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.iuentq5bj',
        'tags': 'Closures',
        'category': 'article',
        'counter': 4,
        'likes': 0,
        'label': '',
        'image': 'fa-history',
        'isHeadline': true
    },
    {
        'title': 'The Most Useful Free eBooks for Web Developers',
        'author': 'Mybridge',
        'acronym': 'M',
        'publish': 'April 28, 2016',
        'summary': 'This is a collection of free ebooks for the front-end developers about JavaScript, ES6, NodeJS, CSS3 and HTML5.',
        'content': '',
        'url': 'https://medium.mybridge.co/the-most-useful-free-ebooks-for-web-developers-3854767ee52f#.3e3pup2cj',
        'tags': 'References',
        'category': 'article',
        'counter': 5,
        'likes': 0,
        'label': '',
        'image': 'fa-book',
        'isHeadline': true
    },
    {
        'title': '10 Most Recommended JavaScript Scene Articles of 2015',
        'author': 'Eric Elliott',
        'acronym': 'EE',
        'publish': 'Jan 2, 2016',
        'summary': '2015 was our first full year serving the JavaScript community, and I’m very happy with the response. We started at zero in the middle of 2014. Today, thousands of readers share our articles every month.',
        'content': '',
        'url': 'https://medium.com/javascript-scene/10-most-recommended-javascript-scene-articles-of-2015-292be655d6cc#.ts904mzbb',
        'tags': 'References',
        'category': 'article',
        'counter': 6,
        'likes': 0,
        'label': '',
        'image': 'fa-users',
        'isHeadline': true
    }
    ];

    return res.status(200).json(headlines);
};
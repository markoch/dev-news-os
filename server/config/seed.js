/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Article = require('../api/articles/article.model');
var Podcast = require('../api/podcasts/podcast.model');
var Video   = require('../api/videos/video.model');
var Users   = require('../api/users/user.model');

Article.find({}).remove(function() {
    Article.create(
    {
        'title': 'Let’s Learn JavaScript Closures',
        'author': 'Preethi Kasireddy',
        'acronym': 'PK',
        'publish': 'April 29, 2016',
        'summary': 'Closures are a fundamental JavaScript concept that every serious programmer should know inside-out. The Internet is packed with great explanations of “what” closures are, but few deep-dives into the “why” side of things.',
        'content': '',
        'url': 'https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.iuentq5bj',
        'tags': 'Closures',
        'counter': 1,
        'likes': 1,
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
        'counter': 1,
        'likes': 1,
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
        'counter': 1,
        'likes': 1,
        'label': '',
        'image': 'fa-users',
        'isHeadline': true
    },
    {
        'title': 'How your Gruntfile.js should look like, the born of rapid Grunt',
        'author': 'Gyorgy Sagi',
        'acronym': 'GS',
        'publish': 'April 11, 2016',
        'summary': 'I have been using Grunt since almost two years, and it always saved me a lot of time. I use it especially for combining, minifying, compiling files, but also worked well for almost every frontend development purposes, when a task should ran repeatedly. That is why it is called as automated task runner.',
        'content': '',
        'url': 'http://blog.w5labs.com/how-your-gruntfile-should-look-like-the-born-of-rapid-grunt/',
        'tags': 'Task Runner',
        'counter': 1,
        'likes': 1,
        'label': '',
        'image': '',
        'isHeadline': false
    }
    );
});

Podcast.find({}).remove(function() {
    Podcast.create(
     {
        'title': 'Interview with Eric Elliott: On JavaScript, Writing, and Creating High Velocity Development Teams',
        'author': 'Eric Elliott',
        'acronym': 'EE',
        'publish': 'September 14, 2015',
        'publisher': 'DeveloperTea',
        'summary': '',
        'content': '',
        'url': 'http://spec.fm/podcasts/developer-tea/17181',
        'dataURL': 'http://audio.simplecast.com/17181.mp3',
        'publisherURL': 'http://spec.fm/podcasts/developer-tea',
        'tags': 'Teams',
        'counter': 1,
        'likes': 1,
        'label': '',
        'image': '',
        'isHeadline': false
    },
    {
        'title': 'Refactoring Based on Code Responsibility',
        'author': 'DeveloperTea',
        'acronym': 'DT',
        'publish': 'April 20, 2016',
        'publisher': 'DeveloperTea',
        'summary': '',
        'content': '',
        'url': 'http://spec.fm/podcasts/developer-tea/35739',
        'dataURL': 'http://audio.simplecast.com/35739.mp3',
        'publisherURL': 'http://spec.fm/podcasts/developer-tea',
        'tags': 'Refactoring',
        'counter': 1,
        'likes': 1,
        'label': '',
        'image': '',
        'isHeadline': false
    },
    {
        'title': 'The 80/20 Guide to ES2015 Generators',
        'author': 'Valeri Karpov',
        'acronym': 'VK',
        'publish': 'May 4, 2016',
        'publisher': 'JavaScript Jabber',
        'summary': '',
        'content': '',
        'url': 'https://www.acast.com/javascriptjabber/210-jsj-the-80-20-guide-to-es2015-generators-with-valeri-karpov',
        'dataURL': 'https://media.devchat.tv/js-jabber/JSJ210Generators.mp3?rss=true?player=true',
        'publisherURL': 'https://www.acast.com/javascriptjabber',
        'tags': '',
        'counter': 1,
        'likes': 1,
        'label': '',
        'image': '',
        'isHeadline': false
    }
    );
});

Video.find({}).remove(function() {
    Video.create(
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
        'likes': 1,
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
        'likes': 1,
        'label': '',
        'image': '',
        'isHeadline': false
    }
    );
});

Users.find({}).remove(function() {
});

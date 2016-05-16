'use strict';

angular.module('javascriptNews')
    .constant('baseURL', 'http://localhost:3000/')

    .service('indexFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getHeadlines = function() {
            return $resource(baseURL + 'headlines', null);
        };

        this.getBestArticles = function() {
            return $resource(baseURL + 'headlines', null);
        };

        this.getArticles = function() {
            return $resource(baseURL + 'articles', null);
        };

    }])

;

'use strict';

angular.module('javascriptNews')

    .service('indexFactory', ['$resource', function($resource) {

        this.getHeadlines = function() {
            return $resource('/api/v1/headlines', null);
        };

        this.getBestArticles = function() {
            return $resource('/api/v1/headlines', null);
        };

        this.getArticles = function() {
            return $resource('/api/v1/articles', null);
        };

        this.getPodcasts = function() {
            return $resource('/api/v1/podcasts', null);
        };

        this.getVideos = function() {
            return $resource('/api/v1/videos', null);
        };
    }])

;

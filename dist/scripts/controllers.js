'use strict';

angular
    .module('javascriptNews')
    .controller('IndexController', ['$scope', 'indexFactory', function($scope, indexFactory) {
        $scope.headlineMessage    = 'Loading ...';
        $scope.bestArticleMessage = 'Loading ...';
        $scope.articleMessage     = 'Loading ...';
        $scope.podcastMessage     = 'Loading ...';
        $scope.videoMessage       = 'Loading ...';

        $scope.showHeadline     = false;
        $scope.showBestArticles = false;
        $scope.showArticles     = false;
        $scope.showPodcasts     = false;
        $scope.showVideos       = false;

        $scope.headlines = indexFactory.getHeadlines().query(
            function(response){
                $scope.headlines = response;
                $scope.showHeadline = true;
            },
            function(response) {
                $scope.headlineMessage = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );

        $scope.bestArticles = indexFactory.getBestArticles().query(
            function(response){
                $scope.bestArticles = response;
                $scope.showBestArticles = true;
            },
            function(response) {
                $scope.bestArticleMessage = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );

        $scope.articles = indexFactory.getArticles().query(
            function(response){
                $scope.articles = response;
                $scope.showArticles = true;
            },
            function(response) {
                $scope.articleMessage = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );

        $scope.podcasts = indexFactory.getPodcasts().query(
            function(response){
                $scope.podcasts = response;
                $scope.showPodcasts = true;
            },
            function(response) {
                $scope.podcastMessage = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );

        $scope.videos = indexFactory.getVideos().query(
            function(response){
                $scope.videos = response;
                $scope.showVideos = true;
            },
            function(response) {
                $scope.videoMessage = 'Error: ' + response.status + ' ' + response.statusText;
            }
        );

    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])
;

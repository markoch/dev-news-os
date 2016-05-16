'use strict';

angular.module('javascriptNews')

    .controller('IndexController', ['$scope', 'indexFactory', function($scope, indexFactory) {
        $scope.headlineMessage    = 'Loading ...';
        $scope.bestArticleMessage = 'Loading ...';
        $scope.articleMessage     = 'Loading ...';

        $scope.showHeadline     = false;
        $scope.showBestArticles = false;
        $scope.showArticles     = false;

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
    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])
;

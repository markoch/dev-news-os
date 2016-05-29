'use strict';

angular
    .module('javascriptNews')
    .controller('IndexController', ['$scope', 'indexFactory', function($scope, indexFactory) {
        $scope.headlineMessage    = ''; //Loading ...
        $scope.bestArticleMessage = '';
        $scope.articleMessage     = '';
        $scope.podcastMessage     = '';
        $scope.videoMessage       = '';

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

    .controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory',
    function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

        $scope.loggedIn = false;
        $scope.username = '';

        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }

        $scope.openLogin = function () {
            ngDialog.open({ template: 'views/login.html', scope: $scope, controller: 'LoginController' });
        };

        $scope.logOut = function() {
           AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
        };

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        $scope.stateis = function(curstate) {
           return $state.is(curstate);
        };

    }])

    .controller('LoginController', ['$scope', '$localStorage', 'AuthFactory',
    function ($scope, $localStorage, AuthFactory) {

        $scope.loginData = $localStorage.getObject('userinfo','{}');

        $scope.doLogin = function() {
            if($scope.rememberMe) {
                $localStorage.storeObject('userinfo',$scope.loginData);
            }
            AuthFactory.login($scope.loginData);
        };

        $scope.doLoginFacebook = function() {
            if($scope.rememberMe) {
                $localStorage.storeObject('userinfo',$scope.loginData);
            }
            AuthFactory.loginFacebook($scope.loginData);
        };
    }])

    .controller('RegisterController', ['$scope', '$localStorage', 'AuthFactory',
    function ($scope, $localStorage, AuthFactory) {

        $scope.register={};
        $scope.loginData={};

        $scope.doRegister = function() {
            AuthFactory.register($scope.registration);
        };

        $scope.doLoginFacebook = function() {
            if($scope.rememberMe) {
                $localStorage.storeObject('userinfo',$scope.loginData);
            }
            AuthFactory.loginFacebook($scope.loginData);
        };
    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])

    .controller('ChangeController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])
;

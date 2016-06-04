'use strict';

angular
    .module('javascriptNews')
    //this directive is required to switch tabs
    //if this is not used than on tab switch the page is scrolled to top
    //https://www.grobmeier.de/bootstrap-tabs-with-angular-js-25112012.html
    .directive('showtab',
        function () {
            return {
                link: function (scope, element) {
                    element.click(function(e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        })
    .controller('IndexController', ['$scope', 'indexFactory', 'AuthFactory', function($scope, indexFactory, AuthFactory) {
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

        $scope.isAdmin = function() {
            if (AuthFactory.isAuthenticated() && AuthFactory.isAdmin()){
                return true;
            }
            return false;
        };

        $scope.incArticleLink = function(sId) {
            indexFactory.incArticleLink(sId).update(
                function(response){
                    return response;
                },
                function(response) {
                    $scope.podcastMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.incLike = function(sId) {
            console.log('Update Like count for', sId);
            if(!AuthFactory.isAuthenticated()){
                $('#loginModal').modal('show');
            }
        };

        $scope.hide = function(sId) {
            console.log('Hide news', sId);
        };

    }])

    .controller('HeaderController', ['$scope', '$state' ,'$stateParams', '$rootScope', 'AuthFactory',
    function ($scope, $state, $stateParams, $rootScope, AuthFactory) {

        $scope.loggedIn = false;
        $scope.username = '';

        //read GET variables from GET request set by redirect from Facebook callback
        var token = $scope.$location.search().token;
        var succes = $scope.$location.search().success;
        var username = $scope.$location.search().username;
        var isAdmin = $scope.$location.search().admin === 'true' ? true : false;

        if (succes) {
            AuthFactory.storeUser({username:username, admin:isAdmin, token: token});
            $rootScope.$broadcast('login:Successful');
        }

        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }

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

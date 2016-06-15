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

        $scope.refreshArticles = function() {
            $scope.articles = indexFactory.getArticles().query(
                function(response){
                    $scope.articles = response;
                    $scope.showArticles = true;
                },
                function(response) {
                    $scope.articleMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.refreshPodcasts = function() {
            $scope.podcasts = indexFactory.getPodcasts().query(
                function(response){
                    $scope.podcasts = response;
                    $scope.showPodcasts = true;
                },
                function(response) {
                    $scope.podcastMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.refreshVideos = function() {
            $scope.videos = indexFactory.getVideos().query(
                function(response){
                    $scope.videos = response;
                    $scope.showVideos = true;
                },
                function(response) {
                    $scope.videoMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.isAdmin = function() {
            if (AuthFactory.isAuthenticated() && AuthFactory.isAdmin()){
                return true;
            }
            return false;
        };

        $scope.incArticleLink = function(sId) {
            indexFactory.incArticleLink(sId).update(
                function(response){
                    $scope.refreshArticles();
                    return response;
                },
                function(response) {
                    $scope.articleMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.incPodcastLink = function(sId) {
            indexFactory.incPodcastLink(sId).update(
                function(response){
                    $scope.refreshPodcasts();
                    return response;
                },
                function(response) {
                    $scope.podcastMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.incVideoLink = function(sId) {
            indexFactory.incVideoLink(sId).update(
                function(response){
                    $scope.refreshVideos();
                    return response;
                },
                function(response) {
                    $scope.videoMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.hideArticle = function(sId) {
            //TODO add angular directive for this
            //http://stackoverflow.com/questions/18313576/confirmation-dialog-on-ng-click-angularjs
            if (confirm('Do you really want to delete this article?')) {
                indexFactory.getArticle(sId).delete(
                    function(response1){
                        $scope.refreshArticles();
                        return response1;
                    },
                    function(response) {
                        $scope.articleMessage = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            }
        };

        $scope.hidePodcast = function(sId) {
            //TODO add angular directive for this
            //http://stackoverflow.com/questions/18313576/confirmation-dialog-on-ng-click-angularjs
            if (confirm('Do you really want to delete this podcast?')) {
                indexFactory.getPodcast(sId).delete(
                    function(response1){
                        $scope.refreshPodcasts();
                        return response1;
                    },
                    function(response) {
                        $scope.podcastMessage = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            }
        };

        $scope.hideVideo = function(sId) {
            //TODO add angular directive for this
            //http://stackoverflow.com/questions/18313576/confirmation-dialog-on-ng-click-angularjs
            if (confirm('Do you really want to delete this video?')) {
                indexFactory.getVideo(sId).delete(
                    function(response1){
                        $scope.refreshVideos();
                        return response1;
                    },
                    function(response) {
                        $scope.videoMessage = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            }
        };
    }])

    .controller('HeaderController', ['$scope', '$state' ,'$stateParams', '$rootScope', '$cookieStore', 'AuthFactory',
    function ($scope, $state, $stateParams, $rootScope, $cookieStore, AuthFactory) {

        $scope.loggedIn = false;
        $scope.username = '';

        //read GET variables from GET request set by redirect from Facebook callback
        var token = $cookieStore.get('token');
        var username = $cookieStore.get('username');
        var isAdmin = $cookieStore.get('admin') === true ? true : false;
        if (username && token) {
            AuthFactory.storeUser({username:username, admin:isAdmin, token: token});
            $rootScope.$broadcast('login:Successful');
        } else {
            AuthFactory.logout();
             $scope.loggedIn = false;
             $scope.username = '';

             if (token) {
                 $cookieStore.remove('token');
             }
             if (username) {
                 $cookieStore.remove('username');
             }
             if (isAdmin) {
                 $cookieStore.remove('admin');
             }
        }

        if(AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }

        $scope.logOut = function() {
           AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';

            //remove the cookies
            if ($cookieStore.get('token')) {
                $cookieStore.remove('token');
            }
            if ($cookieStore.get('username')) {
                $cookieStore.remove('username');
            }
            if ($cookieStore.get('admin')) {
                $cookieStore.remove('admin');
            }
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

    .controller('AboutController', ['$scope', 'messageFactory', function($scope, messageFactory) {
        $scope.messageData={};

        $scope.addMessage = function() {
            messageFactory.getMessages().create($scope.messageData,
                function(response){
                    $scope.messageData.user = '';
                    $scope.messageData.email = '';
                    $scope.messageData.subject = '';
                    $scope.messageData.message = '';
                    return response;
                },
                function(response){
                    console.log('Error: ' + response.status + ' ' + response.statusText);
                }
            );
        };
    }])

    .controller('PrivacyController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])

    .controller('ChangeController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])

    .controller('AddNewsController', ['$scope', 'addNewsFactory', 'AuthFactory', function($scope, addNewsFactory, AuthFactory) {
        $scope.newArticle = {};
        $scope.newPodcast = {};
        $scope.newVideo = {};

        $scope.isAuthenticated = function() {
            if (AuthFactory.isAuthenticated()){
                return true;
            }
            return false;
        };

        $scope.addArticle = function() {
            if (AuthFactory.isAuthenticated()){
                addNewsFactory.getArticles().create($scope.newArticle,
                    function(response){
                        $scope.newArticle = {};
                        return response;
                    },
                    function(response) {
                        $scope.articleMessage = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            } else {
                //TODO show error message
            }
        };

        $scope.addPodcast = function() {
            addNewsFactory.getPodcasts().create($scope.newPodcast,
                function(response){
                    $scope.newPodcast = {};
                    return response;
                },
                function(response) {
                    $scope.podcastMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };

        $scope.addVideo = function() {
            addNewsFactory.getVideos().create($scope.newVideo,
                function(response){
                    $scope.newVideo = {};
                    return response;
                },
                function(response) {
                    $scope.videoMessage = 'Error: ' + response.status + ' ' + response.statusText;
                }
            );
        };
    }])
;

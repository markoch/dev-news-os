'use strict';

angular.module('javascriptNews', ['ui.router', 'ngResource', 'ngRoute', 'ngCookies', 'youtube-embed'])
// .config(['$compileProvider', function ($compileProvider) {
//   $compileProvider.debugInfoEnabled(false);
// }])
// .config(['$locationProvider', function($locationProvider) {
//     //allow reading GET variables passed via main page URL
//     //this is required for the OAuth Facebook integration
//     //the default is '!' but whithout specifing this it wont work
//     //$locationProvider requires ngRout module
//     //https://docs.angularjs.org/guide/$location
//     $locationProvider.hashPrefix('!');
// }])
.filter('trustUrl', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })

            // route for the aboutus page
            .state('app.about', {
                url:'about',
                views: {
                    'content@': {
                        templateUrl : 'views/about.html',
                        controller  : 'AboutController'
                    }
                }
            })

            // route for the aboutus page
            .state('app.privacy', {
                url:'privacy',
                views: {
                    'content@': {
                        templateUrl : 'views/privacy.html',
                        controller  : 'PrivacyController'
                    }
                }
            })

            // route for the changes page
            .state('app.changes', {
                url:'changes',
                views: {
                    'content@': {
                        templateUrl : 'views/changes.html',
                        controller  : 'ChangeController'
                    }
                }
            })

            // route for the changes page
            .state('app.addNews', {
                url:'addnews',
                views: {
                    'content@': {
                        templateUrl : 'views/addNews.html',
                        controller  : 'AddNewsController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

    })
    .run(['$rootScope', '$location', function($rootScope, $location) {
      $rootScope.$location = $location;
    }])
;

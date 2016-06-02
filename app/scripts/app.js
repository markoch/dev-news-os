'use strict';

angular.module('javascriptNews', ['ui.router', 'ngResource', 'ngRoute', 'youtube-embed'])
// .config(['$compileProvider', function ($compileProvider) {
//   $compileProvider.debugInfoEnabled(false);
// }])
.config(['$locationProvider', function($locationProvider) {
    //allow reading GET variables passed via main page URL
    //this is required for the OAuth Facebook integration
    //the default is '!' but whithout specifing this it wont work
    //$locationProvider requires ngRout module
    //https://docs.angularjs.org/guide/$location
    $locationProvider.hashPrefix('!');
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

            // route for the changes page
            .state('app.changes', {
                url:'changes',
                views: {
                    'content@': {
                        templateUrl : 'views/changes.html',
                        controller  : 'ChangeController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

    })
    .run(['$rootScope', '$location', function($rootScope, $location) {
      $rootScope.$location = $location;
    }])
;

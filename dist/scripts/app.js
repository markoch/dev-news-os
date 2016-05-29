'use strict';

angular.module('javascriptNews', ['ui.router','ngResource', 'ngDialog', 'youtube-embed'])
// .config(['$compileProvider', function ($compileProvider) {
//   $compileProvider.debugInfoEnabled(false);
// }])
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
;

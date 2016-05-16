'use strict';

angular.module('javascriptNews', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
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

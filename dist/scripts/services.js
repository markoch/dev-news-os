'use strict';

angular
    .module('javascriptNews')
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

    .factory('$localStorage', ['$window', function ($window) {
        return {
            store: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            storeObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                return JSON.parse($window.localStorage[key] || defaultValue);
            }
        };
    }])

    .factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope',
    function($resource, $http, $localStorage, $rootScope){

        var authFac = {};
        var TOKEN_KEY = 'Token';
        var isAuthenticated = false;
        var username = '';
        var authToken;

        function useCredentials(credentials) {
          isAuthenticated = true;
          username = credentials.username;
          authToken = credentials.token;

          // Set the token as header for your requests!
          $http.defaults.headers.common['x-access-token'] = authToken;
        }

      function loadUserCredentials() {
        var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
        if (credentials.username !== undefined) {
          useCredentials(credentials);
        }
      }

      function storeUserCredentials(credentials) {
        $localStorage.storeObject(TOKEN_KEY, credentials);
        useCredentials(credentials);
      }

      function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['x-access-token'] = authToken;
        $localStorage.remove(TOKEN_KEY);
      }

      authFac.storeUser = function(credentials) {
          storeUserCredentials(credentials);
      };

      authFac.loginFacebook = function() {
            window.location =
                window.location.protocol + '//' +
                window.location.host + '/api/v1/users/facebook';
      };

        authFac.login = function(loginData) {
            $resource('/api/v1/users/login')
            .save(loginData,
               function(response) {
                  storeUserCredentials({username:loginData.username, token: response.token});
                  $rootScope.$broadcast('login:Successful');
                  $('#loginModal').modal('hide');
               },
               function(response){
                  isAuthenticated = false;
                  $rootScope.loginError=response.data.err.message;
                    //response.data.err.message
                    //response.data.err.name
                    $('#loginAlert').modal('show');
               }
            );
        };

        authFac.logout = function() {
            $resource('/api/v1/users/logout').get(function(){  //param response
            });
            destroyUserCredentials();
        };

        authFac.register = function(registerData) {
            $resource('/api/v1/users/register')
            .save(registerData,
               function() {  //param response
                  authFac.login({username:registerData.username, password:registerData.password});
                if (registerData.rememberMe) {
                    $localStorage.storeObject('userinfo',
                        {username:registerData.username, password:registerData.password});
                }

                  $rootScope.$broadcast('registration:Successful');
                  $('#registerModal').modal('hide');
               },

               function(response){
                  $rootScope.registrationError=response.data.message;
                  $('#registrationAlert').modal('show');
               }
            );
        };

        authFac.isAuthenticated = function() {
            return isAuthenticated;
        };

        authFac.getUsername = function() {
            return username;
        };

        loadUserCredentials();

        return authFac;

    }])
;

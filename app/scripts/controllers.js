'use strict';
//$scope message gets oferwritten this must be changed
angular.module('javascriptNews')

    .controller('IndexController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])

    .controller('AboutController', ['$scope', function($scope) {
        $scope.test = 'foo';
    }])
;

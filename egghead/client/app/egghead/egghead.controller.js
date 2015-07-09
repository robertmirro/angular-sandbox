'use strict';

angular
    .module('eggheadApp')
    .controller('EggheadCtrl', function($scope) {
        $scope.message = 'Hello';
        $scope.reverseMe = reverseMe;

        function reverseMe(value) {
            return value.split('').reverse().join('');
        }
    })
    .filter('reverseIt', function() {
        return function(text, fn) {
            return fn(text);
        };
    });

'use strict';

angular.module('eggheadApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'
    ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
          .otherwise('/');

        $locationProvider.html5Mode(true);
    })

    .controller('egg_1', function($scope) {
        var $vm = $scope;

        $vm.dot = {
            field: '$scope.dot.field'
        };
        $vm.field = '$scope.field';
        console.log('$scope 1:', $scope, '- $scope === this?', $scope === this);
    })

    .controller('egg_2', function($scope) {
        // $scope.theScope = 'egg_1 scope';
        console.log('$scope 2:', $scope, '- $scope === this?', $scope === this);
    });


'use strict';

angular
    .module('eggheadApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('egghead', {
                url: '/egghead',
                templateUrl: 'app/egghead/egghead.html',
                controller: 'EggheadCtrl'
            });
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

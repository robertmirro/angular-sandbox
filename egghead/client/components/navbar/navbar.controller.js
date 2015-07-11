'use strict';

angular
.module('eggheadApp')
.controller('NavbarCtrl', function($scope, $location) {
    $scope.menu = [{
        'title': 'Home',
        'link': '/',
        'state': 'main'
    }, {
        'title': 'Egghead',
        'link': '/egghead',
        'state': 'egghead'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
        return route === $location.path();
    };
});

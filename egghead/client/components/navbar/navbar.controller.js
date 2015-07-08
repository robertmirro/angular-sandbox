'use strict';

angular
.module('eggheadApp')
.controller('NavbarCtrl', function($scope, $location) {
    $scope.menu = [{
        'title': 'Home',
        'link': '/'
    }, {
        'title': 'Egghead',
        'link': '/egghead'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
        return route === $location.path();
    };
});

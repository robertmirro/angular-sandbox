'use strict';

angular
    .module('eggheadApp', [
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
    });


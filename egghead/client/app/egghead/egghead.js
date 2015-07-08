'use strict';

angular.module('eggheadApp')
  .config(function($stateProvider) {
      $stateProvider
      .state('egghead', {
          url: '/egghead',
          templateUrl: 'app/egghead/egghead.html',
          controller: 'EggheadCtrl'
      });
  });


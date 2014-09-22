(function () {
    'use strict';

    var app = angular.module( 'HelloWorld' , [] );

    app.controller( 'World' , function( $scope ) {
        $scope.text = 'World';
        console.log( $scope );
    });

    app.directive( 'hello' , function() {
        return {
            restrict : 'A' ,
            template : '<input ng-model="text" /><p>Hello {{ text }}!</p>' ,
            controller : 'World'
        }
    });

})();



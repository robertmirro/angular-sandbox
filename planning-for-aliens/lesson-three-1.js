(function () {
    'use strict';

    var app = angular.module( 'HelloWorld' , [] );

    // use DI to inject $scope and $rootScope into controller
    app.controller( 'World' , function( $scope , $rootScope ) {
        console.log( '$rootScope:' , $rootScope );
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



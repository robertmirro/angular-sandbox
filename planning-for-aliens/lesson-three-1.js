(function () {
    'use strict';

    var app = angular.module( 'HelloWorld' , [] );

    // use angular DI to inject $scope and $rootScope into controller, add $compile too
    // NOTE: these objects are not generally available unless they are injected 
    // NOTE: the order of the injected objects does not matter
    // app.controller( 'World' , function( $scope , $rootScope , $compile ) {
    //     console.log( '$rootScope:' , $rootScope );
    //     $scope.text = 'World';
    //     console.log( $scope );
    //     console.log( $compile );
    // });

    // could also use array syntax to specify DI for the controller
    // NOTE: this is similar to AMD and now ORDER MATTERS
    app.controller( 'World' , [ '$scope' , '$rootScope' , '$compile' , function( $scope , $rootScope , $compile ) {
        $scope.text = 'Worldddd';
        console.log( $scope );

        console.log( '$rootScope:' , $rootScope );
        console.log( $compile );
    }]);

    app.directive( 'hello' , function() {
        return {
            restrict : 'A' ,
            template : '<input ng-model="text" /><p>Hello {{ text }}!</p>' ,
            controller : 'World'
        }
    });

})();



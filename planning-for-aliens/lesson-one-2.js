(function () {
    'use strict';

    var app = angular.module( 'hello' , [] );

    console.log( app );

    app.controller( 'world' , function( $scope , $rootScope ) {
        $scope.oldText = 'Old World';
        $scope.w.anotherValue = 'another value';
        this.text = 'World';
        this.otherText = 'Other World';
        console.log( $scope );
        console.log( $rootScope );
        console.log( '$scope.$parent.$root === $rootScope:' , $scope.$parent.$root === $rootScope );
    });

})();
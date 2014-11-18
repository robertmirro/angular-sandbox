(function () {
    'use strict';

    var app = angular.module( 'hello' , [] );

    console.log( app );

    app.controller( 'world' , function( $scope ) {
        //$scope.text = 'World';
        this.text = 'World';
        this.otherText = 'Other World';
        console.log( $scope );
//        console.log( this );
    });

})();
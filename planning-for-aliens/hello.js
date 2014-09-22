(function () {
    'use strict';

    var app = angular.module( 'hello' , [] );

    console.log( app );

    app.controller( 'world' , function( $scope ) {
        $scope.text = 'World';
        console.log( $scope );
    });

})();
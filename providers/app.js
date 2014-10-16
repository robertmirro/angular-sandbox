(function () {
    'use strict';

    angular.module( 'providers' , [] )
        .provider( 'aProvider' , { $get : function() {
            return 'I am a Provider';
        }})
        .controller( 'aController' , 
        [ '$scope' , 'aProvider' ,  
            function( $scope , aProvider ) {
                $scope.providerValue = aProvider;
            }
        ])
    ;
})();

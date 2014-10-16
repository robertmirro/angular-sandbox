(function () {
    'use strict';

    angular.module( 'providers' , [] )
        .provider( 'aProvider' , { $get : 
            function() {
                return 'I am a Provider';
            }
        })
        .factory( 'aFactory' , function() {
            return 'Ima Factory';
        }) 
        .controller( 'aController' , 
        [ '$scope' , 'aProvider' , 'aFactory' ,  
            function( $scope , aProvider , aFactory ) {
                $scope.providerValue = aProvider;
                $scope.factoryValue = aFactory;
            }
        ])
    ;
})();

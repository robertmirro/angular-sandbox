(function () {
    'use strict';

    function serviceConstructor() {
        this.serviceValue = 'Service data...';
    }
    
    angular.module( 'providers' , [] )
        .provider( 'aProvider' , { $get : 
            function() {
                return 'Provider data...';
            }
        })
        .factory( 'aFactory' , function() {
            return 'Factory data...';
        }) 
        .service( 'aService', serviceConstructor )
        .value( 'aValue' , 'Value value...')
        .controller( 'aController' , 
        [ '$scope' , 'aProvider' , 'aFactory' , 'aService' , 'aValue' ,  
            function( $scope , aProvider , aFactory , aService , aValue ) {
                $scope.providerValue = aProvider;
                $scope.factoryValue = aFactory;
                $scope.serviceValue = aService.serviceValue;
                $scope.valueValue = aValue;
            }
        ]);
})();

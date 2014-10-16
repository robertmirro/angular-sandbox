(function () {
    'use strict';

    function serviceConstructor() {
        this.serviceValue = 'Service data...';
    }
    
    angular.module( 'providers' , [] )
        .provider( 'aProvider' , { $get : 
            function aProvider() {
                return 'Provider data...';
            }
        })
        .factory( 'aFactory' , function aFactory() {
            return 'Factory data...';
        }) 
        .service( 'aService', serviceConstructor )
        .value( 'aValue' , 'Value data...')
        .controller( 'aController' , 
        [ '$scope' , 'aProvider' , 'aFactory' , 'aService' , 'aValue' ,  
            function aController( $scope , aProvider , aFactory , aService , aValue ) {
                $scope.providerValue = aProvider;
                $scope.factoryValue = aFactory;
                $scope.serviceValue = aService.serviceValue;
                $scope.valueValue = aValue;
            }
        ]);
})();

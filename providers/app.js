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
        [ '$scope' , 'aProvider' , 'aFactory' , 'aService' , 'aValue' , '$q' ,  
            function aController( $scope , aProvider , aFactory , aService , aValue, $q ) {
                $scope.providerValue = aProvider;
                $scope.factoryValue = aFactory;
                $scope.serviceValue = aService.serviceValue;
                $scope.valueValue = aValue;

                $scope.clickMe = function() {
                    console.log('clicked...' + Date());

                    getData().then(function(data) {
                        console.log('data from clickMe:',data);
                    });    
                }    

                function getData() {
                    console.log('getting data...');

                    return getPromise().then(function(promiseData){
                        console.log('promiseData from getData:',promiseData);
                        return promiseData;
                    });    
                }

                function getPromise() {
                    console.log('getting promise...');

                    var deferred = $q.defer();
                    setTimeout( function() {
                        var deferredResolved = 'Resolved from getPromise:' + Date();
                        deferred.resolve( deferredResolved );        
                        console.log(deferredResolved);
                    } , 2000 );
                    console.log('deferred created from getPromise:',deferred);
                    return deferred.promise;                    
                }

                setTimeout( function() { 
                    aValue += 'NEW VALUE...';
                    $scope.valueValue = aValue;
                    $scope.$apply();
                    console.log($scope);
                    console.log( 'aValue:' , aValue );
                } , 1000 );

            }
        ]);
})();

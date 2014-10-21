(function () {
    'use strict';

    // define controller function seperately
    function AllOrdersController( $scope , PeopleFactory ) {
        $scope.orders = null;
        $scope.ordersTotal = 0.0;
        $scope.totalType;
        
        function init() {
            // get orders from factory, a promise is being returned
            PeopleFactory.getOrders()
                .success( function( data , status , headers , config ) {
                    $scope.orders = data;
                    getOrdersTotal();
                })
                .error( function( data , status , headers , config ) {
                    console.log( 'ERROR: getPerson(%s)' , personId );
                });
        }

        function getOrdersTotal() {
            var total = 0;
            for ( var i = 0, len = $scope.orders.length; i < len; i++ ) {
                total += $scope.orders[ i ].total;
            }
            
            $scope.ordersTotal = total;
            $scope.totalType = ( $scope.ordersTotal > 100  ? 'success' : 'danger' );
        }
        
        init();
    };
    
    AllOrdersController.$inject = [ '$scope' , 'PeopleFactory' ];
    
    // reference app using angular.module( appname ), bind controller
    // use array param to allow dependency injection with minification
    angular.module( 'peopleApp' )
        .controller( 'AllOrdersController' , AllOrdersController );
    
})();

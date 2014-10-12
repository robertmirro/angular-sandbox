(function () {
    'use strict';

    // no need to store module reference in var
    // add ngRoute dependency in order to access $routeProvider
    angular.module( 'peopleApp' , [ 'ngRoute' ] )
    
        .config( function ( $routeProvider ) {
            $routeProvider
                .when( '/' , {
                    controller : 'PeopleController' , 
                    templateUrl : '/app/views/people.html'
                })
                .when( '/orders' , {
                    controller : 'OrdersController' , 
                    templateUrl : '/app/views/orders.html'
                })
                .otherwise( {
                    redirectTo : '/'
                })
        });
    
})();

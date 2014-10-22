(function () {
    'use strict';

    // no need to store module reference in var
    // add ngRoute dependency in order to access $routeProvider
    // add ngAnimate dependency in order to access $animateProvider
    angular.module( 'peopleApp' , [ 'ngRoute' , 'ngAnimate' ] )
    
        // inject $routeProvider
        // routing marries a controller to view
        .config( function ( $routeProvider , AppConstantSettings ) {
            console.log( 'title: %s , version: ' , AppConstantSettings.title , AppConstantSettings.version );

            $routeProvider
                .when( '/' , {
                    controller : 'PeopleController' , 
                    templateUrl : 'app/views/75-people.html'
                })
                .when( '/orders/:personId' , {
                    controller : 'OrdersController' , 
                    templateUrl : 'app/views/75-orders.html'
                })
                .when( '/orders' , {
                    controller : 'AllOrdersController' , 
                    templateUrl : 'app/views/75-all-orders.html'
                })
                .otherwise( {
                    redirectTo : '/'
                })
        });
    
})();

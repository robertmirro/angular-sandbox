(function () {
    'use strict';

    // no need to store module reference in var
    // add ngRoute dependency in order to access $routeProvider
    angular.module( 'peopleApp' , [ 'ngRoute' ] )
    
        // inject $routeProvider
        // routing marries a controller to view
        .config( function ( $routeProvider ) {
            $routeProvider
                .when( '/' , {
                    controller : 'PeopleController' , 
                    templateUrl : 'app/views/47-people.html'
                })
                .otherwise( {
                    redirectTo : '/'
                })
        });
    
})();

(function () {
    'use strict';

    // define controller function seperately
    // need to inject $routeParams as well to get value of personId
    function OrdersController( $scope , $routeParams ) {

        // get personId from route parameters
        var personId = $routeParams.personId;
        
        // enable harmony in chrome to access .find()
        // chrome://flags/#enable-javascript-harmony
        // NOTE: brackets is invoking chrome in its own workspace so need to 
        //       enable harmony after brackets launches chrome.
        function init() {
            var person = $scope.people.find( function( person ) {
                return person.id === parseInt( personId );
            });

            $scope.orders = ( person && person.orders ? person.orders : null );
        }

        // duplicate people data from peopleController for now...
        $scope.people = [
            {  
                id:1,
                name:'Robert',
                city:'Alexandria',
                rate:9.99,
                joined:'2014-01-10',
                orderTotal: 9.9956,
                orders: [
                    {
                        id: 1,
                        product:'Shoes',
                        total: 9.9956
                    }
                ]
            } ,
            {  
                id:2,
                name:'Rob',
                city:'DC',
                rate:4.84,
                joined:'2014-02-04',
                orderTotal: 19.95,
                orders: [
                    {
                        id: 2,
                        product:'Baseball',
                        total: 8.99
                    },
                    {
                        id: 3,
                        product:'Bat',
                        total: 10.99
                    },
                ]
            } ,
            {  
                id:3,
                name:'Bob',
                city:'Philly',
                rate:6.9,
                joined:'2014-04-08',
                orderTotal: 48.4,
                orders: [
                    {
                        id: 5,
                        product:'Jumprope',
                        total: 12.88
                    },
                    {
                        id: 6,
                        product:'Kettlebell',
                        total: 28.99
                    },
                    {
                        id: 7,
                        product:'Water bottle',
                        total: 6.53
                    }
                ]
            } ,
            {  
                id:4,
                name:'Bobby',
                city:'Scranton',
                rate:48.13345,
                joined:'2014-08-04',
                orderTotal: 4.8,
                orders: [
                    {
                        id: 8,
                        product:'Protein bar',
                        total: 4.8
                    }
                ]
            }
        ];

        init();
    };
    
    OrdersController.$inject = [ '$scope' , '$routeParams' ];
    
    // reference app using angular.module( appname ), bind controller
    // use array param to allow dependency injection with minification
    angular.module( 'peopleApp' )
        .controller( 'OrdersController' , OrdersController );
    
})();

(function () {
    'use strict';

    function PeopleFactory( $http ) {

        var people = [];
        
        var factory = {};
        
        factory.getPeople = function() {
            // return promise from $http.get to controller
            return $http.get( '/people' );
        };

        factory.getPerson = function( personId ) {
            // return promise from $http.get to controller
            return $http.get( '/person/' + personId );
        };
        
        factory.getOrders = function() {
            return $http.get( '/orders' );
        };

        factory.deletePerson = function( personId ) {
            // return promise from $http.get to controller
            return $http.delete( '/person/' + personId );
        };
        
        return factory;
    }
    
    // (1) could use $inject method to inject $http
    // PeopleFactory.$inject = [ '$http' ];
    
    // register factory with angular
    angular.module( 'peopleApp' )
        // .factory( 'PeopleFactory' , PeopleFactory );
        // (2) could use array syntax to inject $http
        .factory( 'PeopleFactory' , [ '$http' , PeopleFactory ] );
    
})();
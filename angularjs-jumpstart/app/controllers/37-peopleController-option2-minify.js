(function () {
    'use strict';

    // define controller function seperately
    function PeopleController( $scope ) {
        $scope.people = [
            {name : 'Robert' , city : 'Alexandria' , rate : 9.99 , joined : '2014-01-10' } ,
            {name : 'Rob' , city : 'DC' , rate : 4.84 , joined : '2014-02-04' } ,
            {name : 'Bob' , city : 'Philly' , rate : 6.9 , joined : '2014-04-08' } ,
            {name : 'Bobby' , city : 'Scranton' , rate : 48.12345 , joined : '2014-08-04' }
        ];

        // set defaults
        $scope.sortBy = 'name';
        $scope.reverse = false;                

        // create a sortBy var to store sort value (people.<property>), create reverse var and toggle it
        $scope.sortColumn = function( propertyName ) {
            $scope.sortBy = propertyName;
            $scope.reverse = !$scope.reverse;
        };
    };
    
    // manual dependency injection to allow minification
    PeopleController.$inject = [ '$scope' ];
        
    // reference app using angular.module( appname ), bind controller
    angular.module( 'peopleApp' )
        .controller( 'PeopleController' , PeopleController );
    
})();

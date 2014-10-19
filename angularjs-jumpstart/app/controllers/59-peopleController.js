(function () {
    'use strict';

    // define controller function seperately
    function PeopleController( $scope , PeopleService ) {

        // set defaults
        $scope.sortBy = 'name';
        $scope.reverse = false;                
        
        // get people from service
        $scope.people = PeopleService.getPeople();
        
        // create a sortBy var to store sort value (people.<property>), create reverse var and toggle it
        $scope.sortColumn = function( propertyName ) {
            $scope.sortBy = propertyName;
            $scope.reverse = !$scope.reverse;
        };
    };
    
    // reference app using angular.module( appname ), bind controller
    // use array param to allow dependency injection with minification
    angular.module( 'peopleApp' )
        .controller( 'PeopleController' , [ '$scope' , 'PeopleService' , PeopleController ] );
    
})();

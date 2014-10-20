(function () {
    'use strict';

    // define controller function seperately
    function PeopleController( $scope , PeopleFactory , AppValueSettings ) {

        // set defaults
        $scope.sortBy = 'name';
        $scope.reverse = false;                
        $scope.appSettings = AppValueSettings;
        
        // get people from factory, a promise is being returned
        PeopleFactory.getPeople()
            .success( function( data , status , headers , config ) {
                $scope.people = data;
            })
            .error( function( data , status , headers , config ) {
                console.log( 'ERROR: getPeople()' );
            });

//        $scope.people = PeopleFactory.getPeople();
//        console.log( '%O' , $scope.people );
        
        // create a sortBy var to store sort value (people.<property>), create reverse var and toggle it
        $scope.sortColumn = function( propertyName ) {
            $scope.sortBy = propertyName;
            $scope.reverse = !$scope.reverse;
        };
    };
    
    // reference app using angular.module( appname ), bind controller
    // use array param to allow dependency injection with minification
    angular.module( 'peopleApp' )
        .controller( 'PeopleController' , [ '$scope' , 'PeopleFactory' , 'AppValueSettings' , PeopleController ] );
    
})();

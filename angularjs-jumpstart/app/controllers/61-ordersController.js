(function () {
    'use strict';

    // define controller function seperately
    // need to inject $routeParams as well to get value of personId
    function OrdersController( $scope , $routeParams , PeopleFactory ) {

        // get personId from route parameters
        var personId = $routeParams.personId;
        
        function init() {
            // get person from factory
            $scope.person = PeopleFactory.getPerson( personId );    
        }

        init();
    };
    
    OrdersController.$inject = [ '$scope' , '$routeParams' , 'PeopleFactory' ];
    
    // reference app using angular.module( appname ), bind controller
    // use array param to allow dependency injection with minification
    angular.module( 'peopleApp' )
        .controller( 'OrdersController' , OrdersController );
    
})();

(function () {
    'use strict';

    // define controller function seperately
    function PeopleController( $scope ) {
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
                        total: 9.995
                    },
                    {
                        id: 3,
                        product:'Bat',
                        total: 9.995
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
            
            
//            { id : 1 , name : 'Robert' , city : 'Alexandria' , rate : 9.99 , joined : '2014-01-10' } ,
//            { id : 2 , name : 'Rob' , city : 'DC' , rate : 4.84 , joined : '2014-02-04' } ,
//            { id : 3 , name : 'Bob' , city : 'Philly' , rate : 6.9 , joined : '2014-04-08' } ,
//            { id : 4 , name : 'Bobby' , city : 'Scranton' , rate : 48.12345 , joined : '2014-08-04' }
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
    
    // reference app using angular.module( appname ), bind controller
    // use array param to allow dependency injection with minification
    angular.module( 'peopleApp' )
        .controller( 'PeopleController' , [ '$scope' , PeopleController ] );
    
})();

(function () {
    'use strict';

    function PeopleFactory() {
        var people = [
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
                        total: 5.95
                    },
                    {
                        id: 3,
                        product:'Bat',
                        total: 14.00
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
        
        var factory = {};
        
        factory.getPeople = function() {
            return people || [];
        };

        // enable harmony in chrome to access .find()
        // chrome://flags/#enable-javascript-harmony
        // NOTE: brackets is invoking chrome in its own workspace so need to 
        //       enable harmony after brackets launches chrome.
        factory.getPerson = function( personId ) {
            var person = people.find( function( person ) {
                return person.id === parseInt( personId );
            });
            
            return person || {};
        };
        
        return factory;
    }
    
    // register factory with angular
    angular.module( 'peopleApp' )
        .factory( 'PeopleFactory' , PeopleFactory );
    
})();
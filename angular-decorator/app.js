(function() {
    'use strict';

    angular
        .module('theApp', [])
        .controller('theController', theController)
        .factory('theFactory', theFactory)
        .factory('theFactory', theOtherFactory)
    //.decorator('theFactory', theFactoryDecorator)
    ;

    function theController(theFactory) {
        console.log('theController...');
        this.dateTime = new Date();
        this.theFactory = theFactory;
    }

    function theFactory() {
        console.log('theFactory...');
        return {
            theProperty: 'theFactory'
        };
    }

    function theOtherFactory() {
        console.log('theOtherFactory...');
        return {
            theProperty: 'theOtherFactory'
        };
    }

    function theFactoryDecorator($delegate) {
        console.log('theFactoryDecorator...');
        $delegate.theDecoratedProperty = 'theFactoryDecorator';
        return $delegate;
    }
})();
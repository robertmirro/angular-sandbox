(function() {
    'use strict';

    angular
        .module('theApp', [])
        .controller('theController', theController)
        .provider('theProvider', theProvider)
        .config(theProviderConfig2)
        .provider('theProvider', theOtherProvider)
        .decorator('theProvider', theProviderDecorator)
        .config(theProviderConfig1);

    function theProviderConfig1(theProviderProvider) {
        console.log('theProviderConfig1...', theProviderProvider.getInternalProperty());

        theProviderProvider.setInternalProperty('-theProviderConfig1');
    }

    function theProviderConfig2(theProviderProvider) {
        console.log('theProviderConfig2...', theProviderProvider.getInternalProperty());

        theProviderProvider.setInternalProperty('-theProviderConfig2');
    }

    function theController(theProvider) {
        console.log('theController...');
        this.dateTime = new Date();
        this.theProvider = theProvider;
    }

    function theProvider() {
        console.log('theProvider...');

        var theInternalProperty = 'theProviderInternal';

        this.getInternalProperty = function() {
            return theInternalProperty;
        };
        this.setInternalProperty = function(value) {
            theInternalProperty += value;
        };
        this.$get = function $get() {
            return {
                theInternalProperty: theInternalProperty,
                theProperty: 'theProvider'
            };
        };
    }

    function theOtherProvider() {
        console.log('theOtherProvider...');

        var theInternalProperty = 'theOtherProviderInternal';

        this.getInternalProperty = function() {
            return theInternalProperty;
        };
        this.setInternalProperty = function(value) {
            theInternalProperty += value;
        };

        this.$get = function $get() {
            return {
                theInternalProperty: theInternalProperty,
                theProperty: 'theOtherProvider'
            };
        };
    }

    function theProviderDecorator($delegate) {
        console.log('theProviderDecorator...');
        $delegate.theDecoratedProperty = 'theProviderDecorator';
        return $delegate;
    }
})();
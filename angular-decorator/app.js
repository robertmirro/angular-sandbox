(function() {
    'use strict';

    angular
        .module('theApp', [])
        .controller('theController', theController)
        .provider('theProvider', theProvider)
        .provider('theProvider', theOtherProvider)
        .decorator('theProvider', theProviderDecorator);

    function theController(theProvider) {
        console.log('theController...');
        this.dateTime = new Date();
        this.theProvider = theProvider;
    }

    function theProvider() {
        console.log('theProvider...');

        var theInternalProperty = 'theProviderInternal';

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
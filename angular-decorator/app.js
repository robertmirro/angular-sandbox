(function() {
    'use strict';

    angular
        .module('theApp', [])
        .controller('theController', theController)
        .provider('theProvider', theProvider)
        .config(theProviderConfig2)
        .config(theProviderConfigDecorator)
        .provider('theProvider', theOtherProvider)
        .decorator('theProvider', theProviderDecorator)
        .config(theProviderConfig1);

    function theProviderConfig1(theProviderProvider) {
        console.log('theProviderConfig1...');

        console.log('  BEFORE:', theProviderProvider.getInternalProperty());
        theProviderProvider.setInternalProperty('-theProviderConfig1');
        console.log('  AFTER: ', theProviderProvider.getInternalProperty());
    }

    function theProviderConfig2(theProviderProvider) {
        console.log('theProviderConfig2...');

        console.log('  BEFORE:', theProviderProvider.getInternalProperty());
        theProviderProvider.setInternalProperty('-theProviderConfig2');
        console.log('  AFTER: ', theProviderProvider.getInternalProperty());
    }

    function theProviderConfigDecorator($provide) {
        console.log('theProviderConfigDecorator... LOADED');

        $provide.decorator('theProvider', function($delegate) {
            console.log('theProviderConfigDecorator - DECORATOR...\n  ', $delegate);

            $delegate.theInternalProperty += '-theProviderConfigDecorator';
            $delegate.theProperty += '-theProviderConfigDecorator';
            $delegate.theDecoratedProperty = ($delegate.theDecoratedProperty || '') + ($delegate.theDecoratedProperty ? ' - ' : '') + 'theProviderConfigDecorator';
            return $delegate;
        });
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
        console.log('theProviderDecorator...\n  ', $delegate);
        $delegate.theDecoratedProperty = ($delegate.theDecoratedProperty || '') + ($delegate.theDecoratedProperty ? ' - ' : '') + 'theProviderDecorator';
        return $delegate;
    }

    function theController(theProvider) {
        console.log('theController...');
        this.dateTime = new Date();
        this.theProvider = theProvider;
    }

})();
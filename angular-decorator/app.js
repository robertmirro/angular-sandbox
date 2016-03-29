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

        console.log('\tBEFORE:', theProviderProvider.getInternalProperty());
        theProviderProvider.setInternalProperty(' - theProviderConfig1');
        console.log('\tAFTER: ', theProviderProvider.getInternalProperty());
    }

    function theProviderConfig2(theProviderProvider) {
        console.log('theProviderConfig2...');

        console.log('\tBEFORE:', theProviderProvider.getInternalProperty());
        theProviderProvider.setInternalProperty(' - theProviderConfig2');
        console.log('\tAFTER: ', theProviderProvider.getInternalProperty());
    }

    function theProviderConfigDecorator($provide) {
        console.log('theProviderConfigDecorator... LOADED');

        $provide.decorator('theProvider', function($delegate) {
            console.log('theProviderConfigDecorator - DECORATOR...');

            console.log('\tBEFORE:', $delegate);
            $delegate.theInternalProperty = ($delegate.theInternalProperty || '') + ($delegate.theInternalProperty ? ' - ' : '') + 'theProviderConfigDecorator';
            $delegate.theProperty = ($delegate.theProperty || '') + ($delegate.theProperty ? ' - ' : '') + 'theProviderConfigDecorator';
            console.log('\tAFTER: ', $delegate);
            return $delegate;
        });
    }

    function theProviderDecorator($delegate) {
        console.log('theProviderDecorator...');

        console.log('\tBEFORE:', $delegate);
        $delegate.theInternalProperty = ($delegate.theInternalProperty || '') + ($delegate.theInternalProperty ? ' - ' : '') + 'theProviderDecorator';
        $delegate.theProperty = ($delegate.theProperty || '') + ($delegate.theProperty ? ' - ' : '') + 'theProviderDecorator';
        console.log('\tAFTER: ', $delegate);
        return $delegate;
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

    function theController(theProvider) {
        console.log('theController...');
        this.dateTime = new Date();
        this.theProvider = theProvider;
    }

})();
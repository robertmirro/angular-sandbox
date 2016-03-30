(function() {
    'use strict';

    var l = console.log.bind(console),
        lb = l.bind(null, '\tBEFORE:'),
        la = l.bind(null, '\tAFTER: ');

    angular
        .module('theApp', [], theModuleConfig)
        .controller('theController', theController)
        .provider('theProvider', theProvider)
        .decorator('theProvider', theProviderDecorator)
        .config(theProviderConfig2)
        .config(theProviderConfigDecorator)
        .provider('theProvider', theOtherProvider)
        .config(theProviderConfig1);

    function theModuleConfig(theProviderProvider) {
        l('theModuleConfig...');
        theProviderProvider.setInternalProperty(' - theModuleConfig');
    }

    function theProviderConfig1(theProviderProvider) {
        l('theProviderConfig1...');
        theProviderProvider.setInternalProperty(' - theProviderConfig1');
    }

    function theProviderConfig2(theProviderProvider) {
        l('theProviderConfig2...');
        theProviderProvider.setInternalProperty(' - theProviderConfig2');
    }

    function theProviderConfigDecorator($provide) {
        l('theProviderConfigDecorator... LOADED');

        $provide.decorator('theProvider', function($delegate) {
            l('theProviderConfigDecorator... DECORATOR');

            lb($delegate);
            $delegate.theInternalProperty = ($delegate.theInternalProperty || '') + ($delegate.theInternalProperty ? ' - ' : '') + 'theProviderConfigDecorator';
            $delegate.theProperty = ($delegate.theProperty || '') + ($delegate.theProperty ? ' - ' : '') + 'theProviderConfigDecorator';
            la($delegate);
            return $delegate;
        });
    }

    function theProviderDecorator($delegate) {
        l('theProviderDecorator...');

        lb($delegate);
        $delegate.theInternalProperty = ($delegate.theInternalProperty || '') + ($delegate.theInternalProperty ? ' - ' : '') + 'theProviderDecorator';
        $delegate.theProperty = ($delegate.theProperty || '') + ($delegate.theProperty ? ' - ' : '') + 'theProviderDecorator';
        la($delegate);
        return $delegate;
    }

    function theProvider() {
        l('theProvider...');

        var theInternalProperty = 'theProviderInternal';

        this.setInternalProperty = function(value) {
            lb(theInternalProperty);
            theInternalProperty += value;
            la(theInternalProperty);
        };
        this.$get = function $get() {
            l('theProvider.$get...', theInternalProperty);
            return {
                theInternalProperty: theInternalProperty,
                theProperty: 'theProvider'
            };
        };
    }

    function theOtherProvider() {
        l('theOtherProvider...');

        var theInternalProperty = 'theOtherProviderInternal';

        this.setInternalProperty = function(value) {
            lb(theInternalProperty);
            theInternalProperty += value;
            la(theInternalProperty);
        };

        this.$get = function $get() {
            l('theOtherProvider.$get...', theInternalProperty);
            return {
                theInternalProperty: theInternalProperty,
                theProperty: 'theOtherProvider'
            };
        };
    }

    function theController(theProvider) {
        l('theController...');
        this.dateTime = new Date();
        this.theProvider = theProvider;
    }

})();
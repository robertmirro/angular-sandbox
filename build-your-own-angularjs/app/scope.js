;(function() {
    'use strict';
    
    var _ = require('lodash');
        
    module.exports = Scope;
    
    // use function reference pointer as initial watch value because its guaranteed to be unique (only equal to itself)
    // this ensures each watch listener is ALWAYS invoked on initial $digest() 
    function initialValue(){}
    
    // handle watch that omits listener
    function noop(){}
        
    function Scope() {
        var scope = this; 
        
        // instantiate Scope with or without new
        if ( !( scope instanceof Scope ) ) {
            return new ( Scope.bind.apply( Scope , [ null ].concat( [].slice.call( arguments ) ) ) );
        }
        
        scope.$$watches = [];
        scope.$$lastDirtyWatch = null;
        scope.$$asyncQueue = [];
    }

    Scope.prototype.$watch = function( fnWatch , fnListener , valueBasedEquality ) {
        var scope = this; 
        
        scope.$$watches.push(
            {
                'fnWatch' : fnWatch ,
                'fnListener' : fnListener || noop , 
                'valueBasedEquality' : !!valueBasedEquality ,
                'previousValue' : initialValue
            }
        );
        scope.$$lastDirtyWatch = null;  // reset in order to accomodate watch added via dirty watch listener
    };
    
    Scope.prototype.$$areEqual = function( newValue , oldValue , valueBasedEquality ) {
        //if ( valueBasedEquality ) {
        //    console.log( '$$areEqual:' , newValue , '-' , oldValue , '-' , _.isEqual( newValue , oldValue ) );
        //}
        
        // isEqual() handles NaN properly, otherwise need to manually handle it
        return valueBasedEquality 
            ? _.isEqual( newValue , oldValue ) 
            : newValue === oldValue || (
                typeof newValue === 'number' && typeof oldValue === 'number' && isNaN( newValue ) && isNaN( oldValue )
                );
    };
    
    Scope.prototype.$$digestOnce = function() {
        var scope = this ,
            digestWasDirty = false ,
            currentValue;
        
        _.forEach( scope.$$watches , function( watch ) {
            currentValue = watch.fnWatch( scope );  // test #2
            //console.log( 'currentValue:', currentValue );

            if ( !scope.$$areEqual( currentValue , watch.previousValue , watch.valueBasedEquality ) /*  currentValue !== watch.previousValue  */ ) {
                digestWasDirty = true;
                scope.$$lastDirtyWatch = watch;
                
                watch.fnListener( 
                    currentValue , 
                    watch.previousValue === initialValue ? currentValue : watch.previousValue , // dont leak value of initialValue on initial $digest(), instead return newValue as oldValue
                    scope 
                );  // test #1
                watch.previousValue = watch.valueBasedEquality ? _.cloneDeep( currentValue ) : currentValue;
            } else if ( watch === scope.$$lastDirtyWatch ) {
                return false;  // short-circuit forEach if this clean watch was last known dirty watch
            }
        });
        
        return digestWasDirty;
    };
    
    Scope.prototype.$digest = function() {
        var scope = this , 
            digestTTL = 10 ,  // Time To Live  
            digestTTLCount = digestTTL;
        
        scope.$$lastDirtyWatch = null;  // reset on each new $digest()
        
        // handle when listeners trigger chained watches in same $digest()
        // invoke $digest() repeatedly until its no longer dirty
        while ( processAsyncQueue( scope ) , scope.$$digestOnce() ) {
            if ( !( digestTTLCount-- ) ) {
                throw new Error( 'Digest TTL (' + digestTTL + ') has been exceeded.' );
            }
        }
        
        function processAsyncQueue( scope ) {
            var asyncTask;
            
            while ( scope.$$asyncQueue.length ) {
                asyncTask = scope.$$asyncQueue.shift();
                asyncTask.scope.$eval( asyncTask.cb , asyncTask.arg );
            }
        }
    };

    Scope.prototype.$eval = function( cb , arg ) {
        var scope = this;
        
        return cb( scope , arg );
    };

    Scope.prototype.$evalAsync = function( cb , arg ) {
        var scope = this;

        scope.$$asyncQueue.push(
            {
                'scope' : scope ,
                'cb' : cb ,
                'arg' : arg
            }
        );
    };
    
    Scope.prototype.$apply = function( cb , arg ) {
        var scope = this;
        
        try {
            return scope.$eval( cb , arg );
        } finally {
            scope.$digest();
        }
    };
    
})();
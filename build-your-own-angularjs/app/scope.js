;(function() {
    'use strict';
    
    module.exports = Scope;
        
    function Scope() {
        // instantiate Scope with or without new
        if ( !( this instanceof Scope ) ) {
            return new ( Scope.bind.apply( Scope , [ null ].concat( [].slice.call( arguments ) ) ) );
        }
        
        this.$$watches = [];
        this.$$lastDirtyWatch = null;
    }
    
    // use function reference pointer as initial watch value because its guaranteed to be unique (only equal to itself)
    // this ensures each watch listener is ALWAYS invoked on initial $digest() 
    function initialValue(){}
    
    // handle watch that omits listener
    function noop(){}

    Scope.prototype.$watch = function( fnWatch , fnListener ) {
        this.$$watches.push(
            {
                'fnWatch' : fnWatch ,
                'fnListener' : fnListener || noop , 
                'previousValue' : initialValue
            }
        );
    };
    
    Scope.prototype.$$digestOnce = function() {
        var scope = this ,
            digestWasDirty = false ,
            watchIndex = 0 ,
            watchesLength = scope.$$watches.length ,
            watch ,
            currentValue;
        
        //[].forEach.call( this.$$watches , function( watch ) { 
        //this.$$watches.forEach( function( watch ) {  // switch to for loop, cannot easily break forEach without try/catch hack
        for ( ; watchIndex < watchesLength; watchIndex++ ) {
            watch = scope.$$watches[ watchIndex ];
            currentValue = watch.fnWatch( scope );  // test #2
            
            //console.log( 'currentValue:', currentValue );
            if ( currentValue !== watch.previousValue ) {
                digestWasDirty = true;
                scope.$$lastDirtyWatch = watch;
                //console.log('digestWasDirty:' , digestWasDirty);
                
                watch.fnListener( 
                    currentValue , 
                    watch.previousValue === initialValue ? currentValue : watch.previousValue , // dont leak value of initialValue on initial $digest(), instead return newValue as oldValue
                    scope 
                );  // test #1
                watch.previousValue = currentValue;
            } else if ( watch === scope.$$lastDirtyWatch ) {
                break;  // short-circuit
            }
        };
        
        return digestWasDirty;
    };
    
    Scope.prototype.$digest = function() {
        var digestTTL = 10 ,  // Time To Live  
            digestTTLCount = digestTTL;
        
        this.$$lastDirtyWatch = null;  // reset on each new $digest()
        
        // handle when listeners trigger chained watches in same $digest()
        // invoke $digest() repeatedly until its no longer dirty
        while ( this.$$digestOnce() ) {
            if ( !( digestTTLCount-- ) ) {
                throw new Error( 'Digest TTL (' + digestTTL + ') has been exceeded.' );
            }
        }
    };
    
})();
;(function() {
    'use strict';
    
    module.exports = Scope;
        
    function Scope() {
        // instantiate Scope with or without new
        if ( !( this instanceof Scope ) ) {
            return new ( Scope.bind.apply( Scope , [ null ].concat( [].slice.call( arguments ) ) ) );
        }
        
        this.$$watchers = [];
    }
    
    // use function reference pointer as initial watcher value because its guaranteed to be unique (only equal to itself)
    // this ensures each watcher listener is ALWAYS invoked on initial $digest() 
    function initialValue(){}
    
    // handle watch that omits listener
    function noop(){}

    Scope.prototype.$watch = function( fnWatch , fnListener ) {
        this.$$watchers.push(
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
            currentValue;
        
        //[].forEach.call( this.$$watchers , function( watcher ) { 
        this.$$watchers.forEach( function( watcher ) {
            currentValue = watcher.fnWatch( scope );  // test #2
            //console.log( 'currentValue:', currentValue );
            if ( currentValue !== watcher.previousValue ) {
                digestWasDirty = true;
                //console.log('digestWasDirty:' , digestWasDirty);
                
                watcher.fnListener( 
                    currentValue , 
                    watcher.previousValue === initialValue ? currentValue : watcher.previousValue , // dont leak value of initialValue on initial $digest(), instead return newValue as oldValue
                    scope 
                );  // test #1
                watcher.previousValue = currentValue;
            }
        });
        
        return digestWasDirty;
    };
    
    Scope.prototype.$digest = function() {
        // handle when listeners trigger chained watchers in same $digest()
        // invoke $digest() repeatedly until its no longer dirty
        while ( this.$$digestOnce() ) {}
    };
    
})();
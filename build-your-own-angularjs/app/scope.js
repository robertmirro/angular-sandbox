;(function() {
    'use strict';
    
    module.exports = Scope;
        
    function Scope() {
        this.$$watchers = [];
    }
    
    // use function reference pointer as initial watcher value because its guaranteed to be unique (only equal to itself)
    // this ensures each watcher listener is ALWAYS invoked on initial $digest() 
    function initialValue() {}

    Scope.prototype.$watch = function( fnWatch , fnListener ) {
        this.$$watchers.push(
            {
                'fnWatch' : fnWatch ,
                'fnListener' : fnListener , 
                'previousValue' : initialValue
            }
        );
    };
    
    Scope.prototype.$digest = function() {
        var scope = this;
        var currentValue;
        
        [].forEach.call( this.$$watchers , function( watcher ) { 
            currentValue = watcher.fnWatch( scope );  // test #2
            if ( currentValue !== watcher.previousValue ) {
                watcher.fnListener( currentValue , watcher.previousValue , scope );  // test #1
                watcher.previousValue = currentValue;
            }
        });
    };
    
})();
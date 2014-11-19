;(function() {
    'use strict';
    
    module.exports = Scope;
        
    function Scope() {
        this.$$watchers = [];
    }

    Scope.prototype.$watch = function( fnWatch , fnListener ) {
        this.$$watchers.push(
            {
                'fnWatch' : fnWatch ,
                'fnListener' : fnListener
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
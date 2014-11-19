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
        [].forEach.call( this.$$watchers , function( watcher ) { 
            watcher.fnListener(); 
        });
    };
    
})();
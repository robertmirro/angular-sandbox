(function () {
    'use strict';

    // implement a DIY injector

    var namespace = {
        HelloWorld : {
            hello : function hello() {
                console.log( 'Hello World!' );
            }
        }            
    };

    var injector = function injector( name ) {
        var _namespace = namespace[ name ];
        // console.log( '_namespace:' , _namespace );
        
        return {
            invoke : function invoke( input ) {
                // assume cb is last element of "input" array
                var cb = input[ input.length - 1 ];

                // get all args before cb
                var args = input.splice( 0 , input.length - 1 );
                // console.log( 'args:' , args );

                // populate "funcs" with reference to each namespace function which was passed as an arg to .invoke()
                var funcs = args.map( function map( arg ) {
                    return _namespace[ arg ];
                });
                // console.log( 'funcs:' , funcs );

                // invoke cb and pass array of functions as params that cb needs to call
                cb.apply( null , funcs );
            }
        };
    };

    // specify that our DIY injector should use the "HelloWorld" namespace
    var myInjector = injector( 'HelloWorld' );

    // we want access to namespace.HelloWorld function(s) 
    myInjector.invoke( [ 'hello' , 'someOtherMethod' , function( hello ) {
        console.log( 'myInjector.invoke()' );
        console.log( 'args passed:' , arguments );
        hello();
    }]);

})();



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
                // "input" param could be: 
                // 1. an array using injector array syntax 
                // OR 
                // 2. non-array injector syntax, handle either scenario

                var cb, args;

                if ( angular.isArray( input ) ) {
                    console.log( ' input isArray:' , input );

                    // assume cb is last element of "input" array
                    cb = input[ input.length - 1 ];
                    // console.log( 'cb:' , cb );

                    // get all args before cb
                    args = input.splice( 0 , input.length - 1 );
                    // console.log( 'args:' , args );
                } else {
                    var funcString = input.toString();
                    // console.log( 'funcString:' , funcString );

                    // cb function is only value passed to invoke() using DI non-array syntax
                    cb = input;

                    // grab args that were specified inside of cb so that we can determine what we need to inject
                    // EX below: myInjector.invoke( function( hello , someOtherMethod ) {
                    //      we are trying to extract "hello" and "someOtherMethod"    
                    //
                    // uncomment this line to see full regex match
                    // args = funcString.match( /function \((.*)\) / )
                    args = funcString
                        .match( /function \((.*)\) / )[1]
                        .split(',')
                        .map( function( arg ) { /*console.log( 'arg:|%s|%s|' , arg , arg.trim() );*/ return arg.trim(); } )
                        ;
                    // console.log( 'args:' , args );
                }

                // populate "funcs" with reference to each namespace function which was passed as an arg to .invoke()
                var funcs = args.map( function map( arg ) {
                    return _namespace[ arg ];
                });
                console.log( 'funcs:' , funcs );

                // invoke cb and pass array of functions as params that cb needs to call
                cb.apply( null , funcs );
            }
        };
    };

    // specify that our DIY injector should use the "HelloWorld" namespace
    var myInjector = injector( 'HelloWorld' );

    // UNCOMMENT to test DI array syntax
    // we want access to namespace.HelloWorld function(s) using DI array syntax
    myInjector.invoke( [ 'hello' , 'someOtherMethod' , function( hello ) {
        console.log( 'myInjector.invoke array syntax()' );
        console.log( 'args passed:' , arguments );
        hello();
    }]);
    console.log('');

    // UNCOMMENT to test DI non-array syntax
    // we want access to namespace.HelloWorld function(s) using DI non-array syntax
    myInjector.invoke( function( hello , someOtherMethod ) {
        console.log( 'myInjector.invoke NON-array syntax()' );
        console.log( 'args passed:' , arguments );
        hello();
    });
    console.log('');

})();



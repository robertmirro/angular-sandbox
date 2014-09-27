(function () {
    'use strict';

    // // specify our namespace as "HelloWorld"
    // // NOTE: angulars internam namespace is "ng"
    // var app = angular.module( 'HelloWorld' , [] );

    // // use angular DI to inject $scope and $rootScope into controller, add $compile too
    // // NOTE: these objects are not generally available unless they are injected 
    // // NOTE: the order of the injected objects does not matter
    // // app.controller( 'World' , function( $scope , $rootScope , $compile ) {
    // //     console.log( '$rootScope:' , $rootScope );
    // //     $scope.text = 'World';
    // //     console.log( $scope );
    // //     console.log( $compile );
    // // });

    // // could also use array syntax to specify DI for the controller
    // // NOTE: this is similar to AMD and now ORDER MATTERS
    // app.controller( 'World' , [ '$scope' , '$rootScope' , '$compile' , function( $scope , $rootScope , $compile ) {
    //     $scope.text = 'Worldddd';
    //     console.log( $scope );

    //     console.log( '$rootScope:' , $rootScope );
    //     console.log( $compile );
    // }]);

    // app.directive( 'hello' , function() {
    //     return {
    //         restrict : 'A' ,
    //         template : '<input ng-model="text" /><p>Hello {{ text }}!</p>' ,
    //         controller : 'World'
    //     }
    // });

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
        _namespace.hello();

        return {
            invoke : function invoke( input ) {
                // assume cb is last element of "input" array
                var cb = input[ input.length - 1 ];
                var args = input.splice( 0 , input.length - 1 );
                // console.log( 'args:' , args );

                var funcs = args.map( function map( arg ) {
                    return _namespace[ arg ];
                });
                console.log( 'funcs:' , funcs );

                cb( _namespace.hello );
            }
        };
    };

    // specify that our injector should use the "HelloWorld" namespace
    var myInjector = injector( 'HelloWorld' );

    // we want access to namespace.HelloWorld function(s) 
    myInjector.invoke( [ 'hello' , 'hello again...' , function( hello ) {
        console.log( 'myInjector.invoke()' );
        hello();
    }]);

})();



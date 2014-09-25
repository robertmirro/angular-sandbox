(function () {
    'use strict';

    // var app = angular.module( 'HelloWorld' , [] );

    // app.controller( 'World' , function( $scope ) {
    //     $scope.text = 'World';
    //     console.log( $scope );
    // });

    // app.directive( 'hello' , function() {
    //     return {
    //         restrict : 'A' ,
    //         template : '<input ng-model="text" /><p>Hello {{ text }}!</p>' ,
    //         controller : 'World'
    //     }
    // });

    // this injector logic is mainly to demonstrate how angular works under the hood
    // we normally would not invoke the injector directly
    // this code simulates that angular has parsed html, found a custom directive and now needs to know how to handle it...
    var injector = angular.injector( [ 'ng' ] );
    injector.invoke( [ '$compile' , '$rootScope' , function ( $compile , $rootScope ) {
        
        // angular has access to .controller() and .directive() above internally 
        //      but we do not so we will simulate that functionality below:

        // simulate a controller similar to the above
        var World = function( scope ) {
            scope.text = 'Woooorld';
        };

        // simulate a directive similar to the above
        var hello = {
            template : '<input ng-model="text" /><p>Hello {{ text }}!</p>' ,
            controller : World   // direct reference to method, not a string value
        };

        // use $compile to render markup from tempate, pass it a template string (can also pass DOM object)
        // phase 1 - calling $compile returns a template function (template is not associated to a scope at this phase)
        var templateFunction = $compile( hello.template );

        // each angular app has a $rootScope - it is the initial scope object created for every angular app
        // under the hood, when angular encounters a controller in a template, it creates a new scope
        //      based off of the rootScope (a copy of rootScope), which is then passed into the template.
        var scope = $rootScope.$new();

        // set scope by passing scope to controller
        World( scope );

        console.log( 'scope.text' , scope.text );
        console.log( '$rootScope.text' , $rootScope.text );  // ensure .text is NOT also set on rootScope
        // scope.text Woooorld
        // $rootScope.text undefined 

        // phase 2 - render template using scope that has been set by controller
        var element = templateFunction( scope );

        // jQuery-like element, an array of raw DOM elements
        console.log( element );
        // [input.ng-scope.ng-pristine.ng-untouched.ng-valid, p.ng-binding.ng-scope, ready: function, toString: function, eq: function, push: function, sort: function…]
        //     0: input.ng-scope.ng-pristine.ng-untouched.ng-valid
        //     1: p.ng-binding.ng-scope
        //     length: 2
        //     __proto__: Object[0]        

        // angular has not inserted the scope .text value into our expression yet
        console.log( element[1].innerHTML );
        // Hello {{ text }}! 

        // phase 3 - need to invoke $digest on the scope to process expressions
        // NOTE: digest() may be called later on too (such as after .appendChild() below), 
        //      meaning it is not critical to call it at this point on the timeline.
        scope.$digest();

        console.log( element[1].innerHTML );
        // Hello Woooorld! 

        // NOTE: using this manual injector logic, <input> is 2-way bound to text but initial text value
        //      is not populated in <input>.
        Array.prototype.slice.call( element ).forEach( function( element ) {
            console.log( 'element: %O' , element );
            document.body.appendChild( element );
        });

    }]);

})();



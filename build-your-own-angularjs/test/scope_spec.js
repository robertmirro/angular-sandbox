;(function() {
    'use strict';
    
    var expect = require('chai').expect ,
        util = require('util') ,
        Scope = require('../app/scope');


    describe( 'Scope' , function() {

        describe( 'scope as object' , function() {
            it( 'should be constructed as object' , function() {
                var scope = new Scope();
                scope.propertyOne = 1;

                expect( scope.propertyOne).to.equal( 1 );
            });
        });

    });
})();


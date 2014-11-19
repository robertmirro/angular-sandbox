;(function() {
    'use strict';
    
    var chai = require('chai') ,
        expect = chai.expect ,
        sinon = require('sinon') ,
        sinonChai = require('sinon-chai') ,
        util = require('util') ,
        Scope = require('../app/scope');
    
    chai.use( sinonChai );

    describe( 'Scope' , function() {

        describe( 'scope as object' , function() {
            it( 'should be constructed as object' , function() {
                var scope = new Scope();
                scope.propertyOne = 1;

                expect( scope.propertyOne ).to.equal( 1 );
            });
        });
        
        describe( 'digest' , function() {
            var scope;
            
            beforeEach( function() {
                scope = new Scope();
            });
            
            it( 'call watch listener of first $digest' , function() {
                var fnWatch = function() {
                    return 'watch function';
                };
                var fnListener = sinon.spy();
                
                scope.$watch( fnWatch , fnListener );
                scope.$digest();
                
                expect( fnListener ).to.have.been.called;
            });
        });

    });
    
})();


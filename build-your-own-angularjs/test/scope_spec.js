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
                    //console.log( 'fnWatch args:' , arguments );
                    return 'watch function';
                };
                var fnListener = sinon.spy();
                
                scope.$watch( fnWatch , fnListener );
                scope.$digest();
                
                expect( fnListener ).to.have.been.called; // test #1
            });

            it( 'call watch with scope as first arg' , function() {
                var fnWatch = sinon.spy();
                var fnListener = function(){};
                
                scope.$watch( fnWatch , fnListener );
                scope.$digest();
                
                expect( fnWatch ).to.have.been.calledWith( scope ); // test #2
            });

            it( 'call watch listener when watch value changes' , function() {
                scope.theValue = 'robert';
                scope.changeCount = 0;

                var fnWatch = function( scope ){
                    return scope.theValue;
                };
                var fnListener = function( newValue , oldValue , scope ){
                    //console.log( 'fnListener: newValue: %s , oldValue: %s' , newValue , oldValue );
                    scope.changeCount++;
                };
                scope.$watch( fnWatch , fnListener );
                
                //console.dir( scope );
                
                expect( scope.changeCount ).to.equal( 0 );
                
                scope.$digest();
                expect( scope.changeCount ).to.equal( 1 );  // counter incremented on initial digest()

                //console.dir( scope );
                
                scope.$digest();
                expect( scope.changeCount ).to.equal( 1 );

                scope.theValue = 'bob';
                expect( scope.changeCount ).to.equal( 1 );

                scope.$digest();
                expect( scope.changeCount ).to.equal( 2 );  // counter incremented on next digest() after change of theValue
                
                //console.dir( scope );
            });

            it( 'call watch listener when watch value is initially an undefined value' , function() {
                scope.changeCount = 0;

                var fnWatch = function( scope ){
                    return scope.theValue;
                };
                var fnListener = function( newValue , oldValue , scope ){
                    console.log( 'fnListener: newValue: %s , oldValue: %s' , newValue , oldValue );
                    scope.changeCount++;
                };
                scope.$watch( fnWatch , fnListener );
                
                scope.$digest();
                expect( scope.changeCount ).to.equal( 1 );  // counter incremented on initial digest()
            });
            
        });

    });
    
})();


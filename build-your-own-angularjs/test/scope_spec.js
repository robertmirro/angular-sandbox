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
                    return 'watch function return value';
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
                expect( scope.changeCount ).to.equal( 1 );  // no value change, count remains the same

                scope.theValue = 'bob';
                expect( scope.changeCount ).to.equal( 1 );  // value changed, $digest() not invoked, count remains the same

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
                    //console.log( 'fnListener: newValue: %s , oldValue: %s' , newValue , oldValue );
                    scope.changeCount++;
                };
                scope.$watch( fnWatch , fnListener );
                
                scope.$digest();
                expect( scope.changeCount ).to.equal( 1 );  // no value or value change, counter incremented on initial digest()
            });

            it( 'call watch listener with newValue as oldValue when watch value is initially an undefined value' , function() {
                scope.theValue = 4848;
                scope.changeCount = 0;
                
                var oldValueParamValue;

                var fnWatch = function( scope ){
                    return scope.theValue;
                };
                var fnListener = function( newValue , oldValue , scope ){
                    //console.log( 'fnListener: newValue: %s , oldValue: %s' , newValue , oldValue );
                    scope.changeCount++;
                    oldValueParamValue = oldValue;
                };
                scope.$watch( fnWatch , fnListener );
                
                scope.$digest();
                expect( oldValueParamValue ).to.equal( 4848 );  // oldValue returned as newValue on initial $digest()
            });

            it( 'watch that omits listener' , function() {
                // watch is returing a value below, but in reality, a watch with an omitted listener should return no value (undefined)
                var fnWatch = sinon.spy( function() { return 'some unimportant value'; }  );
                scope.$watch( fnWatch );
                
                scope.$digest();
                expect( fnWatch ).to.have.been.called; 
            });

            it( 'listener triggers chained watcher during digest' , function() {
                scope.name = 'Robert';

                // order of watchers is deliberate
                // dependent nameUpper watcher is intentionally first because otherwise test would pass as a result of watcher registration order
                var fnWatchNameUpper = function( scope ){
                    return scope.nameUpper;
                };
                var fnListenerNameUpper = function( newValue , oldValue , scope ){
                    //console.log( 'fnListenerNameUpper: newValue: %s , oldValue: %s' , newValue , oldValue );
                    if ( newValue ) {
                        scope.initial = newValue.substring( 0 , 1 ) + '.';
                    }
                };
                scope.$watch( fnWatchNameUpper , fnListenerNameUpper );

                var fnWatchName = function( scope ){
                    return scope.name;
                };
                var fnListenerName = function( newValue , oldValue , scope ){
                    //console.log( 'fnListenerName: newValue: %s , oldValue: %s' , newValue , oldValue );
                    if ( newValue ) {
                        scope.nameUpper = newValue.toUpperCase();
                    }
                };
                scope.$watch( fnWatchName , fnListenerName );
                
                scope.$digest();
                expect( scope.initial ).to.equal( 'R.' ); 

                scope.name = 'Bob';
                scope.$digest();
                expect( scope.initial ).to.equal( 'B.' ); 

            });
            
        });

    });
    
})();


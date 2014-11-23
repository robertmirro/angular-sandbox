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

            it( 'call watch listener with newValue as oldValue on initial invocation' , function() {
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

            it( 'listener triggers chained watch during digest' , function() {
                scope.name = 'Robert';

                // order of watchs is deliberate
                // dependent nameUpper watch is intentionally first because otherwise test would pass as a result of watch registration order
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
            
            it( 'abandon digest if chained watches exceed (x) TTL iterations' , function() {
                scope.countOne = 0;
                scope.countTwo = 0;

                var fnWatchCountOne = function( scope ){
                    return scope.countOne;
                };
                var fnListenerCountOne = function( newValue , oldValue , scope ){
                    //console.log( 'fnListenerCountOne: newValue: %s , oldValue: %s' , newValue , oldValue );
                    scope.countTwo++;
                };
                scope.$watch( fnWatchCountOne , fnListenerCountOne );

                var fnWatchCountTwo = function( scope ){
                    return scope.countTwo;
                };
                var fnListenerCountTwo = function( newValue , oldValue , scope ){
                    //console.log( 'fnListenerCountTwo: newValue: %s , oldValue: %s' , newValue , oldValue );
                    scope.countOne++;
                };
                scope.$watch( fnWatchCountTwo , fnListenerCountTwo );
                
                expect( function(){ scope.$digest(); } ).to.throw( Error );
            });

            it( 'short-circuit digest when last dirty watch is clean' , function() {
                var numberOfWatches = 100 , 
                    watchesInspected;
                
                scope.watchArray = Array.apply( null , new Array( numberOfWatches ) ).map( function( e , i ){ return ++i; } );
                
                scope.watchArray.forEach( function( e , i ) {
                    scope.$watch(
                        function( scope ) {
                            watchesInspected++;
                            return scope.watchArray[ i ]; 
                        } , 
                        function( newValue , oldValue , scope ) {
                        }
                    );
                });
                
                watchesInspected = 0;
                scope.$digest();
                expect( watchesInspected ).to.equal( numberOfWatches * 2 ); // all watches dirty, must invoke full $digest() twice
                
                watchesInspected = 0;
                scope.watchArray[ 0 ] = 4848;
                scope.$digest();
                expect( watchesInspected ).to.equal( numberOfWatches + 1 );  // only init watch dirty, invoke full $digest() once, short-circuit on next iteration of clean init watch
            });

            it( 'reset digest short-circuit when dirty watch listener adds new watch' , function() {
                scope.theValue = 'robert';
                
                var theCount = 0;

                scope.$watch(
                    function( scope ) {
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ) {
                        scope.$watch(
                            function( scope ) {
                                return scope.theValue; 
                            } , 
                            function( newValue , oldValue , scope ) {
                                theCount++;
                            }
                        );
                    }
                );
                
                scope.$digest();
                expect( theCount ).to.equal( 1 );
            });
            
            it( 'compare via value-based dirty checking on reference type' , function() {
                scope.theValue = [ 1 , 2 , 3 , 4 ];
                
                var theCount = 0;

                scope.$watch(
                    function( scope ) {
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ) {
                        theCount++;
                    } ,
                    true  // invoke value-based dirty checking on reference type
                );
                
                scope.$digest();
                expect( theCount ).to.equal( 1 );

                scope.theValue.push( 88 );
                scope.$digest();
                expect( theCount ).to.equal( 2 );
            });

            it( 'handle NaN equality issue' , function() {
                scope.theValue = 0 / 0;  // NaN
                
                var theCount = 0;

                scope.$watch(
                    function( scope ) {
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ) {
                        theCount++;
                    }
                );
                
                scope.$digest();
                expect( theCount ).to.equal( 1 );

                scope.$digest();
                expect( theCount ).to.equal( 1 );

            });

            it( 'execute $eval function, return result' , function() {
                scope.theValue = 4;
                
                var returnValue = scope.$eval( function( scope ) {
                    return scope.theValue;
                });
                
                expect( returnValue ).to.equal( 4 );
            });

            it( 'pass through param/value sent to $eval' , function() {
                scope.theValue = 44;
                
                var returnValue = scope.$eval( function( scope , arg ) {
                    return scope.theValue + arg;
                } , 4 );
                
                expect( returnValue ).to.equal( 48 );
            });

            it( 'execute $apply function, invoke digest cycle' , function() {
                scope.theValue = 'robert';
                
                var theCount = 0;

                scope.$watch(
                    function( scope ) {
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ) {
                        theCount++;
                    }
                );
                
                scope.$digest();
                expect( theCount ).to.equal( 1 );
                
                scope.$apply( function( scope ) {
                    scope.theValue = 'bob';
                });
                                                
                expect( theCount ).to.equal( 2 );
            });

            it( 'execute $evalAsync function later in same digest cycle' , function() {
                scope.theValue = 'robert';
                scope.asyncEvaluated = false;
                scope.asyncEvaluatedImmediately = false;

                scope.$watch(
                    function( scope ) {
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ) {
                        scope.$evalAsync( function( scope ) {
                            scope.asyncEvaluated = true;
                        });
                        scope.asyncEvaluatedImmediately = scope.asyncEvaluated;
                    }
                );
                
                scope.$digest();
                expect( scope.asyncEvaluated ).to.equal( true );
                expect( scope.asyncEvaluatedImmediately ).to.equal( false );
            });

            it( 'execute $evalAsync functions added via watch functions' , function() {
                scope.theValue = 'robert';
                scope.asyncEvaluatedCount = 0;

                scope.$watch(
                    function( scope ) {
                        // $evalAsync is added twice but $digest() is only called twice, not the necessary 3 times
                        // asyncQueue is only procesed twice (once before first $evalAsync and once before second $evalAsync)
                        if ( scope.asyncEvaluatedCount < 2 ) {
                            scope.$evalAsync( function( scope ) {
                                scope.asyncEvaluatedCount++;
                            });
                        }
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ){}
                );
                
                scope.$digest();
                expect( scope.asyncEvaluatedCount ).to.equal( 2 );
            });

            it( 'execute $evalAsync functions via watch functions infinitely, TTL' , function() {
                scope.theValue = 'robert';

                scope.$watch(
                    function( scope ) {
                        scope.$evalAsync( function( scope ){});
                        return scope.theValue; 
                    } , 
                    function( newValue , oldValue , scope ){}
                );
                
                expect( function(){ scope.$digest(); } ).to.throw( Error );
            });
            
        });

    });
    
})();


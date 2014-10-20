var express = require('express') ,
    app = express(),
    dateFormat = require('dateformat') ,
    requestNum = 0;

dateFormat.masks.atDayTime = 'dddd, mm/dd/yyyy "at" h:MM:ss TT';

app.set( 'json spaces' , 4 );  // (1) pretty print
//app.set( 'json replace' , replacerFunction );  // pretty print

app.use( function( request , response , next ) {
    console.log( 'request: %s for "%s" on %s' , ++requestNum , request.url , dateFormat( new Date() , 'atDayTime' ) );
    next();
});

// both formats work in express 4
//
//app.use( express.static( __dirname , '/' ) );
app.use( '/' , express.static( __dirname ) );

app.get('/people', function(req, res) {
    console.log( 'people...' );
    
    // uncomment to test error handling
    //res.json( 500 , { error : 'An error has occurred!' } ) ;
    
    // comment to test error handling
    res.json(people);
    
    //res.end( JSON.stringify( people , null , '    ' ) );  // (2) pretty print
});

app.get('/person/:id', function( req , res ) {
    var personId = parseInt( req.params.id );
    var data = {};

    console.log( 'person - id:' , personId );

    for ( var i = 0 , len = people.length ; i < len; i++ ) {
        if ( people[ i ].id === personId ) {
           data = people[ i ];
           break;
        }
    }  
    res.json( data );
});

app.listen( process.argv[2] || 8080 , function() {
    console.log( 'HTTP Server listening on port' , this.address().port );
});

var people = [
    {  
        id:1,
        name:'Robert',
        city:'Alexandria',
        rate:9.99,
        joined:'2014-01-10',
        orderTotal: 9.9956,
        orders: [
            {
                id: 1,
                product:'Shoes',
                total: 9.9956
            }
        ]
    } ,
    {  
        id:2,
        name:'Rob',
        city:'DC',
        rate:4.84,
        joined:'2014-02-04',
        orderTotal: 19.95,
        orders: [
            {
                id: 2,
                product:'Baseball',
                total: 5.95
            },
            {
                id: 3,
                product:'Bat',
                total: 14.00
            },
        ]
    } ,
    {  
        id:3,
        name:'Bob',
        city:'Philly',
        rate:6.9,
        joined:'2014-04-08',
        orderTotal: 48.4,
        orders: [
            {
                id: 5,
                product:'Jumprope',
                total: 12.88
            },
            {
                id: 6,
                product:'Kettlebell',
                total: 28.99
            },
            {
                id: 7,
                product:'Water bottle',
                total: 6.53
            }
        ]
    } ,
    {  
        id:4,
        name:'Bobby',
        city:'Scranton',
        rate:48.13345,
        joined:'2014-08-04',
        orderTotal: 4.8,
        orders: [
            {
                id: 8,
                product:'Protein bar',
                total: 4.8
            }
        ]
    }
];

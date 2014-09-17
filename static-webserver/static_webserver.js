var express = require('express') ,
    app = express() ,
    dateFormat = require('dateformat') ,
    requestNum = 0;

dateFormat.masks.atDayTime = 'dddd, mm/dd/yyyy "at" h:MM:ss TT';

app.use( function( request , response , next ) {
    // console.log( '__dirname' , __dirname );
    console.log( 'request: %s for "%s" on %s' , ++requestNum , request.url , dateFormat( new Date() , 'atDayTime' ) );
    next();
});

//app.use( express.static( __dirname ) );

app.use( '/' , express.static( 'C:/Dev/GitRepos/angular-sandbox/shaping-up-with-angular/levels/4.1' ) );
app.use( '/' , express.static( 'C:/Dev/GitRepos/angular-sandbox/shaping-up-with-angular' ) );

app.use( function( request , response , next ) {
    console.log( '    [FILE NOT FOUND]' );
    next();
});

app.listen( process.argv[2] || 8080 , function() {
    console.log( 'HTTP Server listening on port' , this.address().port );
});

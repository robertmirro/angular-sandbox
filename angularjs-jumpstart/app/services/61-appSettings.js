(function () {
    'use strict';
    
    // register value with angular
    angular.module( 'peopleApp' )
        // values can NOT be injected into .config()
        .value( 'AppValueSettings' , {
            title : 'People Application' ,
            version : '1.0' 
        }) 
        // however, constants can be injected into .config()
        .constant( 'AppConstantSettings' , {
            title : 'People Application (beta)' ,
            version : '0.9' 
        });

    
})();
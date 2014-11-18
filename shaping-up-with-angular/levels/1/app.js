(function () {
    var app = angular.module( 'store' , [] );

    app.controller( 'StoreController' , function( $scope ) {
        this.products = gems;
        console.log( '$scope:' , $scope );
    });

    var gems = [ 
        {
            name : 'Dodecahedron' ,
            price : 2.95 ,
            description : 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.' , 
            canPurchase : true , 
            soldOut : false
        } , 
        {
            name : 'Pentagonal Gem' ,
            price : 5.95 ,
            description : 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.' , 
            canPurchase : false , 
            soldOut : false
        } , 
    ];
})();

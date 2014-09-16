(function () {
    var app = angular.module( 'store' , [] );

    app.controller( 'StoreController' , function() {
        this.products = gems;
    });

    var gems = [ 
        {
            name : 'Dodecahedron' ,
            price : 2 ,
            description : 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.' , 
            canPurchase : true , 
            soldOut : false , 
            images : [
                { 
                    full : '../../angular_full.png' , 
                    thumb : '../../angular_thumb.png' 
                }
            ]
        } , 
        {
            name : 'Pentagonal Gem' ,
            price : 5.95 ,
            description : 'Some gems have hidden qualities beyond their luster, beyond their shine... Dodeca is one of those gems.' , 
            canPurchase : false , 
            soldOut : false ,
            images : [
                { 
                    full : '../../angular_full.png' , 
                    thumb : '../../angular_thumb.png' 
                }
            ]
        } , 
    ];
})();

(function () {
    var app = angular.module( 'store' , [] );

    app.controller( 'StoreController' , function() {
        this.products = gems;
    });

    app.controller( 'PanelController' , function() {
        this.tab = 1;  // set "tab" property in lieu of ng-init to set initial tab

        this.selectTab = function( tab ) {
            this.tab = tab;
        };

        this.isSelected = function( tab ) {
            return tab == this.tab;
        }
    });

    app.controller( 'ReviewController' , function() {
        this.review = {};

        this.addReview = function( product ) {
            product.reviews.push( this.review );
            this.review = {};  // reset form after submit, reset live 2-way bound review fields
        };
    });

    // use custom directive to display product name/price instead of using ng-include to load product-title.html.
    // directive tag name translates to directive name referenced below in the JS.
    //   NOTE: dash in tag name translates to camelCase JS name
    //     ex: tag = <product-title> -->  productTitle JS name
    app.directive( 'productTitle' , function() {
        // return a directive definition object
        return {
            restrict: 'E' ,  // directive type: E = Element , A = Attribute
            templateUrl: 'product-title.html'
        };
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
            ] ,
            reviews : [
                {
                    stars : 5 ,
                    body : 'This is a great product!' ,
                    author : 'joe@schmoe.com'
                } ,
                {
                    stars : 2 ,
                    body : 'This is a product that can use some work.' ,
                    author : 'henry@hater.com'
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
            ] ,
            reviews : [
                {
                    stars : 4 ,
                    body : 'This is a decent product!' ,
                    author : 'joe@schmoe.com'
                } ,
                {
                    stars : 3 ,
                    body : 'This is a product that can use some work but not a lot.' ,
                    author : 'henry@hater.com'
                } 
            ]
        } , 
    ];
})();

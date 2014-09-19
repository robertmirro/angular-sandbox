(function () {
    // NOTE: "store-products" is now a dependency of "store"
    var app = angular.module( 'store' , [ 'store-products' ] );

    app.controller( 'StoreController' , [ '$http' , function( $http ) {
        var store = this;
        store.products = [];

        $http.get( '/products.json' ).success( function( jsonData ) {
            store.products = jsonData;
        });

    }]);

})();

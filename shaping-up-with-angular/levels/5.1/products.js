//
// define a new module for product related functionality ,
// migrate product functionality form app_custom_directive.js to here.
//
(function () {
    var app = angular.module( 'store-products' , [] );

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

    app.directive( 'productTabs' , function() {
        return {
            restrict : 'E' , 
            templateUrl : 'product-tabs.html' ,
            controller : function() {
                this.tab = 1;  // set "tab" property in lieu of ng-init to set initial tab

                this.selectTab = function( tab ) {
                    this.tab = tab;
                };

                this.isSelected = function( tab ) {
                    return tab == this.tab;
                }
            } ,
            controllerAs : 'panel'
        };

    });

})();

(function() {
    'use strict';

    angular
        .module('theApp', [])
        .controller('theController', theController);

    function theController() {
        this.dateTime = new Date();
        this.dateTimeLater = new Date();
        this.dateTimeLater.setDate(this.dateTimeLater.getDate() + 1);
    }

})();
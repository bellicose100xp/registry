(function () {
    'use strict';

    angular
        .module('registry', ['firebase'])
        .controller('mainController', mainController)

    function mainController($firebase) {

        var mc = this;
        mc.isCompleted = false;
        var ref = new Firebase("https://buggy.firebaseio.com/");
        var sync = $firebase(ref);

        mc.data = sync.$asArray();

        mc.addCustomer = function (firstName, lastName, tel, suitSyle) {
            mc.date = Date.now();
            mc.data.$add({firstName: firstName, lastName: lastName, tel: tel, suitStyle: suitSyle, dateAdded: mc.date, isCompleted: mc.isCompleted});
            mc.firstName = mc.lastName = mc.tel = mc.suitStyle = mc.date = "";
        }

    }


}());
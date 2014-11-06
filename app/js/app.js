(function(){
    'use strict';

    angular
        .module('registry',['firebase'])
        .controller('mainController',mainController)

    function mainController($firebase){

        var mc = this;

        var ref = new Firebase("https://buggy.firebaseio.com/");
        var sync = $firebase(ref);

        mc.data = sync.$asArray();

        mc.addCustomer = function(firstName, lastName, tel, suitSyle) {
            mc.data.$add({firstName: firstName, lastName: lastName, tel: tel, suitStyle: suitSyle});
            mc.firstName = mc.lastName = mc.tel = mc.suitStyle = "";
        }

    }


}());
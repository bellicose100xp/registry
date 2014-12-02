/**
 * Created by buggy on 12/1/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('searchController',searchController);

    function searchController($firebase, FIREBASE_URL, currentAuth){

        var sc = this;

        //for header sorting
        sc.orderByField = 'dateAdded';
        sc.reverseSort = true;

        var ref = new Firebase(FIREBASE_URL);
        var sync = $firebase(ref);

        this.data = sync.$asArray();

        sc.systemUser = function(){
            return currentAuth.password.email === 'admin@4hso.com';
        };

    }

}());
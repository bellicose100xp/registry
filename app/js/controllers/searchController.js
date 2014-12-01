/**
 * Created by buggy on 12/1/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('searchController',searchController);

    function searchController($firebase, FIREBASE_URL){

        var sc = this;

        var ref = new Firebase(FIREBASE_URL);
        var sync = $firebase(ref);

        this.data = sync.$asArray();

    }

}());
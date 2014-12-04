/**
 * Created by buggy on 12/3/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .factory('myAuthService',myAuthService);

    function myAuthService($firebaseAuth, FIREBASE_URL){

        var service = {};

        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);

        service.requireAuthentication = function () {
            return authObj.$requireAuth();
        };

        return service;
    }

}());
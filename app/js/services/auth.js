/**
 * Created by buggy on 12/3/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .factory('myAuthService', myAuthService);

    function myAuthService($firebaseAuth, FIREBASE_URL) {

        var service = {};

        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);

        // check auth status for routes, it returns a promise for the route to resolve
        service.requireAuthentication = function () {
            return authObj.$requireAuth();
        };

        // log user out
        service.logout = function () {
            authObj.$unauth();
        };

        return service;
    }

}());
/**
 * Created by buggy on 11/26/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('statusController', statusController);

    function statusController($firebaseAuth, FIREBASE_URL) {

        var sc = this;

        var ref = new Firebase(FIREBASE_URL);
        sc.authObj = $firebaseAuth(ref);

        sc.authObj.$onAuth(function (authData) {
            if (authData) {
                sc.userEmail = authData.password.email;
            }

            // works but only if you stay on this page
            else {
                sc.userEmail = null;
                console.log("no user is currently logged in");
            }

        });

        sc.logout = function(){
            sc.authObj.$unauth();
        }

    }
}());
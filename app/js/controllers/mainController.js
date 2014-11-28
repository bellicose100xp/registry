/**
 * Created by buggy on 11/10/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('mainController', mainController);

    function mainController($scope, $firebase, $timeout, FIREBASE_URL) {

        var mc = this;
        mc.firstName = mc.lastName = mc.tel = mc.suitStyle = mc.date = null;
        mc.isCompleted = false;
        var ref = new Firebase(FIREBASE_URL);
        var sync = $firebase(ref);

        mc.saveButtonClicked = true;
        mc.needsValidation = true;

        mc.data = sync.$asArray();

        mc.addCustomer = function (isValid) {

            // submit only if the form is valid
            if (isValid) {
                //mc.date = Date.now();
                mc.data
                    .$add({
                        firstName: mc.firstName,
                        lastName: mc.lastName,
                        tel: mc.tel,
                        suitStyle: mc.suitStyle,
                        dateAdded: Firebase.ServerValue.TIMESTAMP,
                        isCompleted: mc.isCompleted
                    })
                    .then(function () {

                        // reset all ng-model bindings to empty string so it doesn't get submitted twice
                        mc.firstName = mc.lastName = mc.tel = mc.suitStyle = mc.date = "";

                        // set the form status back to untouched status so it doesn't show any error after pressing submit button
                        $scope.registryForm.$setUntouched();

                        // show that the submit action is successful
                        mc.saveButtonClicked = false;

                        // remove the success display after 3 seconds
                        $timeout(function () {
                            mc.saveButtonClicked = true;
                        }, 3000);
                    });
            }
            else {
                // display invalid entry error
                mc.needsValidation = false;

                $timeout(function () {
                    mc.needsValidation = true;
                }, 5000);
            }
        }

    }

}());
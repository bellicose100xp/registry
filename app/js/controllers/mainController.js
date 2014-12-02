/**
 * Created by buggy on 11/10/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('mainController', mainController);

    function mainController($scope, $firebase, $timeout, FIREBASE_URL, $state, currentAuth) {

        var mc = this;
        mc.firstName = mc.lastName = mc.tel = mc.suitStyle = mc.date = mc.notes = null;
        mc.isCompleted = false;
        mc.saveButtonClicked = true;
        mc.needsValidation = true;


        // what is prevent default & stop propagation
        mc.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            mc.opened = true;
        };

        var ref = new Firebase(FIREBASE_URL);
        var sync = $firebase(ref);

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
                        isCompleted: mc.isCompleted,
                        notes: mc.notes,
                        createdBy: currentAuth.password.email,
                        eventDate: mc.eventDate.toDateString()
                    })
                    .then(function (ref) {

                        // reset all ng-model bindings to empty string so it doesn't get submitted twice
                        mc.firstName = mc.lastName = mc.tel = mc.suitStyle = mc.date = mc.notes = "";

                        // set the form status back to untouched status so it doesn't show any error after pressing submit button
                        $scope.registryForm.$setUntouched();

                        // show that the submit action is successful
                        mc.saveButtonClicked = false;

                        // go to customer edit state directly
                        $state.go('details', {uniqueId:ref.key()});

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
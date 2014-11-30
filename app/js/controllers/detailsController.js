/**
 * Created by buggy on 11/28/14.
 */
(function () {
    'use strict'

    angular
        .module('registry')
        .controller('detailsController', detailsController);

    function detailsController($scope, customerKey, $firebase, FIREBASE_URL) {

        var dc = this;
        dc.editing = false;

        var ref = new Firebase(FIREBASE_URL + '/' + customerKey);
        dc.customer = $firebase(ref).$asObject();

        // this is declared here because otherwise the tel filter tries to parse a null string and throws error
        dc.customer.tel='';

        dc.saveCustomer = function (isValid) {

            if (isValid) {

                dc.customer.$save().then(function (data) {
                    dc.editing = false;
                    // below outputs too much console data
                    //   console.log('update successful',data);
                }, function (error) {
                    console.log('Error:', error);
                });
            }
            else {
                console.log('invalid input');
            }
        };

        dc.editItem = function () {
            dc.editing = true;
        };

        // customer party array

        var refParty = new Firebase(FIREBASE_URL + '/' + customerKey + '/party');
        dc.customerParty = $firebase(refParty).$asArray();



        dc.addParty = function (isValid) {
            if (isValid) {

                dc.customerParty.$add({
                    partyFirstName: dc.customerParty.firstName,
                    partyLastName: dc.customerParty.lastName,
                    partySuitStyle: dc.customerParty.suitStyle
                }).then(function () {

                    //remote values after they have been added so they don't get added twice
                    dc.customerParty.firstName = dc.customerParty.lastName = dc.customerParty.suitStyle = "";

                    //set the form to untouched to remove validation errors
                    $scope.partyForm.$setUntouched();

                });
            }

        };


    }
}());
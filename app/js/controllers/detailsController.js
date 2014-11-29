/**
 * Created by buggy on 11/28/14.
 */
(function () {
    'use strict'

    angular
        .module('registry')
        .controller('detailsController', detailsController);

    function detailsController(customerKey, $firebase, FIREBASE_URL) {

        var dc = this;
        dc.editing = false;

        var ref = new Firebase(FIREBASE_URL + '/' + customerKey);
        dc.customer = $firebase(ref).$asObject();

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

        dc.addParty = function () {
            dc.customerParty.$add({
                partyFirstName: dc.customerParty.firstName
            })

        };


    }
}());
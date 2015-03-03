/**
 * Created by buggy on 11/28/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('detailsController', detailsController);

    function detailsController($scope, customerKey, $firebase, FIREBASE_URL, $timeout, $document) {

        var dc = this;
        dc.editing = false;
        dc.today = new Date();

        dc.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            dc.opened = true;
        };

        var ref = new Firebase(FIREBASE_URL + '/' + customerKey);
        dc.customer = $firebase(ref).$asObject();

        // assign date to a local variable for display purposes
        //dc.customer.$loaded()
        //    .then(function (object) {
        //        dc.eventDateForDisplay = new Date(object.eventDate);
        //    })
        //    .catch(function (error) {
        //        console.log("Error while loading customer object: ", error);
        //    });

        // this is declared here because otherwise the tel filter tries to parse a null string and throws error
        dc.customer.tel = '';

        // this is so datepicker date can be saved in database
        dc.dateStringConversion = function () {
            dc.customer.eventDate = dc.customer.eventDate ? dc.customer.eventDate.toDateString() : '';
            //dc.eventDateForDisplay = new Date(dc.customer.eventDate);
            //console.log(dc.today >= dc.eventDateForDisplay);
        };

        dc.completeCustomer = function () {
            if(confirm('Are you sure you want to mark this as complete?')) {
                dc.customer.isCompleted = true;

                dc.customer.$save().then(function () {
                }, function (error) {
                    console.log('Error:', error);
                });
            }
        };

        dc.markAsIncomplete = function () {
            if(confirm('Are you sure you want to mark this as active')) {
                dc.customer.isCompleted = false;

                dc.customer.$save().then(function () {
                }, function (error) {
                    console.log('Error:', error);
                });
            }
        };

        dc.saveCustomer = function (isValid) {

            if (isValid) {

                dc.customer.$save().then(function () {
                    dc.editing = false;
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

        // blur the suit style element for the party form so it doesn't give validation error
        dc.blurOnEnter = function (e) {
            if (e.keyCode === 13) {
                // http://stackoverflow.com/questions/18389527/angularjs-submit-on-blur-and-blur-on-keypress
                // need to do it like to prevent angular Error: [$rootScope:inprog] $apply already in progress
                return $timeout(function () {
                        e.target.blur()
                    },
                    0,
                    false
                );
            }
        };

        // customer party array

        var refParty = new Firebase(FIREBASE_URL + '/' + customerKey + '/party');
        dc.customerParty = $firebase(refParty).$asArray();

        // get a count of all members in party once the array is loaded
        dc.customerParty.$loaded()
            .then(function (list) {
                dc.memberCount = list.length;
            })
            .catch(function (error) {
                console.log("Error while loading party object: ", error);
            });

        // recount members every time party list is changed.
        dc.customerParty.$watch(function () {
            dc.memberCount = dc.customerParty.length;
        });

        dc.customerParty.isCompleted = false;

        dc.addParty = function (isValid) {
            if (isValid) {

                dc.customerParty.$add({
                    partyFirstName: dc.customerParty.firstName,
                    partyLastName: dc.customerParty.lastName,
                    partySuitStyle: dc.customerParty.suitStyle,
                    partyCompleted: dc.customerParty.isCompleted
                }).then(function () {

                    //remote values after they have been added so they don't get added twice
                    dc.customerParty.firstName = dc.customerParty.lastName = dc.customerParty.suitStyle = null;

                    //set the form to untouched & pristine to remove validation errors
                    $scope.partyForm.$setUntouched();
                    $scope.partyForm.$setPristine();

                });
            }

        };

        //InLine Edit Customer Party members
        dc.isMemberEdited = false;
        dc.index = null;

        //toggle current edit status
        dc.toggleMemberEdit = function (index) {
            dc.isMemberEdited = !dc.isMemberEdited;
            dc.index = index;
        };

        dc.saveMember = function (member) {

            // save customer party member
            dc.customerParty.$save(member);

            // toggle current edit status
            dc.toggleMemberEdit(null);

        };

        // delete button

        dc.showDelete = false;


    }
}());
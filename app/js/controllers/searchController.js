/**
 * Created by buggy on 12/1/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .controller('searchController',searchController);

    function searchController($firebase, FIREBASE_URL, currentAuth, $scope){

        var sc = this;
        sc.today = new Date();

        // set default value for search filter to show active items only
        $scope.search = {};
        $scope.search.isCompleted = 'false';

        //for header sorting
        sc.orderByField = 'dateAdded';
        sc.reverseSort = true;

        var ref = new Firebase(FIREBASE_URL);
        var sync = $firebase(ref);

        this.data = sync.$asArray();

        sc.archiveCustomer = function (customer) {
            // this is so the $save doesn't run while the checkbox confirmation is not valid
            if(customer.isCompleted) {
                this.data.$save(customer);
            }

        }.bind(this);

        sc.systemUser = function(){
            return currentAuth.password.email === 'admin@4hso.com';
        };

        sc.checkOldEvents = function (customer) {
            var dateToCheck = new Date(customer.eventDate);
            var checkResult = sc.today >= dateToCheck;
            return !customer.isCompleted && checkResult;
        };
    }

}());
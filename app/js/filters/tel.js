/**
 * Created by buggy on 11/8/14.
 */
(function () {
    'use strict';

    angular
        .module('registry')
        .filter('tel', telFormat);

    function telFormat() {
        return function (tel) {

            // this check is to ensure if it receives empty string that it doesn't throw error
            if(tel) {

                var telString = tel.toString();
                var areaCode = telString.slice(0, 3);
                var middleThree = telString.slice(3, 6);
                var lastFour = telString.slice(6, 10);

                return '(' + areaCode + ') ' + middleThree + '-' + lastFour;
            }

            else {
                return '';
            }

        }
    }

}());
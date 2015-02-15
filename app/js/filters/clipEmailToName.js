/**
 * Created by admin on 2/15/2015.
 */
angular
.module('registry')
.filter('emailToName', function () {
        return function (email) {
         if(email){
             return email.substr(0,1).toUpperCase() + email.substr(1, email.length - 10);
         }
            else {
             return '';
         }
        }
    });
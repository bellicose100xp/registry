/**
 * Created by admin on 2/26/2015.
 */
angular
.module('registry')
.filter('titleCase', function () {
       return function (text) {
           if(text) {
               var textSplit = text.split(' ');
               var titleCaseOutput = [];
               for (var i = 0; i < textSplit.length; i++) {
                   if (textSplit[i] != '') {
                       titleCaseOutput.push(textSplit[i].substr(0, 1).toUpperCase() + textSplit[i].substr(1).toLowerCase());
                   }
               }
               return titleCaseOutput.join(' ');
           }
           else {
               return '';
           }
       }
    });
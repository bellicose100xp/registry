/**
 * Created by admin on 2/20/2015.
 */
angular
    .module('registry')
    .directive('checkboxConfirmation', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                var x = false;

                ngModel.$parsers.push(function (val) {
                    if (ngModel.$viewValue === true && ngModel.$modelValue === false) {
                        if (val && confirm('Are you sure want to mark this as complete?')) {
                            return val;
                        } else {
                            ngModel.$setViewValue(x);
                            ngModel.$render();
                            return x;
                        }
                    }

                    if (ngModel.$viewValue === false && ngModel.$modelValue === true) {
                        if (!val && confirm('Are you sure you want to mark this as active?')) {
                            return val;
                        } else {
                            ngModel.$setViewValue(!x);
                            ngModel.$render();
                            return !x;
                        }
                    }

                });
            }
        }
    });
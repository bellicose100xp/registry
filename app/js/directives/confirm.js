/**
 * Created by admin on 12/13/2014.
 */
(function () {

    angular
        .module('registry')
        .directive('requireConfirmation', function ($window) {
            return {
                // angular runs attributes by priority,
                // default priority is 0, higher priority runs first
                priority: 1,
                // setting terminal to true stops angular from processing other attribute directives
                terminal: true,
                link: function(scope, elem, attr){
                    // if attribute doesn't have any value then display default message.
                    // <span require-confirmation="xxx"> would set msg to xxx
                    // <span require-confirmation> would set msg to "Are you sure...."
                    var msg = attr.requireConfirmation || "Are you sure you want to delete?";
                    // click action on anything that the attribute element wraps
                    var clickAction = attr.ngClick;

                    elem.bind('click', function () {
                        if($window.confirm(msg)){
                            scope.$eval(clickAction);
                        }
                    });
                }
            }
        });

}());
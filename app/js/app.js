(function () {
    'use strict';

    angular
        .module('registry', ['firebase','ui.utils','ui.router'])
        .config(
        function ($stateProvider, $urlRouterProvider) {

            // setting default route
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                    url: '/',
                    templateUrl: 'app/home.html',
                    controller: 'mainController as mc'
                })
        }
    );


}());
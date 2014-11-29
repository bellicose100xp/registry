(function () {
    'use strict';

    angular
        .module('registry', ['firebase', 'ui.utils', 'ui.router', 'ngMessages'])
        .constant('FIREBASE_URL', 'https://buggy.firebaseio.com/')
        .run(function ($rootScope, $state) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                // we can catch error when the $requireAuth promise is rejected
                // and redirect user back to login page
                if (error === 'AUTH_REQUIRED') {
                    console.log('Authentication not found, redirecting to login page');
                    $state.go('login');
                }
            });
        })
        .config(
        function ($stateProvider, $urlRouterProvider) {

            // setting default route
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: 'app/views/login.html',
                    controller: 'loginController as lc'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/views/home.html',
                    controller: 'mainController as mc',
                    resolve: {
                        // controller will not be loaded until $requireAuth resolves
                        // $requireAuth returns a promise so the resolve waits for it to complete
                        // if the promise is rejected, it will throw a $stateChangeError which we are catching above in app.run
                        'currentAuth': function ($firebaseAuth, FIREBASE_URL) {
                            var ref = new Firebase(FIREBASE_URL);
                            var authObj = $firebaseAuth(ref);
                            console.log('Checking Authentication');
                            return authObj.$requireAuth();

                        }
                    }
                })
                .state('details', {
                    url: '/:uniqueId',
                    templateUrl: 'app/views/details.html',
                    controller: 'detailsController as dc',
                    resolve: {
                        'customerKey': function ($stateParams) {
                            return $stateParams.uniqueId;
                        },
                        // controller will not be loaded until $requireAuth resolves
                        // $requireAuth returns a promise so the resolve waits for it to complete
                        // if the promise is rejected, it will throw a $stateChangeError which we are catching above in app.run
                        'currentAuth': function ($firebaseAuth, FIREBASE_URL) {
                            var ref = new Firebase(FIREBASE_URL);
                            var authObj = $firebaseAuth(ref);
                            console.log('Checking Authentication');
                            return authObj.$requireAuth();

                        }
                    }
                })
                .state('logout', {
                    url: '/logout',
                    templateUrl: 'app/views/logout.html',
                    controller: 'statusController as sc'
                })

        }
    );


}());
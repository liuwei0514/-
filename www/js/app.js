// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.forwardCache(true);
    // $ionicConfigProvider.views.maxCache(5000);
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.home.index', {
            url: '/index',
            views: {
                'indexContent': {
                    templateUrl: 'templates/jhslist.html',
                    controller: 'IndexCtrl'
                }
            }
        })
        .state('app.jhs', {
            url: '/jhs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'JhsCtrl'
                }
            }
        })
        .state('app.jhs.index', {
            url: '/index',
            views: {
                'indexContent': {
                    templateUrl: 'templates/jhslist.html',
                    controller: 'IndexCtrl'
                }
            }
        })
        .state('app.qiang', {
            url: '/qiang',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'QiangCtrl'
                }
            }
        })
        .state('app.qiang.index', {
            url: '/index',
            views: {
                'indexContent': {
                    templateUrl: 'templates/qianglist.html',
                    controller: 'IndexCtrl'
                }
            }
        })
        .state('app.qing', {
            url: '/qing',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'QingCtrl'
                }
            }
        })
        .state('app.qing.index', {
            url: '/index',
            views: {
                'indexContent': {
                    templateUrl: 'templates/qinglist.html',
                    controller: 'IndexCtrl'
                }
            }
        })
        .state('app.tejia', {
            url: '/tejia',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'TejiaCtrl'
                }
            }
        })
        .state('app.tejia.index', {
            url: '/index',
            views: {
                'indexContent': {
                    templateUrl: 'templates/tejialist.html',
                    controller: 'IndexCtrl'
                }
            }
        })
        .state('app.item', {
            url: '/item/:id/:title/:price',
            views: {
                'menuContent': {
                    templateUrl: 'templates/item.html',
                    controller: 'ItemCtrl'
                }
            }
        })
        ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home/index');
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, Push) {


    // push notification callback
    var notificationCallback = function(data) {
        console.log('received data :' + data);
        var notification = angular.fromJson(data);
        //app 是否处于正在运行状态
        var isActive = notification.notification;

        // here add your code
        //ios
        if (true) {
            window.alert(notification);
        }
    };


    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        //初始化
        Push.init(notificationCallback);

        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.plugins.jPushPlugin.init();

            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // $ionicConfigProvider.views.forwardCache(true);
        $ionicConfigProvider.backButton.text('')
            // $ionicConfigProvider.views.maxCache(10);
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

        .state('app.jhs', {
                url: '/jhs',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.qiang', {
                url: '/qiang',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.qing', {
                url: '/qing',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.tejia', {
                url: '/tejia',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.item', {
                url: '/item/:id/:title/:price/:picUrl',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/item.html',
                        controller: 'ItemCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/jhs');
    })
    .factory('Push', function() {
        var push;
        return {
            setBadge: function(badge) {
                if (push) {
                    console.log('jpush: set badge', badge);
                    plugins.jPushPlugin.setBadge(badge);
                }
            },
            setAlias: function(alias) {
                if (push) {
                    console.log('jpush: set alias', alias);
                    plugins.jPushPlugin.setAlias(alias);
                }
            },
            check: function() {
                if (window.jpush && push) {
                    plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
                    window.jpush = null;
                }
            },
            init: function(notificationCallback) {
                console.log('jpush: start init-----------------------');



                try {
                    window.plugins.jPushPlugin.init();

                    if (device.platform != "Android") {
                        window.plugins.jPushPlugin.setDebugModeFromIos();
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                    } else {
                        window.plugins.jPushPlugin.setDebugMode(true);
                    }

                    plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
                    plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;

                } catch (exception) {
                    console.log(exception);
                }
            }
        };
    });

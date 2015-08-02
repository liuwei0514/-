var urlRoot = "http://localhost:3000/api/v2";
var urlJhs = urlRoot + "/jhs";
var urlQiang = urlRoot + "/qiang";
var urlQing = urlRoot + "/qing";
var urlTejia = urlRoot + "/tejia";
var urlJhsCategories = urlRoot + "/jhscategories";
var urlQiangCategories = urlRoot + "/qiangcategories";
var urlQingCategories = urlRoot + "/qingcategories";
var urlTejiaCategories = urlRoot + "/tejiacategories";

angular.module('starter.controllers', ['ngSanitize'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('ItemCtrl', function($scope, $stateParams, $sce,$ionicHistory) {
        console.log($ionicHistory.viewHistory());
        $scope.width = window.innerWidth;
        $scope.height = window.innerHeight;
        $scope.appItemIframeStyle = {
            'height': ($scope.height - 44 - 49) + 'px'
        };
        $scope.title = $stateParams.title;
        $scope.price = $stateParams.price;
        $scope.itemUrl =$sce.trustAsResourceUrl("http://h5.m.taobao.com/awp/core/detail.htm?id="+$stateParams.id);
    })
    .controller('HomeCtrl', function($scope, $stateParams) {
        $scope.urlCategories = urlJhsCategories;
        $scope.url = urlJhs;
        $scope.title = "转一下 赚一下";
    })

.controller('JhsCtrl', function($scope, $stateParams, $http) {
        $scope.urlCategories = urlJhsCategories;
        $scope.url = urlJhs;

        $scope.title = "聚划算";
    })
    .controller('QingCtrl', function($scope, $stateParams, $http) {
        $scope.title = "淘清仓";
        $scope.urlCategories = urlQingCategories;
        $scope.url = urlQing;
    })
    .controller('QiangCtrl', function($scope, $stateParams, $http) {
        $scope.title = "淘抢购";
        $scope.urlCategories = urlQingCategories;
        $scope.url = urlQing;
    })
    .controller('TejiaCtrl', function($scope, $stateParams, $http) {
        $scope.title = "天天特价";
        $scope.urlCategories = urlTejiaCategories;
        $scope.url = urlTejia;
    })

.controller('IndexCtrl', function($scope, $http, $ionicScrollDelegate, $stateParams, $location, $ionicSlideBoxDelegate, $state,$ionicHistory) {
    $scope.data = {};
    $scope.width = window.innerWidth;
    $scope.height = window.innerHeight;
    $scope.slideIndex = 0;
    $scope.appIndexSlideStyle = {
        'height': ($scope.height - 44 - 47 - 49) + 'px'
    };

    $scope.appIndexScrollNav = $ionicScrollDelegate.$getByHandle('app-index-scroll-nav');
    $scope.appIndexSlide = $ionicSlideBoxDelegate.$getByHandle('app-index-slide');
    $scope.scrollNavTo = function($index) {
        var p = $scope.appIndexScrollNav.getScrollPosition();
        if ($index > 4) {
            $scope.appIndexScrollNav.anchorScroll(false);
            p = $scope.appIndexScrollNav.getScrollPosition();
            console.log(p);
            $scope.appIndexScrollNav.scrollBy(-($scope.width / 2 - 20), 0, false);
        } else {
            if (p.left > 0) {
                $scope.appIndexScrollNav.anchorScroll(false);
                $scope.appIndexScrollNav.scrollTo(0, 0, false);
            }
        }
    };
    $scope.slideHasChanged = function($index) {
        $scope.slideIndex = $index;
        $location.hash("anchor" + $scope.slideIndex);
        $scope.scrollNavTo($index);
    };

    $http.get($scope.$parent.urlCategories).
    success(function(data, status, headers, config) {
        $scope.categories = data;
        for (var i = 0; i < $scope.categories.results.length; i++) {
            $scope.data[$scope.categories.results[i]._id] = {
                previous: false,
                next: 1,
                first: 1,
                last: 1,
                results: []
            };
        };
        $scope.nextPage($scope.categories.results[0]._id);
        $scope.appIndexSlide.update();
    }).
    error(function(data, status, headers, config) {
        //
    });

    $scope.loadMore = function(categoryId) {
        $scope.nextPage(categoryId, function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.nextPage = function(categoryId, cb) {
        $http.get($scope.$parent.url + "/" + categoryId, {
            page: $scope.data[categoryId].next
        }).
        success(function(data, status, headers, config) {
            $scope.data[categoryId].previous = data.previous;
            $scope.data[categoryId].next = data.next;
            $scope.data[categoryId].first = data.first;
            $scope.data[categoryId].last = data.last;
            $scope.data[categoryId].results = $scope.data[categoryId].results.concat(data.results);
            if (cb) {
                cb();
            }
        }).
        error(function(data, status, headers, config) {
            //
        });
    };
    $scope.prePage = function(categoryId) {
        if ($scope.data[categoryId].previous) {
            $http.get($scope.$parent.url, {
                page: $scope.data[categoryId].previous
            }).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.data[categoryId] = data;
            }).
            error(function(data, status, headers, config) {
                //
            });
        }
    };
    console.log($ionicHistory.viewHistory());

});

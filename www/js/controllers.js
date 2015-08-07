var urlRoot = "http://data.800-taobao.com/api/v2";
// var urlRoot = "http://127.0.0.1:3000/api/v2";
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

})

.controller('ItemCtrl', function($scope, $stateParams, $sce, $ionicActionSheet) {
    $scope.width = window.innerWidth;
    $scope.height = window.innerHeight;
    $scope.appItemIframeStyle = {
        'height': ($scope.height - 44 - 49) + 'px'
    };
    $scope.title = $stateParams.title;
    $scope.price = $stateParams.price;
    $scope.itemUrl = $sce.trustAsResourceUrl("http://h5.m.taobao.com/awp/core/detail.htm?id=" + $stateParams.id);
    $scope.picUrl = $sce.trustAsResourceUrl($stateParams.picUrl);


    $scope.encodeImageUri = function(imageUri) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function() {
            c.width = this.width;
            c.height = this.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = imageUri;
        var dataURL = c.toDataURL("image/jpeg");
        return dataURL;
    }


    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<i class="icon-weixin iconfont icon-action"></i> 分享到微信好友'
            }, {
                text: '<i class="icon-pengyou iconfont icon-action"></i> 分享到微信朋友圈'
            }, {
                text: '<i class="icon-qq iconfont icon-action"></i> 分享到QQ'
            }, {
                text: '<i class="icon-qq1 iconfont icon-action"></i> 分享到QZone'
            }, {
                text: '<i class="icon-qq iconfont icon-action"></i> QQ收藏'
            }, {
                text: '<i class="icon-weibo iconfont icon-action"></i> 分享到微博'
            }],
            titleText: '分享给好友',
            cancelText: '取消',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    // WeChat.isInstalled(function(isInstalled) {
                    // alert(installed);
                    WeChat.share({
                        title: $scope.title,
                        description: $scope.title,
                        thumbData: $scope.encodeImageUri("http:" + $scope.picUrl + "_90x90Q90.jpg_.webp"),
                        url: 'http://www.800-taobao.com/'
                    }, WeChat.Scene.session, function() {
                        alert('分享成功~');
                    }, function(reason) {
                        alert(reason);
                    });
                    // }, function(reason) {
                    //     alert(reason);
                    // });
                }
                if (index == 1) {
                    // WeChat.isInstalled(function(isInstalled) {
                    // alert(installed);
                    WeChat.share({
                        title: $scope.title,
                        description: $scope.title,
                        thumbData: $scope.encodeImageUri("http:" + $scope.picUrl + "_90x90Q90.jpg_.webp"),
                        url: 'http://www.800-taobao.com/'
                    }, WeChat.Scene.timeline, function() {
                        alert('分享成功~');
                    }, function(reason) {
                        alert(reason);
                    });

                    WeChat.isInstalled(function(isInstalled) {
                        alert('WeChat installed=' + isInstalled);
                    }, function(reason) {
                        alert(reason);
                    });

                    // }, function(reason) {
                    //     alert(reason);
                    // });
                }
                if (index == 2) {
                    var args = {};

                    args.url = "http://www.baidu.com";
                    args.title = "This is cordova QZone share ";
                    args.description = "This is cordova QZone share ";
                    var imgs = ['https://www.baidu.com/img/bdlogo.png',
                        'https://www.baidu.com/img/bdlogo.png',
                        'https://www.baidu.com/img/bdlogo.png'
                    ];
                    args.imageUrl = imgs;

                    args.appName = "转一下 赚一下";
                    YCQQ.shareToQQ(function() {
                        alert("share success");
                    }, function(failReason) {
                        alert(failReason);
                    }, args);
                }

                if (index == 3) {
                    var args = {};
                    args.url = "http://www.baidu.com";
                    args.title = "This is cordova QZone share ";
                    args.description = "This is cordova QZone share ";
                    var imgs = ['https://www.baidu.com/img/bdlogo.png',
                        'https://www.baidu.com/img/bdlogo.png',
                        'https://www.baidu.com/img/bdlogo.png'
                    ];
                    args.imageUrl = imgs;
                    YCQQ.shareToQzone(function() {
                        alert("share success");
                    }, function(failReason) {
                        alert(failReason);
                    }, args);
                }

                if (index == 4) {
                    var args = {};
                    args.url = "http://www.baidu.com";
                    args.title = "这个是cordova QQ 收藏测试";
                    args.description = "这个是cordova QQ 收藏测试";
                    args.imageUrl = "https://www.baidu.com/img/bdlogo.png";
                    args.appName = "cordova—QQ";
                    YCQQ.addToQQFavorites(function() {
                        alert("share success");
                    }, function(failReason) {
                        alert(failReason);
                    }, args);
                }
                if (index == 5) {
                    YCWeibo.checkClientInstalled(function() {
                        var args = {};
                        args.url = "http://www.baidu.com";
                        args.title = "Baidu";
                        args.description = "This is Baidu";
                        args.imageUrl = "https://www.baidu.com/img/bdlogo.png"; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
                        args.defaultText = "";
                        YCWeibo.shareToWeibo(function() {
                            alert("share success");
                        }, function(failReason) {
                            alert(failReason);
                        }, args);
                    }, function() {
                        console.log('请先下载安装微博！');
                    });
                }
                return true;

            }
        });
    };
    // hideSheet();

})

.controller('HomeCtrl', function($scope, $http, $ionicScrollDelegate, $stateParams, $location, $ionicSlideBoxDelegate, $state) {
    $scope.title = "聚划算";
    if ($state.current.name == "app.jhs") {
        $scope.urlCategories = urlJhsCategories;
        $scope.url = urlJhs;
        $scope.title = "聚划算";
        $scope.urlListitem = "listitemjhs";
        $scope.appNndexNavWidth = 300;
    }
    if ($state.current.name == "app.qing") {
        $scope.urlCategories = urlQingCategories;
        $scope.url = urlQing;
        $scope.title = "淘清仓";
        $scope.urlListitem = "listitemqing";
        $scope.appNndexNavWidth = 180;
    }
    if ($state.current.name == "app.qiang") {
        $scope.urlCategories = urlQiangCategories;
        $scope.url = urlQiang;
        $scope.title = "淘抢购";
        $scope.urlListitem = "listitemqiang";
        $scope.appNndexNavWidth = 400;
    }
    if ($state.current.name == "app.tejia") {
        $scope.urlCategories = urlTejiaCategories;
        $scope.url = urlTejia;
        $scope.title = "天天特价";
        $scope.urlListitem = "listitemtejia";
        $scope.appNndexNavWidth = 350;
    }

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

    $http.get($scope.urlCategories).
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


    $scope.doRefresh = function(categoryId) {
        $http.get($scope.url + "/" + categoryId).success(function(data, status, headers, config) {
                $scope.data[categoryId] = data;
            }).error(function(data, status, headers, config) {
                //
            })
            .finally(function() {
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete');
            });

    };
    $scope.loadMore = function(categoryId) {
        $scope.nextPage(categoryId, function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.nextPage = function(categoryId, cb) {
        $http.get($scope.url + "/" + categoryId + "?page=" + $scope.data[categoryId].next).
        success(function(data, status, headers, config) {
            $scope.data[categoryId].previous = data.previous;
            $scope.data[categoryId].next = data.next;
            $scope.data[categoryId].first = data.first;
            $scope.data[categoryId].last = data.last;
            $scope.data[categoryId].results = $scope.data[categoryId].results.concat(data.results);
        }).
        error(function(data, status, headers, config) {}).
        finally(function() {
            if (cb) {
                cb();
            }
        });
    };

});

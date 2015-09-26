// var urlRoot = "http://data.800-taobao.com/api/v2";
var urlRoot = "http://127.0.0.1:3000/api/v2";
var urlJhs = urlRoot + "/jhs";
var urlQiang = urlRoot + "/qiang";
var urlQing = urlRoot + "/qing";
var urlTejia = urlRoot + "/tejia";
var urlJhsCategories = urlRoot + "/jhscategories";
var urlQiangCategories = urlRoot + "/qiangcategories";
var urlQingCategories = urlRoot + "/qingcategories";
var urlTejiaCategories = urlRoot + "/tejiacategories";
var urlCreateUser = urlRoot + "/AppUser";
var urlRewards = urlRoot + "/Reward";

angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $ionicModal, $interval, $http) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    // $scope.$on('$ionicView.enter', function(e) {
    //     // console.log(e);
    //     var appUser = window.localStorage.getItem("appUser");
    //     if (!appUser == true) {
    //         $scope.login();
    //     }
    // });


    // $scope.$watch('loginForm.loginTel.$valid', function(validity) {
    //     $scope.loginData.captchaDisabled = !validity;
    // });


    // Form data for the login modal
    $scope.loginData = {
        captchaText: "获取验证码",
        waiting: false,
        waitingTime: 0
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        var appUser = window.localStorage.getItem("appUser");
        if (!appUser == true) {
            $scope.login();
        }
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    $scope.sendCaptcha = function() {
        $scope.loginData.waiting = true;
        $scope.loginData.waitingTime = 60;
        $scope.loginData.captchaValue = 1111;
        $interval(function() {
            if ($scope.loginData.waitingTime > 0) {
                $scope.loginData.waitingTime = $scope.loginData.waitingTime - 1;
                $scope.loginData.captchaText = "重新获取(" + $scope.loginData.waitingTime + ")";
            } else {
                $scope.loginData.captchaText = "获取验证码";
                $scope.loginData.waiting = false;
            }
        }, 1000, 61);
    };


    $scope.$watch('loginData.captcha', function() {
        if ($scope.loginData.captcha) {
            if ($scope.loginData.captchaValue == $scope.loginData.captcha && $scope.loginData.tel && $scope.loginData.taobaoid)
                $scope.loginData.passCorrect = true;
            else
                $scope.loginData.passCorrect = false;
        }
    });

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

        $http.post(urlCreateUser, {
            taobaoid: $scope.loginData.taobaoid,
            tel: $scope.loginData.tel,
            captcha: $scope.loginData.captcha
        }).
        success(function(data, status, headers, config) {
            console.log(data);
            localStorage["appUser"] = JSON.stringify(data.appUser);
            localStorage["rewards"] = JSON.stringify(data.rewards);
            // $state.go();
            // var cars = JSON.parse(localStorage["mycars"]);
            // $scope.appUser = data.appUser;
            // $scope.rewards = data.rewards;
            $scope.closeLogin();
        }).
        error(function(data, status, headers, config) {
            //
        });

    };
})

.controller('TaobaoidCtrl', function($scope, $stateParams, $ionicPopup, $http) {
        $scope.createUser = function(taobaoid) {

            $http.post(urlCreateUser, {
                taobaoid: taobaoid
            }).
            success(function(data, status, headers, config) {
                console.log(data);
                localStorage["appUser"] = JSON.stringify(data.appUser);
                localStorage["rewards"] = JSON.stringify(data.rewards);
                // $state.go();
                // var cars = JSON.parse(localStorage["mycars"]);
                // $scope.appUser = data.appUser;
                // $scope.rewards = data.rewards;
            }).
            error(function(data, status, headers, config) {
                //
            });
        };

    })
    .controller('RewardsCtrl', function($scope, $stateParams, $ionicPopup, $http) {
        $scope.appUser = JSON.parse(localStorage["appUser"]);
        $http.get(urlRewards + "/" + $scope.appUser._id).
        success(function(data, status, headers, config) {
            var rewards = data.rewards;
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth()+2;
            var reward = {
                "amount": 0,
                "month": month,
                "year": year,
                "type": "invalid"
            };
            rewards.push(reward);
            $scope.rewards = rewards;
        }).
        error(function(data, status, headers, config) {
            //
        });

    })


.controller('ItemCtrl', function($scope, $stateParams, $sce, $ionicActionSheet) {
    $scope.width = window.innerWidth;
    $scope.height = window.innerHeight;
    $scope.appItemIframeStyle = {
        'height': ($scope.height - 44 - 49) + 'px'
            // 'height': '100%'
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

    $scope.shareUrl = "http://www.800-taobao.com/";
    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '<i class="weixin icon-action"></i> 微信好友'
            }, {
                text: '<i class="pengyou  icon-action"></i> 朋友圈'
            }, {
                text: '<i class="qq  icon-action"></i> QQ好友'
            }, {
                text: '<i class="qzone  icon-action"></i> QZone'
            }, {
                text: '<i class="qq  icon-action"></i> QQ收藏'
            }, {
                text: '<i class="weibo  icon-action"></i> 新浪微博'
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
                        url: $scope.shareUrl
                    }, WeChat.Scene.session, function() {
                        // alert('分享成功~');
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
                        url: $scope.shareUrl
                    }, WeChat.Scene.timeline, function() {
                        // alert('分享成功~');
                    }, function(reason) {
                        alert(reason);
                    });

                    // WeChat.isInstalled(function(isInstalled) {
                    //     alert('WeChat installed=' + isInstalled);
                    // }, function(reason) {
                    //     alert(reason);
                    // });

                    // }, function(reason) {
                    //     alert(reason);
                    // });
                }
                if (index == 2) {
                    var args = {};

                    args.url = $scope.shareUrl;
                    args.title = $scope.title;
                    args.description = $scope.title;
                    var imgs = [$scope.picUrl];
                    args.imageUrl = imgs;

                    args.appName = "转一下 赚一下";
                    YCQQ.shareToQQ(function() {
                        // alert("share success");
                    }, function(failReason) {
                        alert(failReason);
                    }, args);
                }

                if (index == 3) {
                    var args = {};

                    args.url = $scope.shareUrl;
                    args.title = $scope.title;
                    args.description = $scope.title;
                    var imgs = [$scope.picUrl];

                    args.imageUrl = imgs;
                    YCQQ.shareToQzone(function() {
                        // alert("share success");
                    }, function(failReason) {
                        alert(failReason);
                    }, args);
                }

                if (index == 4) {
                    var args = {};

                    args.url = $scope.shareUrl;
                    args.title = $scope.title;
                    args.description = $scope.title;
                    args.imageUrl = $scope.picUrl;
                    args.appName = "转一下 赚一下";
                    YCQQ.addToQQFavorites(function() {
                        // alert("share success");
                    }, function(failReason) {
                        alert(failReason);
                    }, args);
                }
                if (index == 5) {
                    YCWeibo.checkClientInstalled(function() {
                        var args = {};
                        args.url = $scope.shareUrl;
                        args.title = $scope.title;
                        args.description = $scope.title;
                        args.imageUrl = $scope.picUrl;
                        args.defaultText = "转一下 赚一下";
                        YCWeibo.shareToWeibo(function() {
                            // alert("share success");
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

.controller('GerenCtrl', function($scope, $http, $state) {
    var appUser = window.localStorage.getItem("appUser");
    if (!appUser == true) {
        $scope.login();
    }
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

angular.module('starter')
    .filter('formatDate', function() {
        return function(e) {
            var date = +new Date(e);
            var now = +new Date();
            var diff = date - now;
            if (diff > 0) {
                return "剩"+parseInt(diff / 86400000)+"天";
            } else {
                return "已过期";
            }
        }
    })

    ;

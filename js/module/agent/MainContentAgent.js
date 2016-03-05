/* global define, $, console */
define(function (require, exports) {
    'use strict';

    function queryPage(name, sucessCallback, errorCallback) {
        var urlPath = '/' + name;

        $.ajax({
            type: 'GET',
            async: false,
            url: urlPath,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('获取网页失败');
                errorCallback(error);
            }
        });
    }

    function stopImmediately(sucessCallback, errorCallback) {
        var urlPath = '/reset';

        $.ajax({
            type: 'GET',
            async: false,
            url: urlPath,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('紧急停止失败');
                errorCallback(error);
            }
        });
    }

    exports.queryPage = queryPage;
    exports.stopImmediately = stopImmediately;
});
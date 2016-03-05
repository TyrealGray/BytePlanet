/* global define, $, console */
define(function (require, exports) {
    'use strict';

    function queryPrint(name, sucessCallback, errorCallback) {
        var urlPath = '/device/' + name;

        $.ajax({
            type: 'GET',
            async: true,
            timeout: 20000,
            url: urlPath,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('查询打印机数据失败');
                errorCallback(error);
            }
        });
    }

    function sendCmd(cmd, sucessCallback, errorCallback) {
        var urlPath = '/send/' + cmd;

        $.ajax({
            type: 'GET',
            async: false,
            url: urlPath,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('查询打印机数据失败');
                errorCallback(error);
            }
        });
    }

    function operatePrint(urlPath, sucessCallback, errorCallback) {

        $.ajax({
            type: 'GET',
            async: true,
            url: urlPath,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('操作打印机失败');
                errorCallback(error);
            }
        });
    }

    function queryGCodeLog(sucessCallback, errorCallback) {

        $.ajax({
            type: 'GET',
            async: true,
            url: '/cmd_msg',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('获取GCode返回值失败');
                errorCallback(error);
            }
        });
    }

    exports.queryGCodeLog = queryGCodeLog;
    exports.queryPrint = queryPrint;
    exports.sendCmd = sendCmd;
    exports.operatePrint = operatePrint;
});
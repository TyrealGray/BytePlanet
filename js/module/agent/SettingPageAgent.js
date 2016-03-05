/* global define, $, console */
define(function (require, exports) {
    'use strict';

    function queryData(url, sucessCallback, errorCallback) {

        $.ajax({
            type: 'GET',
            async: true,
            url: url,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('设置面板获取数据失败');
                errorCallback(error);
            }
        });
    }

    function changePassword(settingData, sucessCallback, errorCallback) {
        var urlPath = '/change-password';

        changeSetting(urlPath, settingData, sucessCallback, errorCallback);
    }

    function changeEmail(settingData, sucessCallback, errorCallback) {
        var urlPath = '/change-mail';

        changeSetting(urlPath, settingData, sucessCallback, errorCallback);
    }

    function changeRouter(settingData, sucessCallback, errorCallback) {
        var urlPath = '/config-wpa';

        changeSetting(urlPath, settingData, sucessCallback, errorCallback);
    }

    function connectWifi(wifiData, sucessCallback, errorCallback) {
        var urlPath = '/connect-wifi';

        changeSetting(urlPath, wifiData, sucessCallback, errorCallback);
    }

    function changeLanguage(lang, sucessCallback, errorCallback) {

        var urlPath = '/setLang';

        changeSetting(urlPath, lang, sucessCallback, errorCallback);
    }

    function updateFirmware(firmwareData, sucessCallback, errorCallback) {

        var urlPath = '/do-update';

        changeSetting(urlPath, firmwareData, sucessCallback, errorCallback);
    }

    function changeSetting(url, settingData, sucessCallback, errorCallback) {

        var urlPath = url;

        $.ajax({
            type: 'POST',
            async: true,
            url: urlPath,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(settingData),
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('修改设置数据失败');
                errorCallback(error);
            }
        });
    }

    exports.queryData = queryData;
    exports.changePassword = changePassword;
    exports.changeEmail = changeEmail;
    exports.changeRouter = changeRouter;
    exports.connectWifi = connectWifi;
    exports.changeLanguage = changeLanguage;
    exports.updateFirmware = updateFirmware;

});
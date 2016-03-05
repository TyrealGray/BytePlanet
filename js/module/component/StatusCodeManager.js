define(function (require, exports) {
    'use strict';

    var GlobalVar = require('module/GlobalVar');

    function isOK(number) {
        return 1 === number;
    }

    function getErrorMessage(number) {

        var alertBox = GlobalVar.language.AlertBox,
            message = 'Unknow error(Code:' + number + ')';

        switch (number) {

        case 0:
            message = alertBox.LostConnection;
            break;

        case 2:
            message = alertBox.SettingEmailError;
            break;

        case 400:
            break;

        case 404:
            message = alertBox.Error404;
            break;

        case 500:
            message = alertBox.DeviceError;
            break;

        default:
            break;

        }

        return message;
    }

    exports.isOK = isOK;
    exports.getErrorMessage = getErrorMessage;

});
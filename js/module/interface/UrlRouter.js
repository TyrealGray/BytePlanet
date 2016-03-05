/* global define,$ */
define(function (require, exports) {
    'use strict';

    var MainContent = require('module/interface/MainContent'),
        LeftCanvas = require('module/interface/LeftCanvas');

    function routeHash(hash) {

        $('.centreContent').each(function () {
            $(this).hide();
        });

        switch (hash) {
        case '':
        case '#/home':
            $('#homePage').show();
            break;
        case '#/fileManage':
            $('#fileManagePage').show();
            break;
        case '#/cloudModel':
            $('#cloudModelPage').show();
            break;
        case '#/setting':
            $('#settingPage').show();
            break;
        case '#/help':
            $('#helpPage').show();
            break;
        case '#/logout':
            $('#logoutPage').show();
            break;
        default:
            break;
        }
    }

    exports.routeHash = routeHash;

});
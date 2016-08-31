/* global define,$ */
define(function (require, exports) {
    'use strict';

    var MainContent = require('module/interface/MainContent');

    function routeHash(hash) {

        $('.centreContent').each(function () {
            $(this).hide();
        });

        switch (hash) {
            case '':
            case '#/home':
                $('#homePage').show();
                break;
            case '#/meInfo':
                $('#meInfoPage').show();
                break;
            case '#/diaries':
                $('#diariesPage').show();
                break;
            case '#/setting':
                $('#settingPage').show();
                break;
            default:
                break;
        }
    }

    exports.routeHash = routeHash;

});
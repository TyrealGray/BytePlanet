/* global define, alert */
define(function (require) {
    'use strict';

    var MainContent = require('module/interface/MainContent'),

        UrlRouter = require('module/interface/UrlRouter'),

        GlobalVar = require('module/GlobalVar');

    function MainFrame($element) {

        this._mainContent = null;

        this._init($element);
    }

    MainFrame.prototype._init = function ($element) {

        this._mainContent = new MainContent($element);

        GlobalVar.mainContent = this._mainContent;
    };

    MainFrame.prototype.routerUrlHash = function (hash) {
        UrlRouter.routeHash(hash);
    };

    return MainFrame;
});
/* global define, $ ,document, window */
define(function (require) {
    'use strict';

    var _ = require('underscore'),

        Backbone = require('backbone'),

        Mustache = require('mustache'),

        GlobalVar = require('module/GlobalVar'),

        NavMenuTemplate = require('text!../../../html/NavMenu.html'),

        LeftCanvasTemplate = require('text!../../../html/LeftCanvas.html');

    function NavMenu() {

        this._initEvent();
    }

    _.extend(NavMenu.prototype, Backbone.Events);

    NavMenu.prototype.PAGE_HOME_INDEX = 0;

    NavMenu.prototype.PAGE_ME_INFO_INDEX = 1;

    NavMenu.prototype.PAGE_DIARIES_INDEX = 2;

    NavMenu.prototype.PAGE_LANGUAGE_INDEX = 3;

    NavMenu.prototype.getNavMenuContent = function () {

        var language = GlobalVar.language.LeftCanvas;

        return Mustache.render(NavMenuTemplate, {
            HomeMenuText: language.Home,
            MeInfoMenuText: language.MeInfo,
            DiariesMenuText: language.Diary,
            LanguageSettingText: language.Language
        });
    };

    NavMenu.prototype.getLeftCanvasContent = function () {

        var language = GlobalVar.language.LeftCanvas;

        return Mustache.render(LeftCanvasTemplate, {
            HomeMenuText: language.Home,
            MeInfoMenuText: language.MeInfo,
            DiariesMenuText: language.Diary,
            LanguageSettingText: language.Language
        });
    }

    NavMenu.prototype._bindEvent = function () {

        var self = this;

        $('.navMenuContent').each(function () {
            $(this).children('li').each(function () {
                $(this).click(function (event) {
                    self.trigger('switchPage', $(this).data('index'));
                });
            });
        });

    };

    NavMenu.prototype._initEvent = function () {

        this.on('switchPage', function (index) {
            this._showPage(index);
            GlobalVar.mainContent.trigger('activePage', index);
        });

        this._bindEvent();
    };

    NavMenu.prototype._showPage = function (index) {

        $('.centreContent').each(function () {
            $(this).hide();
        });

        var id = '';

        switch (index) {
            case this.PAGE_HOME_INDEX:
                id = 'homePage';
                break;
            case this.PAGE_ME_INFO_INDEX:
                id = 'meInfoPage';
                break;
            case this.PAGE_DIARIES_INDEX:
                id = 'diariesPage';
                break;
            case this.PAGE_LANGUAGE_INDEX:
                id = 'languagePage';
                break;
            default:
                break;
        }

        $('#' + id).fadeIn();

        setTimeout(function () {
            $('.js-off-canvas-exit').trigger('click');
        }, 200);

    };

    return NavMenu;
});
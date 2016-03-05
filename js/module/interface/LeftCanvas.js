/* global define, $ ,document, window */
define(function (require) {
    'use strict';

    var _ = require('underscore'),

        Backbone = require('backbone'),

        Mustache = require('mustache'),

        GlobalVar = require('module/GlobalVar'),

        LeftCanvasTemplate = require('text!../../../html/LeftCanvas.html');

    function LeftCanvas() {

        this._initEvent();
    }

    _.extend(LeftCanvas.prototype, Backbone.Events);

    LeftCanvas.prototype.PAGE_HOME_INDEX = 0;

    LeftCanvas.prototype.PAGE_FILE_MANAGE_INDEX = 1;

    LeftCanvas.prototype.PAGE_CLOUD_MODEL_INDEX = 2;

    LeftCanvas.prototype.PAGE_SETTING_INDEX = 3;

    LeftCanvas.prototype.PAGE_HELP_INDEX = 4;

    LeftCanvas.prototype.PAGE_LOGOUT_INDEX = 5;

    LeftCanvas.prototype.getContent = function () {
        var language = GlobalVar.language.LeftCanvas;

        return Mustache.render(LeftCanvasTemplate, {
            HomeMenuText: language.Home,
            FileManageMenuText: language.FileManage,
            CloudModelMenuText: language.CloudModel,
            SettingMenuText: language.Setting,
            HelpMenuText: language.Help,
            LogoutMenuText: language.Logout
        });
    };

    LeftCanvas.prototype._bindEvent = function () {

        var self = this;

        $('.leftCanvasMenuContent').each(function () {
            $(this).children('li').each(function () {
                $(this).click(function (event) {
                    self.trigger('switchPage', $(this).data('index'));
                });
            });
        });

    };

    LeftCanvas.prototype._initEvent = function () {

        this.on('switchPage', function (index) {
            this._showPage(index);
            GlobalVar.mainContent.trigger('activePage', index);
        });

        this._bindEvent();
    };

    LeftCanvas.prototype._showPage = function (index) {

        $('.centreContent').each(function () {
            $(this).hide();
        });

        var id = '';

        switch (index) {
        case this.PAGE_HOME_INDEX:
            id = 'homePage';
            break;
        case this.PAGE_FILE_MANAGE_INDEX:
            id = 'fileManagePage';
            break;
        case this.PAGE_CLOUD_MODEL_INDEX:
            id = 'cloudModelPage';
            break;
        case this.PAGE_SETTING_INDEX:
            id = 'settingPage';
            break;
        case this.PAGE_HELP_INDEX:
            id = 'helpPage';
            break;
        case this.PAGE_LOGOUT_INDEX:
            id = 'logoutPage';
            break;
        default:
            break;
        }

        $('#' + id).fadeIn();

        setTimeout(function () {
            $('.js-off-canvas-exit').trigger('click');
        }, 200);

    };

    return LeftCanvas;
});
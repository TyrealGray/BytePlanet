/* global define, setInterval,$,localStorage, window */
define(function (require) {
    'use strict';

    var _ = require('underscore'),

        Backbone = require('backbone'),

        Mustache = require('mustache'),

        BrowserUtil = require('lib/BrowserUtil'),

        MainContentAgent = require('module/agent/MainContentAgent'),

        StatusCodeManager = require('module/component/StatusCodeManager'),

        LeftCanvas = require('module/interface/LeftCanvas'),

        HomePage = require('module/interface/HomePage'),

        FileManagePage = require('module/interface/FileManagePage'),

        CloudModelPage = require('module/interface/CloudModelPage'),

        SettingPage = require('module/interface/SettingPage'),

        HelpPage = require('module/interface/HelpPage'),

        LogoutPage = require('module/interface/LogoutPage'),

        AlertBox = require('module/interface/kit/AlertBox'),

        GlobalVar = require('module/GlobalVar'),

        MainContentTemplate = require('text!../../../html/MainContent.html'),

        WebCameraTemplate = require('text!../../../html/WebCamera.html');

    function MainContent() {

        this._activePage = null;

        this._leftCanvas = null;

        this._pageSet = [];

        this._init();
    }

    _.extend(MainContent.prototype, Backbone.Events);

    MainContent.prototype._init = function () {

        this._initPage();

        this._initCentreContent();

        this._initLeftCanvas();

        this._initEvent();

        this._initTimer();
    };

    MainContent.prototype._initLeftCanvas = function () {
        this._leftCanvas = new LeftCanvas();
    };

    MainContent.prototype._initCentreContent = function () {
        this._pageSet.push(new HomePage());
        this._pageSet.push(new FileManagePage());
        this._pageSet.push(new CloudModelPage());
        this._pageSet.push(new SettingPage());
        this._pageSet.push(new HelpPage());
        this._pageSet.push(new LogoutPage());
    };

    MainContent.prototype._initPage = function () {

        GlobalVar.isMobile = BrowserUtil.isMobile();

        var language = GlobalVar.language.MainContent;

        $('#content').html(Mustache.render(MainContentTemplate, {
            PageCameraText: language.Camera,
            TakePhotoText: language.TakePhoto,
            StopImmediatelyText: language.StopImmediately,
            leftCanvasContent: LeftCanvas.prototype.getContent(),
            centreContent: [
                HomePage.prototype.getContent(), FileManagePage.prototype.getContent(),
                CloudModelPage.prototype.getContent(), SettingPage.prototype.getContent(),
                HelpPage.prototype.getContent(), LogoutPage.prototype.getContent()
            ]
        }));
    };

    MainContent.prototype._initEvent = function () {

        this._bindEvent();

        this.on('activePage', function (pageIndex) {

            for (var index = 0, len = this._pageSet.length; index < len; ++index) {

                if (this._pageSet[index].INDEX === pageIndex) {
                    this._pageSet[index].trigger('active');
                    this._activePage = this._pageSet[index];
                    continue;
                }

                this._pageSet[index].trigger('deactive');
            }
        });

    };

    MainContent.prototype._bindEvent = function () {
        $('#openCameraButton').click(function (event) {
            BrowserUtil.stopPropagation(event);

            $('#mainModalContent').html(WebCameraTemplate);

            MainContentAgent.queryPage('webcam', function (data) {

                $('#mainModal').foundation('open');
            }, function (error) {
                $('#mainModalContent').html(StatusCodeManager.getErrorMessage(error.status));
                $('#mainModal').foundation('open');
            });
        });

        $('#takePhotoButton').click(function (event) {
            BrowserUtil.stopPropagation(event);

            MainContentAgent.queryPage('take-photo', function (data) {

            }, function (error) {
                var alert = new AlertBox(StatusCodeManager.getErrorMessage(error.status));
                $('body').append(alert.getDiv());
            });

        });

        $('#closeModalButton').click(function (event) {

            $('#mainModalContent').html('');
        });

        $('#stopImmediatelyButton').click(function (event) {
            BrowserUtil.stopPropagation(event);

            MainContentAgent.stopImmediately(function (data) {

            }, function (error) {

                var alert = new AlertBox(StatusCodeManager.getErrorMessage(error.status));
                $('body').append(alert.getDiv());
            });
        });
    };

    MainContent.prototype._initTimer = function () {

        this._activePage = this._pageSet[0];

    };

    return MainContent;
});
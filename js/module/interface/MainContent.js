/* global define, setInterval,$,localStorage, window */
define(function (require) {
    'use strict';

    var _ = require('underscore'),

        Backbone = require('backbone'),

        Mustache = require('mustache'),

        BrowserUtil = require('lib/BrowserUtil'),

        LeftCanvas = require('module/interface/LeftCanvas'),

        HomePage = require('module/interface/HomePage'),

        MeInfoPage = require('module/interface/MeInfoPage'),
        
        DiariesPage = require('module/interface/DiariesPage'),

        LanguageSettingPage = require('module/interface/LanguageSettingPage'),

        AlertBox = require('module/interface/kit/AlertBox'),

        GlobalVar = require('module/GlobalVar'),

        MainContentTemplate = require('text!../../../html/MainContent.html');

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
    };

    MainContent.prototype._initLeftCanvas = function () {
        this._leftCanvas = new LeftCanvas();
    };

    MainContent.prototype._initCentreContent = function () {
        this._pageSet.push(new HomePage());
        this._pageSet.push(new MeInfoPage());
        this._pageSet.push(new DiariesPage());
        this._pageSet.push(new LanguageSettingPage());
    };

    MainContent.prototype._initPage = function () {

        GlobalVar.isMobile = BrowserUtil.isMobile();

        var language = GlobalVar.language.MainContent;

        $('#content').html(Mustache.render(MainContentTemplate, {
            GithubText:language.Github,
            TwitterText:language.Twitter,
            SteamText: language.Steam,
            leftCanvasContent: LeftCanvas.prototype.getContent(),
            centreContent: [
                HomePage.prototype.getContent(), MeInfoPage.prototype.getContent(),
                DiariesPage.prototype.getContent(),LanguageSettingPage.prototype.getContent()
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

        $('#closeModalButton').click(function (event) {

            $('#mainModalContent').html('');
        });

    };

    return MainContent;
});
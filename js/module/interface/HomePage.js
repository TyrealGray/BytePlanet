define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        GlobalVar = require('module/GlobalVar'),

        TemperatureManager = require('module/component/TemperatureManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        HomePageTemplate = require('text!../../../html/HomePage.html');

    function HomePage() {

        this.superClass();
    }

    InheritHelper.inheritPrototype(HomePage, CentreContentPage);

    HomePage.prototype.INDEX = 0;

    HomePage.prototype.active = function () {

    };

    HomePage.prototype.getContent = function () {

        var language = GlobalVar.language;

        return Mustache.render(HomePageTemplate,{
            GithubText: language.Github,
            TwitterText: language.Twitter,
            SteamText: language.Steam,
            MeInfoTitleText: language.MeInfoPage.Title,
            DescribeText: language.MeInfoPage.RecentlyMove
        });
    };

    HomePage.prototype.update = function () {

    };

    return HomePage;
});
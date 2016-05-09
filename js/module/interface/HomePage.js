define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

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

        return Mustache.render(HomePageTemplate);
    };

    HomePage.prototype.update = function () {

    };

    return HomePage;
});
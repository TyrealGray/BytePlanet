define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        TemperatureManager = require('module/component/TemperatureManager'),

        CentreContentPage = require('module/interface/CentreContentPage');

    function DiariesPage() {

    }

    InheritHelper.inheritPrototype(DiariesPage, CentreContentPage);

    HomePage.prototype.INDEX = 2;

    return DiariesPage;
});
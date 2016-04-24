define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        TemperatureManager = require('module/component/TemperatureManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),
        
        DiariesPageTemplate = require('text!../../../html/DiariesPage.html');

    function DiariesPage() {
        
        this.superClass();
    }

    InheritHelper.inheritPrototype(DiariesPage, CentreContentPage);

    DiariesPage.prototype.INDEX = 2;
    
    DiariesPage.prototype.getContent = function () {

        return Mustache.render(DiariesPageTemplate);
    };

    return DiariesPage;
});
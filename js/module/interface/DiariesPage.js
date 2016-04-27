define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),
        
        GlobalVar = require('module/GlobalVar'),

        TemperatureManager = require('module/component/TemperatureManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),
        
        DiariesPageTemplate = require('text!../../../html/DiariesPage.html');

    function DiariesPage() {
        
        this.superClass();
    }

    InheritHelper.inheritPrototype(DiariesPage, CentreContentPage);

    DiariesPage.prototype.INDEX = 2;
    
    DiariesPage.prototype.getContent = function () {
        
        var language = GlobalVar.language.DiariesPage;

        return Mustache.render(DiariesPageTemplate,{
            TitleText:language.Title,
            DateText:language.Date,
            tableBody:'test'
        });
    };

    return DiariesPage;
});
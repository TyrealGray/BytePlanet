define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        GlobalVar = require('module/GlobalVar'),

        DiaryManager = require('module/component/DiaryManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        DiariesPageTemplate = require('text!../../../html/DiariesPage.html'),
        
        DiariesTableBodyTemplate = require('text!../../../html/diraiesTable/tableBody.html');

    function DiariesPage() {

        this.superClass();
    }

    InheritHelper.inheritPrototype(DiariesPage, CentreContentPage);

    DiariesPage.prototype.INDEX = 2;

    DiariesPage.prototype.getContent = function () {

        var language = GlobalVar.language.DiariesPage,
            diraiesList = DiaryManager.getList(locale);

        return Mustache.render(DiariesPageTemplate, {
            TitleText: language.Title,
            DateText: language.Date,
            tableBody: Mustache.render(DiariesTableBodyTemplate,{
                tableItems:diraiesList
            })
        });
    };

    return DiariesPage;
});
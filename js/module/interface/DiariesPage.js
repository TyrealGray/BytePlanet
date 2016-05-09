define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        GlobalVar = require('module/GlobalVar'),

        DiaryManager = require('module/component/DiaryManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        DiariesPageTemplate = require('text!../../../html/DiariesPage.html'),
        
        DiariesTableBodyTemplate = require('text!../../../html/diariesTable/tableBody.html');

    function DiariesPage() {

        this.superClass();
        
        this._bindEvent();
    }

    InheritHelper.inheritPrototype(DiariesPage, CentreContentPage);

    DiariesPage.prototype.INDEX = 2;
    
    DiariesPage.prototype._bindEvent = function(){
        
        $('.diaryTitle').click(function(event){
           //TODO get the index and query the diary html
        });
    };

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
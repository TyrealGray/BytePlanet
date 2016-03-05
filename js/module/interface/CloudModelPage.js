/* global define, $ */
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),
        
        InheritHelper = require('lib/InheritHelper'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        GlobalVar = require('module/GlobalVar'),

        CloudModelPageTemplate = require('text!../../../html/CloudModelPage.html');

    function CloudModelPage() {

        this.superClass();
    }

    InheritHelper.inheritPrototype(CloudModelPage, CentreContentPage);

    CloudModelPage.prototype.INDEX = 2;

    CloudModelPage.prototype.getContent = function () {

        var language = GlobalVar.language.CloudModelPage;

        return Mustache.render(CloudModelPageTemplate, {
            SearchInputInnerText: language.Search,
            SearchButtonText: language.Search,
            AuthorRadioText: language.AuthorRadio,
            DateRadioText: language.DateRadio
        });
    };

    return CloudModelPage;
});
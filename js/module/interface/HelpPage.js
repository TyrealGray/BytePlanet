/* global define, setInterval,$,localStorage,document,PDFJS,navigator */
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        InheritHelper = require('lib/InheritHelper'),

        GlobalVar = require('module/GlobalVar'),

        HelpPageTemplate = require('text!../../../html/HelpPage.html');

    function HelpPage() {

        this.superClass();
    }

    InheritHelper.inheritPrototype(HelpPage, CentreContentPage);

    HelpPage.prototype.INDEX = 4;

    HelpPage.prototype.getContent = function () {

        var language = GlobalVar.language.HelpPage;

        return Mustache.render(HelpPageTemplate, {
            MostFunDocumentationText: language.MostFunDocumentation
        });
    };

    return HelpPage;

});
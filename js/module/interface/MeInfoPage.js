define(function(require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        GlobalVar = require('module/GlobalVar'),

        MeInfoPageTemplate = require('text!../../../html/MeInfoPage.html');

    function MeInfoPage() {
        this.superClass();
    }

    InheritHelper.inheritPrototype(MeInfoPage, CentreContentPage);

    MeInfoPage.prototype.INDEX = 1;

    MeInfoPage.prototype.getContent = function() {
        var language = GlobalVar.language.MeInfoPage;
        return Mustache.render(MeInfoPageTemplate, {
            TitleText: language.Title,
            RecentlyMoveText: language.RecentlyMove,
            DescriptionText: language.Description
        });
    }

    return MeInfoPage;
});
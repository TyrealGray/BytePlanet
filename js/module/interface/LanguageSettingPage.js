define(function(require) {
    'use strict';

    var Mustache = require('mustache'),

        BrowserUtil = require('lib/BrowserUtil'),

        InheritHelper = require('lib/InheritHelper'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        GlobalVar = require('module/GlobalVar'),

        LanguageSettingPageTemplate = require('text!../../../html/LanguageSettingPage.html');

    function LanguageSettingPage() {
        this.superClass();

        this._bindEvent();
    }

    InheritHelper.inheritPrototype(LanguageSettingPage, CentreContentPage);

    LanguageSettingPage.prototype.INDEX = 2;

    LanguageSettingPage.prototype.getContent = function() {
        var language = GlobalVar.language.LanguageSettingPage;
        return Mustache.render(LanguageSettingPageTemplate, {
            SettingText: language.Setting,
            SaveButtonText: language.Save
        });
    }

    LanguageSettingPage.prototype._bindEvent = function() {
        var self = this;

        $('#saveLanguageButton').click(function(event) {

            BrowserUtil.stopPropagation(event);

            $('.languageSetting').each(function() {

                if (!this.checked) {
                    return;
                }

                var langData = {
                    lang: $(this).val()
                };

                localStorage.setItem('locale', langData.lang);

                location.reload(true);
            });


        });
    };

    return LanguageSettingPage;
});
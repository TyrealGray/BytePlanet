define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        GlobalVar = require('module/GlobalVar'),

        LogoutPageTemplate = require('text!../../../html/LogoutPage.html');

    function LogoutPage() {

        this.superClass();

        this._bindEvent();
    }

    InheritHelper.inheritPrototype(LogoutPage, CentreContentPage);

    LogoutPage.prototype.INDEX = 5;

    LogoutPage.prototype._bindEvent = function () {

        $('#logoutButton').click(function () {

            window.location.href = 'logout';
        });
    };

    LogoutPage.prototype.getContent = function () {

        return Mustache.render(LogoutPageTemplate, {
            ConfirmUserLogoutText: GlobalVar.language.LogoutPage.ConfirmUserLogout,
            LogoutButtonText: GlobalVar.language.LeftCanvas.Logout
        });
    };

    return LogoutPage;

});
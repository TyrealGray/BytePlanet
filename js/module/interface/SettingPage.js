/* global define, $,document,console,window,localStorage,clearTimeout,setTimeout,location */
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        InheritHelper = require('lib/InheritHelper'),

        BrowserUtil = require('lib/BrowserUtil'),

        StatusCodeManager = require('module/component/StatusCodeManager'),

        AlertBox = require('module/interface/kit/AlertBox'),

        Loader = require('module/interface/kit/Loader'),

        SettingPageAgent = require('module/agent/SettingPageAgent'),

        GlobalVar = require('module/GlobalVar'),

        SettingPageTemplate = require('text!../../../html/SettingPage.html'),

        PasswordSettingTemplate = require('text!../../../html/settingPage/PasswordSetting.html'),

        FirmwareSettingTemplate = require('text!../../../html/settingPage/FirmwareSetting.html'),

        EmailSettingTemplate = require('text!../../../html/settingPage/EmailSetting.html'),

        WifiSettingTemplate = require('text!../../../html/settingPage/WifiSetting.html'),

        LanguageSettingTemplate = require('text!../../../html/settingPage/LanguageSetting.html'),

        AvailableWifiTableTemplate = require('text!../../../html/settingPage/availableWifiTable/TableBody.html'),

        WifiOperateModalTemplate = require('text!../../../html/settingPage/wifiConnect/WifiOperateModal.html');

    var refreshWifiTimer = null;

    function SettingPage() {

        this.superClass();

        this._bindEvent();
    }

    InheritHelper.inheritPrototype(SettingPage, CentreContentPage);

    SettingPage.prototype.INDEX = 3;

    SettingPage.prototype.active = function () {

        this._upgradableCheck();

        this._emailSettingUpdate();

        if (null === refreshWifiTimer) {
            this._getCurrentWifi();
        }
    };

    SettingPage.prototype._upgradableCheck = function () {

        var self = this;

        SettingPageAgent.queryData('/get-version', function (data) {

            var versionData = JSON.parse(data);

            $('#curPanelVersion').html(versionData.panel);

            $('#curSystemVersion').html(versionData.system);

        }, function (error) {

            self.notifyErrorMessage(error.status);
        });


    };

    SettingPage.prototype._emailSettingUpdate = function () {

        var self = this;

        SettingPageAgent.queryData('/get-mail-setting', function (data) {

            var emailData = JSON.parse(data);

            $('#hostEmail').val(emailData.mail_from);
            $('#hostEmailPassword').val(emailData.mail_password);
            $('#hostServer').val(emailData.mail_server);
            $('#hostServerPort').val(emailData.mail_port);
            $('#emailPrefix').val(emailData.mail_prefix);
            $('#receiveEmail').val(emailData.mai_to);

        }, function (error) {

            self.notifyErrorMessage(error.status);
        });
    };

    SettingPage.prototype._getCurrentWifi = function () {

        var self = this;

        SettingPageAgent.queryData('/get-current-wifi', function (data) {

            var currentWifiData = JSON.parse(data);

            $('#curWifiName').html(currentWifiData.ssid + '(' + currentWifiData.ip + ')');

        }, function (error) {

            $('#curWifiName').html(StatusCodeManager.getErrorMessage(error.status));

            self.notifyErrorMessage(error.status);
        });
    };

    SettingPage.prototype._bindEvent = function () {

        this._bindPasswordPageEvent();

        this._bindFirmwarePageEvent();

        this._bindEmailPageEvent();

        this._bindWifiPageEvent();

        this._bindLanguagePageEvent();
    };

    SettingPage.prototype._bindPasswordPageEvent = function () {

        var self = this;

        $('#savePasswordButton').click(function (event) {

            BrowserUtil.stopPropagation(event);

            var settingData = {
                old_password: $('#oldPassword').val(),
                new_password: $('#newPassword').val(),
                rpt_password: $('#confirmPassword').val()
            };

            SettingPageAgent.changePassword(settingData, function (data) {

                var dataInfo = JSON.parse(data);

                if (!StatusCodeManager.isOK(dataInfo.code)) {
                    //do error

                    console.error('Unable to change password!');
                    return;
                }

                window.location.href = dataInfo.msg;

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });
    };

    SettingPage.prototype._bindFirmwarePageEvent = function () {

        var self = this;

        $('#firmwareUpdateButton').click(function (event) {

            SettingPageAgent.queryData('/chk-update', function (data) {

                var updateData = JSON.parse(data);

                var firmwareData = {
                    system_update: updateData.system_update,
                    panel_update: updateData.panel_update,
                    marlin_update: updateData.marlin_update
                };

                SettingPageAgent.updateFirmware(firmwareData, function (data) {

                }, function (error) {
                    self.notifyErrorMessage(error.status);
                });

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });
    };

    SettingPage.prototype._bindEmailPageEvent = function () {

        var self = this;

        $('#saveEmailButton').click(function (event) {

            BrowserUtil.stopPropagation(event);

            var emailData = {
                mail_from: $('#hostEmail').val(),
                mail_password: $('#hostEmailPassword').val(),
                mail_server: $('#hostServer').val(),
                mail_port: $('#hostServerPort').val(),
                mail_prefix: $('#emailPrefix').val(),
                mail_to: $('#receiveEmail').val()
            };

            SettingPageAgent.changeEmail(emailData, function (data) {

                var emailInfo = JSON.parse(data);

                if (!StatusCodeManager.isOK(emailInfo.code)) {
                    //do error

                    self.notifyErrorMessage(emailInfo.code);
                    return;
                }

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });
    };

    SettingPage.prototype._bindWifiPageEvent = function () {

        var self = this;

        $('#saveRouterSettingButton').click(function (event) {
            BrowserUtil.stopPropagation(event);

            var routerData = {
                ssid: $('#routerName').val(),
                password: $('#routerPassword').val()
            };

            SettingPageAgent.changeRouter(routerData, function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });

        $('#getAvailableWifiButton').click(function (event) {

            BrowserUtil.stopPropagation(event);

            $('#wifiTableFooter').html(Loader.getDiv());

            $('#availableWifiTableBody').html('');

            if (GlobalVar.debug) {

                var wifis = [{
                    ssid: 'name',
                    numberID: 2,
                    db: -8,
                    secure: 'secure'
                }];

                self._setWifiListTable(wifis);

                return;
            }

            SettingPageAgent.queryData('/get-wireless-list', function (data) {

                var wifiData = JSON.parse(data);

                self._setWifiListTable(wifiData);

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });
    };

    SettingPage.prototype._setWifiListTable = function (data) {

        var wifiItems = [],
            wifiInfo = null,
            self = this;

        for (var index = 0, len = data.length; index < len; ++index) {

            wifiInfo = data[index];

            wifiItems.push({
                name: wifiInfo.ssid,
                numberID: index,
                strength: (100 + parseFloat(wifiInfo.db)).toFixed(2),
                protocol: wifiInfo.secure,
                connectText: GlobalVar.language.SettingPage.Connect
            });
        }

        $('#wifiTableFooter').html('');

        $('#availableWifiTableBody').html(Mustache.render(AvailableWifiTableTemplate, {
            wifiItems: wifiItems
        }));

        $('.ConnectWifiButton').each(function () {

            $(this).click(function (event) {

                BrowserUtil.stopPropagation(event);

                self._onConnectButtonClick($(this).closest('tr').data('wifiname'), $(this).closest('tr').data('numberid'),
                    $(this).closest('tr').data('protocol'));
            });
        });

    };

    SettingPage.prototype._onConnectButtonClick = function (wifiname, numberid, protocol) {

        var language = GlobalVar.language.SettingPage;

        $('#mainModalContent').html(Mustache.render(WifiOperateModalTemplate, {
            ConnectText: language.Connect,
            SaveButtonText: language.Save,
            wifiNameText: wifiname
        }));

        this._bindWifiConnectModalEvent(wifiname, numberid, protocol);

        $('#mainModal').foundation('open');

    };

    SettingPage.prototype._bindWifiConnectModalEvent = function (wifiname, numberid, protocol) {

        var self = this;

        $('#wifi_ConnectButton').click(function (event) {

            clearTimeout(refreshWifiTimer);

            BrowserUtil.stopPropagation(event);

            var wifiData = {
                ssid: wifiname,
                number: numberid,
                secure: protocol,
                password: $('#wifiPassword').val()
            };

            SettingPageAgent.connectWifi(wifiData, function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

            $('#mainModal').foundation('close');

            $('#curWifiName').html(Loader.getDiv());

            refreshWifiTimer = setTimeout(function () {
                self._getCurrentWifi();
                refreshWifiTimer = null;
            }, 25000);

        });
    };

    SettingPage.prototype._bindLanguagePageEvent = function () {

        var self = this;

        $('#saveLanguageButton').click(function (event) {

            BrowserUtil.stopPropagation(event);

            $('.languageSetting').each(function () {

                if (!this.checked) {
                    return;
                }

                var langData = {
                    lang: $(this).val()
                };

                localStorage.setItem('locale', langData.lang);

                SettingPageAgent.changeLanguage(langData, function (data) {

                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });

                location.reload(true);
            });


        });

    };

    SettingPage.prototype.getContent = function () {

        var language = GlobalVar.language.SettingPage;

        return Mustache.render(SettingPageTemplate, {

            SettingText: language.Setting,
            PasswordSettingText: language.PasswordSetting,
            FirmwareSettingText: language.FirmwareSetting,
            EmailSettingText: language.EmailSetting,
            WifiSettingText: language.WifiSetting,
            passwordSetting: Mustache.render(PasswordSettingTemplate, {
                OldPasswordText: language.OldPassword,
                NewPasswordText: language.NewPassword,
                ConfirmPasswordText: language.ConfirmPassword,
                SaveButtonText: language.Save
            }),
            firmwareSetting: Mustache.render(FirmwareSettingTemplate, {
                CurPanelVersionText: language.CurPanelVersion,
                CurSystemVersionText: language.CurSystemVersion,
                UpdateButtonText: language.Update
            }),
            emailSetting: Mustache.render(EmailSettingTemplate, {
                HostEmailText: language.HostEmail,
                HostEmailPasswordText: language.HostEmailPassword,
                HostEmailServerText: language.HostEmailServer,
                HostServerText: language.HostServer,
                HostServerPortText: language.HostServerPort,
                EmailPrefixText: language.EmailPrefix,
                ReceiveEmailText: language.ReceiveEmail,
                SaveButtonText: language.Save
            }),
            wifiSetting: Mustache.render(WifiSettingTemplate, {
                CurWifiConnectionText: language.CurWifiConnection,
                RouterSettingText: language.RouterSetting,
                RouterNameText: language.RouterName,
                RouterPasswordText: language.RouterPassword,
                AvailableWifiText: language.AvailableWifi,
                WifiNameText: language.WifiName,
                WifiStrengthText: language.WifiStrength,
                EncryptionProtocolText: language.EncryptionProtocol,
                ConnectText: language.Connect,
                SaveButtonText: language.Save
            }),
            languageSetting: Mustache.render(LanguageSettingTemplate, {
                SaveButtonText: language.Save
            })
        });
    };

    return SettingPage;

});
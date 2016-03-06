/* global define, setTimeout,document,setInterval,console,$,window */
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        TemperatureManager = require('module/component/TemperatureManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        GlobalVar = require('module/GlobalVar'),

        HomePageTemplate = require('text!../../../html/HomePage.html'),

        ControlPanelTemplate = require('text!../../../html/homePage/ControlPanel.html'),

        StatusPanelTemplate = require('text!../../../html/homePage/StatusPanel.html'),

        ControlPanelSvgTemplate = require('text!../../../html/homePage/ControlSvg.html');

    function HomePage() {

        this.superClass();
    }

    InheritHelper.inheritPrototype(HomePage, CentreContentPage);

    HomePage.prototype.INDEX = 0;

    HomePage.prototype.active = function () {

    };

    HomePage.prototype.getContent = function () {

        var language = GlobalVar.language.HomePage;

        var temperaturesInfo = {
            BedTargetTemperatureText: language.BedTargetTemperature,
            BedTemperatureText: language.BedTemperature,
            ExtruderTargetTemperatureText: language.ExtruderTargetTemperature,
            ExtruderTemperatureText: language.ExtruderTemperature,
            bedTargetTemperatureColor: TemperatureManager.prototype.BedTargetTemperatureColor,
            bedTemperatureColor: TemperatureManager.prototype.BedTemperatureColor,
            extruderTargetTemperatureColor: TemperatureManager.prototype.ExtruderTargetTemperatureColor,
            extruderTemperatureColor: TemperatureManager.prototype.ExtruderTemperatureColor
        };

        return Mustache.render(HomePageTemplate, {
            TemperatureInfoText: language.TemperatureInfo,
            GCodeControlText: language.GCodeControl,
            temperaturesInfo: temperaturesInfo,
            MostFunControlPanelText: language.MostFunControlPanel,
            ControlPanel: Mustache.render(ControlPanelTemplate, {
                controlSvg: ControlPanelSvgTemplate,
                LevellingButtonText: language.Levelling,
                temperaturesInfo: temperaturesInfo
            }),
            StatusPanel: Mustache.render(StatusPanelTemplate, {
                CurrentPrintFileText: language.CurrentPrintFile,
                CurrentPrintLayerText: language.CurrentPrintLayer,
                PrintLayerCountText: language.PrintLayerCount,
                SaveButtonText: GlobalVar.language.SettingPage.Save,
                PauseButtonText: language.Pause,
                CancelButtonText: language.Cancel,
                ResumeButtonText: language.Resume
            }),
            SendButtonText: language.Send,
            ReprintableTableText: language.ReprintableTable,
            ReprintableFileNameText: language.ReprintableFileName,
            ReprintableFileCreatedDateText: language.ReprintableFileCreatedDate,
            ReprintableFileOperateText: language.ReprintableFileOperate
        });
    };

    HomePage.prototype._init = function () {

        this.disable(false);

    };

    HomePage.prototype.update = function () {

    };

    return HomePage;
});
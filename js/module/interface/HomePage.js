/* global define, setTimeout,document,setInterval,console,$,window */
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        BrowserUtil = require('lib/BrowserUtil'),

        DateTimeUtil = require('lib/DateTimeUtil'),

        HomePageAgent = require('module/agent/HomePageAgent'),

        FileManagePageAgent = require('module/agent/FileManagePageAgent'),

        StatusCodeManager = require('module/component/StatusCodeManager'),

        TemperatureManager = require('module/component/TemperatureManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        Loader = require('module/interface/kit/Loader'),

        AlertBox = require('module/interface/kit/AlertBox'),

        GlobalVar = require('module/GlobalVar'),

        HomePageTemplate = require('text!../../../html/HomePage.html'),

        ControlPanelTemplate = require('text!../../../html/homePage/ControlPanel.html'),

        StatusPanelTemplate = require('text!../../../html/homePage/StatusPanel.html'),

        ControlPanelSvgTemplate = require('text!../../../html/homePage/ControlSvg.html'),

        ReprintableTableBodyTemplaye = require('text!../../../html/homePage/reprintableTable/TableBody.html');

    var reprintFileFlag = 4;

    function HomePage() {

        this.superClass();

        //var ctx = document.getElementById('temperatureChart').getContext('2d');

        //this._temperatureManager = new TemperatureManager(ctx);

        //this._init();
    }

    InheritHelper.inheritPrototype(HomePage, CentreContentPage);

    HomePage.prototype.INDEX = 0;

    HomePage.prototype.active = function () {

        this._temperatureManager.repaintSize();
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

        this._initChart();

        this.disable(false);

        if (GlobalVar.isMobile) {
            $('#temperatureChart').hide();
            $('#controlPanel').hide();
            $('#gCodeControlPanel').hide();
        }

        this._initUpdateTimer();

        this._bindEvent();

        this.updataReprintTable();
    };

    HomePage.prototype._initChart = function () {

        var self = this;

        var temperatureManager = this._temperatureManager;

        setTimeout(function () {

            temperatureManager.repaintSize();

            for (var index = 0, len = 20; index < len; ++index) {

                temperatureManager.addData({
                    bedTemperature: 0,
                    bedSettingTemperature: 0,

                    e0Temperature: 0,
                    e0SettingTemperature: 0,
                    time: 'hh/mm/ss'
                });
            }

            setTimeout(function () {
                temperatureManager.repaintSize();
            }, 2000);

        }, 1200);

    };

    HomePage.prototype.updataReprintTable = function () {

        var language = GlobalVar.language.HomePage,
            self = this;

        $('#reprintableTableFooter').html(Loader.getDiv());

        if (GlobalVar.debug) {

            $('#reprintableTableBody').html(Mustache.render(ReprintableTableBodyTemplaye, {
                reprintItems: [{
                    name: 'test1',
                    date: '1970.2.2',
                    flag: reprintFileFlag,
                    ReprintButtonText: language.Reprint,
                    DeleteButtonText: language.Cancel
                }, {
                    name: 'test2',
                    date: '1970.2.2',
                    flag: reprintFileFlag,
                    ReprintButtonText: language.Reprint,
                    DeleteButtonText: language.Cancel
                }]
            }));

            $('#reprintableTableFooter').html('');

            this._bindReprintableTableEvent();

            return;
        }

        FileManagePageAgent.queryFile('backlist', function (data) {

            var reprintData = JSON.parse(data),
                reprintItems = [];

            var reprintFile = null;

            if (0 === reprintData.length) {
                $('#reprintableTableRow').hide();
                return;
            }

            for (var index = 0, len = reprintData.length; index < len; ++index) {

                reprintFile = reprintData[index];

                reprintItems.push({
                    name: reprintFile.fileName,
                    date: reprintFile.fileTime,
                    flag: reprintFileFlag,
                    ReprintButtonText: language.Reprint,
                    DeleteButtonText: language.Cancel
                });
            }

            $('#reprintableTableBody').html(Mustache.render(ReprintableTableBodyTemplaye, {
                reprintItems: reprintItems
            }));

            $('#reprintableTableFooter').html('');

            self._bindReprintableTableEvent();

        }, function (error) {
            self.notifyErrorMessage(error.status);
        });

    };

    HomePage.prototype._bindReprintableTableEvent = function () {

        var language = GlobalVar.language.AlertBox,
            self = this;

        $('.ReprintButton').each(function () {

            $(this).click(function (event) {

                var pintFiles = {
                    filename: $(this).closest('tr').data('filename'),
                    path: $(this).closest('tr').data('flag')
                };

                BrowserUtil.stopPropagation(event);

                FileManagePageAgent.operateFiles('/print/', pintFiles, function (data) {

                    var dataInfo = JSON.parse(data);

                    if (StatusCodeManager.isOK(dataInfo.code)) {

                        self.updataReprintTable();
                        return;
                    }

                    var alert = new AlertBox(language.PrintFileError);
                    $('body').append(alert.getDiv());

                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });
            });

        });

        $('.CancelReprintButton').each(function () {

            $(this).click(function (event) {

                BrowserUtil.stopPropagation(event);

                var cancelFiles = {
                    filename: $(this).closest('tr').data('filename')
                };

                FileManagePageAgent.operateFiles('/cancel-task', cancelFiles, function (data) {

                    self.updataReprintTable();

                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });
            });

        });
    };

    HomePage.prototype._initUpdateTimer = function () {

        var temperatureManager = this._temperatureManager,
            isPrinting = false,
            self = this;

        if (GlobalVar.debug) {

            var stateDebugInfo = {
                state: 'printing',
                details: {
                    fileName: 'testFileName',
                    layerNum: 'layerNumber',
                    layerCount: '90'
                }
            };
        }

        var count = 0;

        setInterval(function () {

            if (GlobalVar.debug) {

                $('#gcodeLogWindow').prepend('[' + DateTimeUtil.formatDateToTime(new Date()) + '] ' + (++count) + ' test<br>');

                //stateDebugInfo.state = ('ready' === stateDebugInfo.state) ? 'printing' : 'ready';

                if ('ready' === stateDebugInfo.state) {

                    if (!isPrinting) {
                        return;
                    }

                    isPrinting = false;

                    $('#statusPanel').hide();

                    if (!GlobalVar.isMobile) {
                        $('#controlPanel').show();
                    }

                    $('#reprintableTableRow').show();
                    self.updataReprintTable();

                    return;
                }

                $('#currentPrintFile').html(stateDebugInfo.details.fileName);
                $('#currentPrintLayer').html(stateDebugInfo.details.layerNum);
                $('#printLayerCount').html(stateDebugInfo.details.layerCount);

                if (isPrinting) {
                    return;
                }

                isPrinting = true;

                $('#controlPanel').hide();
                $('#statusPanel').show();
                $('#reprintableTableRow').hide();

                return;
            }

            HomePageAgent.queryGCodeLog(function (data) {

                var GCodeLogData = JSON.parse(data);

                if (0 === GCodeLogData.result.length) {
                    return;
                }

                $('#gcodeLogWindow').prepend('[' + DateTimeUtil.formatDateToTime(new Date()) + '] ' + GCodeLogData.result + '<br>');

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

            HomePageAgent.queryPrint('temperature', function (data) {
                temperatureManager.updateData(data);
            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

            HomePageAgent.queryPrint('state', function (data) {

                var stateInfo = JSON.parse(data).msg;

                if ('error' == stateInfo.state) {
                    var alert = new AlertBox(GlobalVar.language.AlertBox.HardwareError);
                    $('body').append(alert.getDiv());
                    return;
                }

                if ('updating' === stateInfo.state) {
                    window.location.href = 'waiting-update';
                }

                if ('ready' === stateInfo.state) {

                    if (!isPrinting) {
                        return;
                    }

                    isPrinting = false;

                    $('#statusPanel').hide();

                    if (!GlobalVar.isMobile) {
                        $('#controlPanel').show();
                    }

                    $('#reprintableTableRow').show();
                    self.updataReprintTable();

                    return;
                }

                $('#currentPrintFile').html(stateInfo.details.fileName);
                $('#currentPrintLayer').html(stateInfo.details.layerNum);
                $('#printLayerCount').html(stateInfo.details.layerCount);

                if (isPrinting) {
                    return;
                }

                isPrinting = true;

                $('#controlPanel').hide();
                $('#statusPanel').show();
                $('#reprintableTableRow').hide();

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

        }, 3000);

    };

    HomePage.prototype._bindEvent = function () {

        this._bindControlPanelEvent();

        this._bindStatusPanelEvent();

    };

    HomePage.prototype._bindControlPanelEvent = function () {

        var self = this;

        $('#levellingPlatformButton').click(function (event) {

            BrowserUtil.stopPropagation(event);

            HomePageAgent.operatePrint('/auto-leveling', function (data) {

                var dataInfo = JSON.parse(data);

                if (StatusCodeManager.isOK(dataInfo.code)) {
                    return;
                }

                var alert = new AlertBox(StatusCodeManager.getErrorMessage(dataInfo.code));
                $('body').append(alert.getDiv());

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

        });

        $('#sendPanelCmdButton').click(function () {
            HomePageAgent.sendCmd($('#panelCmdText').val(), function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });

        $('#activeBedTemperature').click(function (event) {

            BrowserUtil.stopPropagation(event);

            if (!this.checked) {

                HomePageAgent.sendCmd($('#bedTemperatureSlider').data('cmd') + '0', function () {

                }, function (error) {
                    self.notifyErrorMessage(error.status);
                });

                return;
            }

            HomePageAgent.sendCmd($('#bedTemperatureSlider').data('cmd') + $('#bedTemperatureSlider').val(), function () {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

        });

        $('#activeExtruderTemperature').click(function (event) {

            BrowserUtil.stopPropagation(event);

            if (!this.checked) {

                HomePageAgent.sendCmd($('#extruderTemperatureSlider').data('cmd') + '0', function () {

                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });

                return;
            }

            HomePageAgent.sendCmd($('#extruderTemperatureSlider').data('cmd') + $('#extruderTemperatureSlider').val(), function () {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });

        $('.temperaturesSlider').each(function () {

            $(this).mouseup(function (event) {

                if (!document.getElementById($(this).data('checkboxid')).checked) {
                    return;
                }

                var $input = $('#' + $(this).data('inputid'));

                HomePageAgent.sendCmd($input.data('cmd') + $input.val(), function () {

                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });

            });
        });

        $('.temperatureInput').each(function () {

            $(this).change(function () {

                if (!document.getElementById($(this).data('checkboxid')).checked) {
                    return;
                }

                HomePageAgent.sendCmd($(this).data('cmd') + $(this).val(), function () {

                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });

            });

        });

        $('.controlPanelButton').each(function () {
            $(this).click(function (event) {

                BrowserUtil.stopPropagation(event);

                var cmd = $(this).data('cmd');

                HomePageAgent.sendCmd('G91', function () {

                    HomePageAgent.sendCmd(cmd, function (data) {

                    });
                }, function (error) {

                    self.notifyErrorMessage(error.status);
                });

            });
        });
    };

    HomePage.prototype._bindStatusPanelEvent = function () {

        var self = this;

        $('#savePrintButton').click(function () {
            HomePageAgent.operatePrint('/save-task', function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });

        $('#pausePrintButton').click(function () {
            HomePageAgent.operatePrint('/pause', function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });

        $('#resumePrintButton').click(function () {
            HomePageAgent.operatePrint('/resume', function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });

        $('#cancelPrintButton').click(function () {
            HomePageAgent.operatePrint('/cancel', function (data) {

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });
        });
    };

    HomePage.prototype.update = function () {

        var date = new Date(),
            temperatures = null;

        if (GlobalVar.debug) {

            temperatures = {
                bedTemperature: Math.floor(Math.random() * 60) + 14,
                bedSettingTemperature: 220,

                e0Temperature: Math.floor(Math.random() * 60) + 14,
                e0SettingTemperature: 150,
            };

            this._temperatureManager.addData({
                bedTemperature: temperatures.bedTemperature,
                bedSettingTemperature: 220,

                e0Temperature: temperatures.e0Temperature,
                e0SettingTemperature: 150,

                time: date.getMinutes() + ":" + date.getSeconds()
            });

            this._temperatureManager.repaintSize();

            $('#bedTargetTemperature').html(220);

            $('#bedTemperature').html(temperatures.bedTemperature);

            $('#extruderTargetTemperature').html(150);

            $('#extruderTemperature').html(temperatures.e0Temperature);

            return;
        }

        this._temperatureManager.repaintData(date);

        this._temperatureManager.repaintSize();

        temperatures = this._temperatureManager.getTemperatures();

        $('#bedTargetTemperature').html(temperatures.bedTargetTemperature);

        $('#bedTemperature').html(temperatures.bedTemperature);

        $('#extruderTargetTemperature').html(temperatures.extruderTargetTemperature);

        $('#extruderTemperature').html(temperatures.extruderTemperature);

    };

    return HomePage;
});
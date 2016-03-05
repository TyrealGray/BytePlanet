/* global define, setTimeout, setInterval */
define(function (require) {
    'use strict';

    var Chart = require('thirdLib/chart'),

        DateTimeUtil = require('lib/DateTimeUtil');

    var dataCount = 0;

    function TemperatureManager(ctx) {

        this._chart = null;

        this._bedTemperature = 0.0;
        this._bedTargetTemperature = 0.0;

        this._extruderTemperature = 0.0;
        this._extruderTargetTemperature = 0.0;

        this._init(ctx);
    }

    TemperatureManager.prototype.BedTargetTemperatureColor = 'rgba(151,87,205,1)';

    TemperatureManager.prototype.BedTemperatureColor = 'rgba(151,187,25,1)';

    TemperatureManager.prototype.ExtruderTargetTemperatureColor = 'rgba(111,180,185,1)';

    TemperatureManager.prototype.ExtruderTemperatureColor = 'rgba(151,7,5,1)';

    TemperatureManager.prototype._init = function (ctx) {

        var chartData = {
            labels: ["hh/mm/ss"],
            datasets: [
                this._initNewLine({
                    name: 'bedTargetTemperature',
                    strokeColor: this.BedTargetTemperatureColor,
                    pointColor: this.BedTargetTemperatureColor
                }),
                this._initNewLine({
                    label: "bedTemperature",
                    strokeColor: this.BedTemperatureColor,
                    pointColor: this.BedTemperatureColor
                }), this._initNewLine({
                    label: "extruderTargetTemperature",
                    strokeColor: this.ExtruderTargetTemperatureColor,
                    pointColor: this.ExtruderTargetTemperatureColor
                }), this._initNewLine({
                    label: "extruderTemperature",
                    strokeColor: this.ExtruderTemperatureColor,
                    pointColor: this.ExtruderTemperatureColor
                })]
        };

        this._chart = new Chart(ctx).Line(chartData, {
            scaleShowVerticalLines: false
        });
    };

    TemperatureManager.prototype.repaintSize = function () {
        this._chart.resize(this._chart.render, true);
    };

    TemperatureManager.prototype._initNewLine = function (config) {
        return {
            label: config.name,
            fillColor: "rgba(0,0,0,0)",
            strokeColor: config.strokeColor,
            pointColor: config.pointColor,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        };
    };

    TemperatureManager.prototype.addData = function (dataPackage) {

        ++dataCount;

        this._chart.addData([dataPackage.bedSettingTemperature, dataPackage.bedTemperature,
                             dataPackage.e0SettingTemperature, dataPackage.e0Temperature], dataPackage.time);

        if (20 < dataCount) {
            this.removeData();
        }

        this.update();
    };

    TemperatureManager.prototype.repaintData = function (date) {

        ++dataCount;

        var time = DateTimeUtil.formatDateToTime(date);

        this._chart.addData([this._bedTargetTemperature, this._bedTemperature,
                             this._extruderTargetTemperature, this._extruderTemperature], time);

        if (20 < dataCount) {
            this.removeData();
        }

        this.update();
    };

    TemperatureManager.prototype.getTemperatures = function () {
        return {
            bedTemperature: this._bedTemperature,
            bedTargetTemperature: this._bedTargetTemperature,

            extruderTemperature: this._extruderTemperature,
            extruderTargetTemperature: this._extruderTargetTemperature,
        };
    };

    TemperatureManager.prototype.updateData = function (dataPackage) {

        var data = JSON.parse(dataPackage);

        this._bedTemperature = data.bedTemp;
        this._bedTargetTemperature = data.bedTargetTemp;

        this._extruderTemperature = data.extTemp;
        this._extruderTargetTemperature = data.extTargetTemp;
    };

    TemperatureManager.prototype.update = function () {
        this._chart.update();
    };

    TemperatureManager.prototype.removeData = function () {
        this._chart.removeData();
    };

    return TemperatureManager;
});
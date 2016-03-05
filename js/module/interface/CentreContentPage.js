/* global define, $ */
define(function (require) {
    'use strict';

    var _ = require('underscore'),

        Backbone = require('backbone'),

        StatusCodeManager = require('module/component/StatusCodeManager'),

        AlertBox = require('module/interface/kit/AlertBox');

    function CentreContentPage() {

        this._isDisable = true;

        this._initEvent();
    }

    _.extend(CentreContentPage.prototype, Backbone.Events);

    CentreContentPage.prototype.disable = function (isDisable) {
        this._isDisable = isDisable;
    };

    CentreContentPage.prototype.isDisable = function () {
        return this._isDisable;
    };

    CentreContentPage.prototype.update = function () {
        //override this function in subclass
    };

    CentreContentPage.prototype.active = function () {
        //override this function in subclass
    };

    CentreContentPage.prototype.notifyErrorMessage = function (errorCode) {

        var alert = new AlertBox(StatusCodeManager.getErrorMessage(errorCode));
        $('body').append(alert.getDiv());
    };

    CentreContentPage.prototype._initEvent = function () {

        this.on('active', function () {
            this.active();
            this.disable(false);
        });

        this.on('deactive', function () {
            this.disable(true);
        });

        this.on('update', function () {
            this.update();
        });
    };

    return CentreContentPage;

});
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        BrowserUtil = require('lib/BrowserUtil'),

        AlertBoxTemplate = require('text!../../../../html/AlertBox.html');

    function AlertBox(content) {
        this._div = null;
        this._content = content;

        this._init();
    }

    AlertBox.prototype._init = function () {

        this._initDiv();

        this._bindCloseEvent();
    };

    AlertBox.prototype._initDiv = function () {
        this._div = document.createElement('div');
        $(this._div).addClass('alertBox');

        $(this._div).html(Mustache.render(AlertBoxTemplate, {
            content: this._content
        }));
    };

    AlertBox.prototype._bindCloseEvent = function () {

        this._bindCloseButtonClickEvent();
        this._bindAutomaticCloseEvent();
    };

    AlertBox.prototype._bindCloseButtonClickEvent = function () {

        $(this._div).find('a').click(function (event) {
            BrowserUtil.stopPropagation(event);
            $(this).closest('.alertBox').fadeOut();
        });
    };

    AlertBox.prototype._bindAutomaticCloseEvent = function () {

        var self = this;

        setTimeout(function () {
            self.hide();
        }, 3000);
    };

    AlertBox.prototype.hide = function () {
        $(this._div).remove();
    };

    AlertBox.prototype.getDiv = function () {
        return this._div;
    };

    return AlertBox;

});
/* global requirejs,define,window,console,localStorage,document,$ */
var locale = localStorage.getItem('locale') || navigator.language.toLowerCase();


requirejs.config({
    baseUrl: 'js/',

    paths: {
        i18n: 'thirdLib/requirejs/i18n',
        PDFJS: 'thirdLib/pdfjs/pdf',
        text: 'thirdLib/requirejs/text',
        mustache: 'thirdLib/mustache.min',
        backbone: 'thirdLib/backbonejs/backbone-min',
        underscore: 'thirdLib/backbonejs/underscore-min',
        jquery: 'thirdLib/foundationjs/vendor/jquery.min',
        dataTable: 'thirdLib/foundationjs/vendor/jquery.dataTables.min',
        foundation: 'thirdLib/foundationjs/foundation.min',
        localization: 'module/interface/localization/'
    },
    config: {
        i18n: {
            locale: locale
        },
    },
    shim: {
        dataTable: {
            deps: ['jquery']
        },
        backbone: {
            deps: ['underscore']
        }
    }
});

define(function (require) {
    'use strict';

    var language = require('i18n!localization/language');

    var Context = require('module/Context'),
        CssJsLoader = require('module/CssJsLoader'),
        MainFrame = require('module/MainFrame'),
        GlobalVar = require('module/GlobalVar');

    GlobalVar.language = language;

    var frame = null;

    require(['foundation'], function () {

        try {
            frame = new MainFrame();
        } catch (e) {
            console.error(e);
        }

        $(document).foundation();

        loadCssFiles();

        window.onhashchange(window.location.hash);
    });

    function loadCssFiles() {
        var fileNames = [
                'css/foundation.min.css',
                'css/foundation-icons.css',
                'css/app.css'
            ];

        fileNames.forEach(function (fileName) {
            CssJsLoader.loadCssFile(Context.getServerUrl() + fileName);
        });
    }

    window.onresize = function () {
        if (null === GlobalVar.threejsRenderer) {
            return;
        }

        GlobalVar.threejsRenderer.onWindowResize();
    };

    window.onhashchange = function () {

        if (null === frame) {
            return;
        }

        frame.routerUrlHash(window.location.hash);
    };

});
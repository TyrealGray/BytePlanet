({
    appDir: "./",
    baseUrl: "js",
    dir: "./build",
    paths: {
        i18n: 'thirdLib/requirejs/i18n',
        text: 'thirdLib/requirejs/text',
        mustache: 'thirdLib/mustache.min',
        PDFJS: 'thirdLib/pdfjs/pdf',
        backbone: 'thirdLib/backbonejs/backbone-min',
        underscore: 'thirdLib/backbonejs/underscore-min',
        jquery: 'thirdLib/foundationjs/vendor/jquery.min',
        dataTable: 'thirdLib/foundationjs/vendor/jquery.dataTables.min',
        foundation: 'thirdLib/foundationjs/foundation.min',
        localization: 'module/interface/localization/'
    },
    shim: {
        dataTable: {
            deps: ['jquery']
        },
        foundation: {
            deps: ['jquery', 'whatInput']
        },
        backbone: {
            deps: ['underscore']
        }
    },

    modules: [{
        name: 'module/MainFrame'
    }],

    fileExclusionRegExp: /^(r|build)\.js$|^(.git)$/
})
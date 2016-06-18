define(function (require) {
    'use strict';

    var KEY_ENTER = 13;

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),

        DiaryAgent = require('module/agent/DiaryAgent'),

        GlobalVar = require('module/GlobalVar'),

        DiaryManager = require('module/component/DiaryManager'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        DiariesPageTemplate = require('text!../../../html/DiariesPage.html'),

        DiariesTableBodyTemplate = require('text!../../../html/diariesTable/tableBody.html');

    function DiariesPage() {

        this.superClass();

        this._bindEvent();
    }

    InheritHelper.inheritPrototype(DiariesPage, CentreContentPage);

    DiariesPage.prototype.INDEX = 2;

    DiariesPage.prototype._bindEvent = function () {

        this._bindClickTitleEvent();

        $('#searchDiary').click(function (event) {
            this._onSearchDiaries();
        }.bind(this));

        $('#diaryKeyword').keypress(function (event) {
            if (KEY_ENTER !== event.keyCode) {
                return;
            }
            this._onSearchDiaries();
        }.bind(this));

        // $('#diaryKeyword').change(function (event) {
        //     this._onSearchDiaries();
        // }.bind(this));
    };

    DiariesPage.prototype._onSearchDiaries = function () {

        var keyword = $('#diaryKeyword').val();

        var diaries = DiaryManager.searchDiary(keyword, locale);

        $('#diaresTableBody').html(Mustache.render(DiariesTableBodyTemplate, {
            tableItems: diaries
        }));

        this._bindClickTitleEvent();
    };

    DiariesPage.prototype._bindClickTitleEvent = function () {

        var scope = this;

        $('.diaryTitle').click(function (event) {

            var index = $(this).data('index');

            DiaryAgent.queryDiary(index, function (data) {

                $('#mainModalContent').html(data);

                $('#mainModal').foundation('open');
            }, function (error) {
                scope.notifyErrorMessage(error);
            });

        });
    };

    DiariesPage.prototype.getContent = function () {

        var language = GlobalVar.language.DiariesPage,
            diraiesList = DiaryManager.getList(locale);

        return Mustache.render(DiariesPageTemplate, {
            TitleText: language.Title,
            DateText: language.Date,
            tableBody: Mustache.render(DiariesTableBodyTemplate, {
                tableItems: diraiesList
            })
        });
    };

    return DiariesPage;
});
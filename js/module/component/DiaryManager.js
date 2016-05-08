define(function (require, exports) {
    'use strict';

    var englishDiaries = [{ index: 1, title: 'EnglishTilte', date: '1900.01.01' }],
        chineseDiaries = [{ index: 0, title: '中文标题', date: '1900.01.01' }];

    function getList(language) {

        if (-1 != language.indexOf("zh")) {
            return chineseDiaries;
        }

        return englishDiaries;
    };

    exports.getList = getList;
});
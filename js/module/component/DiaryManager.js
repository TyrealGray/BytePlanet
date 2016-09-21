define(function (require, exports) {
    'use strict';

    var englishDiaries = [
        {
            index: 1, title: 'export 3dmax model to UE4', keyword: '3dmax model ue4',
            date: '2015.05.10'
        },
        {
            index: 3, title: 'module programming in UE4', keyword: 'module ue4',
            date: '2015.05.22'
        },
        {
            index: 5, title: 'using jasmine in requirejs', keyword: 'unit test requirejs jasmine javascript',
            date: '2016.06.09'
        },
        {
            index: 7, title: 'Implement UE4 LAN Network', keyword: 'ue4 lan network',
            date: '2016.06.28'
        },
        {
            index: 9, title: 'ue4 Nav system', keyword: 'ue4 nav',
            date: '2016.07.18'
        }
    ],
        chineseDiaries = [
            {
                index: 0, title: '關於遊戲建模導入虛幻4', keyword: '3dmax model ue4',
                date: '2015.05.10'
            },
            {
                index: 2, title: '虛幻4在開發中的模塊化編程', keyword: '模块化 ue4',
                date: '2015.05.22'
            },
            {
                index: 4, title: '在requirejs中使用jasmine', keyword: '单元测试 requirejs jasmine javascript',
                date: '2016.06.09'
            },
            {
                index: 6, title: '虛幻4局域網功能的實現', keyword: '局域网 ue4 虚幻4 lan',
                date: '2016.06.28'
            },
            {
                index: 8, title: '虛幻4尋路系統', keyword: '虚幻4 ue4 寻路 nav',
                date: '2016.07.18'
            },
            {
                index: 10, title: '三年码农，拿到德国公司 offer 流程总结', keyword: '德国 offer 工作',
                date: '2016.06.21'
            },
            {
                index: 11, title: '虛幻4藍圖中Multicast事件C++實現', keyword: '虚幻4 蓝图 multicast c++',
                date: '2016.09.01'
            }
        ];

    function getList(language) {

        if (-1 != language.indexOf("zh")) {
            return chineseDiaries;
        }

        return englishDiaries;
    };

    function searchDiary(keyword, language) {

        var result = null;

        if (-1 != language.indexOf("zh")) {
            result = getChineseDiaryByKeyword(keyword);
        } else {
            result = getEnglishDiaryByKeyword(keyword);
        }

        return result;
    }

    function getChineseDiaryByKeyword(keyword) {

        return getDiaryByKeyword(keyword, chineseDiaries);
    }

    function getEnglishDiaryByKeyword(keyword) {

        return getDiaryByKeyword(keyword, englishDiaries);
    }

    function getDiaryByKeyword(keyword, diaries) {
        var result = [];

        diaries.forEach(function (diary) {

            if (-1 !== diary.keyword.indexOf(keyword)) {
                result.push(diary);
            }

        }, this);

        return result;
    }

    exports.getList = getList;
    exports.searchDiary = searchDiary;
});
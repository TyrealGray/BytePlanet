define(function (require, exports) {
    'use strict';

    var englishDiaries = [
        { index: 1, title: 'export 3dmax model to UE4', date: '2015.05.10' },
        { index: 3, title: 'module programming in UE4', date: '2015.05.22' }
    ],
        chineseDiaries = [
            { index: 0, title: '關於遊戲建模導入虛幻4', date: '2015.05.10' },
            { index: 2, title: '虛幻4在開發中的模塊化編程', date: '2015.05.22' }
        ];

    function getList(language) {

        if (-1 != language.indexOf("zh")) {
            return chineseDiaries;
        }

        return englishDiaries;
    };
    
    function searchDiary(keyword) {
        
    }

    exports.getList = getList;
    exports.searchDiary = searchDiary;
});
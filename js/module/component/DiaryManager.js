define(function (require, exports) {
    'use strict';

    var englishDiaries = [
        { index: 1, title: 'export 3dmax model to UE4', keyword:'3dmax model ue4' ,
        date: '2015.05.10' },
        { index: 3, title: 'module programming in UE4', keyword:'module ue4',
        date: '2015.05.22' }
    ],
        chineseDiaries = [
            { index: 0, title: '關於遊戲建模導入虛幻4', keyword:'3dmax model ue4' ,
            date: '2015.05.10' },
            { index: 2, title: '虛幻4在開發中的模塊化編程',keyword:'模块化 ue4' , 
            date: '2015.05.22' }
        ];

    function getList(language) {

        if (-1 != language.indexOf("zh")) {
            return chineseDiaries;
        }

        return englishDiaries;
    };

    function searchDiary(keyword) {

        var result = null;
        
        if (-1 != language.indexOf("zh")) {
            result = this._getChineseDiaryByKeyWord(keyword);
        } else {
            result = this._getEnglishDiaryByKeyWord(keyword);
        }

        return result;
    }

    function _getChineseDiaryByKeyWord(keyword) {
        var diaries = [];
        
        chineseDiaries.forEach(function(diary) {
            
        }, this);
        
        return diaries;
    }

    function _getEnglishDiaryByKeyWord(keyword) {

    }

    exports.getList = getList;
    exports.searchDiary = searchDiary;
});
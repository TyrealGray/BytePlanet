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
            result = getChineseDiaryByKeyword(keyword);
        } else {
            result = getEnglishDiaryByKeyword(keyword);
        }

        return result;
    }

    function getChineseDiaryByKeyword(keyword) {
        
        return getDiaryByKeyword(chineseDiaries);
    }

    function getEnglishDiaryByKeyword(keyword) {
                
        return getDiaryByKeyword(englishDiaries);
    }
    
    function getDiaryByKeyword(diaries) {
        var result = [];
        
        diaries.forEach(function(diary) {
            
            if(-1 !== diray.keyword.indexOf(keyword)){
                result.push(diary);
            }
            
        }, this);
        
        return result;
    }

    exports.getList = getList;
    exports.searchDiary = searchDiary;
});
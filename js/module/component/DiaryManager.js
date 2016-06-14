define(function (require, exports) {
    'use strict';

    var englishDiaries = [
        { index: 1, title: 'export 3dmax model to UE4', keyword:'3dmax model ue4' ,
        date: '2015.05.10' },
        { index: 3, title: 'module programming in UE4', keyword:'module ue4',
        date: '2015.05.22' },
        {index:5,title:'using jasmine in requirejs', keyword:'unit test requirejs jasmine javascript',
            date:'2016.06.09'}
    ],
        chineseDiaries = [
            {index: 0, title: '關於遊戲建模導入虛幻4', keyword:'3dmax model ue4' ,
            date: '2015.05.10' },
            {index: 2, title: '虛幻4在開發中的模塊化編程',keyword:'模块化 ue4' , 
            date: '2015.05.22' },
            {index:4,title:'在requirejs中使用jasmine', keyword:'单元测试 requirejs jasmine javascript',
        date:'2016.06.09'}
  ];

    function getList(language) {

        if (-1 != language.indexOf("zh")) {
            return chineseDiaries;
        }

        return englishDiaries;
    };

    function searchDiary(keyword,language) {

        var result = null;
        
        if (-1 != language.indexOf("zh")) {
            result = getChineseDiaryByKeyword(keyword);
        } else {
            result = getEnglishDiaryByKeyword(keyword);
        }

        return result;
    }

    function getChineseDiaryByKeyword(keyword) {
        
        return getDiaryByKeyword(keyword,chineseDiaries);
    }

    function getEnglishDiaryByKeyword(keyword) {
                
        return getDiaryByKeyword(keyword,englishDiaries);
    }
    
    function getDiaryByKeyword(keyword,diaries) {
        var result = [];
        
        diaries.forEach(function(diary) {
            
            if(-1 !== diary.keyword.indexOf(keyword)){
                result.push(diary);
            }
            
        }, this);
        
        return result;
    }

    exports.getList = getList;
    exports.searchDiary = searchDiary;
});
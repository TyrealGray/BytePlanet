define(function (require) {
    'use strict';

    function DiaryManager() {
        this._diaryList = [];
    }
    
    DiaryManager.prototype.init = function(language){
        if(-1 != language.indexOf("zh")){
            this._initChineseDiaries();
            return;
        }
        
        this._initEnglishDiaries();
    };
    
    DiaryManager.prototype._initEnglishDiaries = function(){
        
    };
    
    DiaryManager.prototype._initChineseDiaries = function(){
        this._addDiary({index:0,title:'chTitle',date:'1900.01.01'});
    };
    
    DiaryManager.prototype._addDiary = function(diary){
        this._diaryList.push(diary);
    };
    
    DiaryManager.prototype.getList = function() {
        return this._diaryList;
    }

    return DiaryManager;
});
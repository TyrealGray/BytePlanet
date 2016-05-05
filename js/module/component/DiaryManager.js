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
        
    };
    
    DiaryManager.prototype.getList = function() {
        return this._diaryList;
    }

    return DiaryManager;
});
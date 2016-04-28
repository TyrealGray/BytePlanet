define(function (require) {
    'use strict';

    function DiaryManager() {
        this._diaryList = [];
    }
    
    DiaryManager.prototype.getList = function() {
        return this._diaryList;
    }

    return DiaryManager;
});
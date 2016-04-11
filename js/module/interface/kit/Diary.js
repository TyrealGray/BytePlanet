define(function(require) {
    'use strict';
    
    var DiaryAgent = require('module/agent/DiaryAgent');

    function Diary(index, title, date) {
        this._index = index;
        this._title = title;
        this._date = date;
    }
    
    Diary.prototype.setDiv = function(divID){
        //TODO use diary agent to get content
    };
    
    return Diary;

});
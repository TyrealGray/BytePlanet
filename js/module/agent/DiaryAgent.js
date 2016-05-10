define(function (require, exports) {
    'use strict';
    
    function queryDiary(index, sucessCallback, errorCallback) {
        
        var urlPath = '/BytePlanet/build/html/diary/' + index + '.html';

        $.ajax({
            type: 'GET',
            async: true,
            url: urlPath,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                errorCallback(error);
            }
        });
    }
    
    exports.queryDiary = queryDiary;
});
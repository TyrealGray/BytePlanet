/* global define, $, console,XMLHttpRequest */
define(function (require, exports) {
    'use strict';

    function querySpace(sucessCallback, errorCallback) {
        var urlPath = '/space-left';

        query(urlPath, sucessCallback, errorCallback);
    }

    function queryFile(name, sucessCallback, errorCallback) {
        var urlPath = '/file/' + name;

        query(urlPath, sucessCallback, errorCallback);
    }

    function query(urlPath, sucessCallback, errorCallback) {

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

    function uploadFile(file, success, failed, onProgress) {

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload-file', true);
        xhr.onload = function (e) {
            console.log(e);
        };

        xhr.onprogress = onProgress;

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success(xhr.responseText);
                } else {
                    if (failed) {
                        failed(xhr.status);
                    }
                }
            }
        };

        var form = new FormData();
        form.append("upfile", file);

        xhr.send(form);
    }

    function operateFiles(operateUrl, filesData, sucessCallback, errorCallback) {

        $.ajax({
            type: 'POST',
            async: false,
            url: operateUrl,
            data: JSON.stringify(filesData),
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                sucessCallback(data);
            },

            error: function (error) {
                console.error('操作文件列表失败');
                errorCallback(error);
            }
        });
    }

    function originAjaxPostJson(url, data, success, failed) {

        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.open('POST', url, true);

        xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
        xhr.responseType = 'arraybuffer';
        xhr.send(JSON.stringify(data));

        // 处理返回数据
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //                    success(xhr.responseText);
                    success(xhr);
                } else {
                    if (failed) {
                        failed(xhr.status);
                    }
                }
            }
        };
    }

    function previewFile(filesData, sucessCallback, errorCallback) {

        originAjaxPostJson('/model/', filesData, function (xhr) {
            sucessCallback(xhr.response);
        }, function (error) {
            errorCallback(error);
        });

    }

    exports.queryFile = queryFile;
    exports.querySpace = querySpace;
    exports.uploadFile = uploadFile;
    exports.operateFiles = operateFiles;
    exports.previewFile = previewFile;
});
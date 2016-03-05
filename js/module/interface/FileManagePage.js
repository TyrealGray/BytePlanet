/* global define, $, document, console, Dropzone */
define(function (require) {
    'use strict';

    var Mustache = require('mustache'),

        Chart = require('thirdLib/chart'),

        BrowserUtil = require('lib/BrowserUtil'),

        DateTimeUtil = require('lib/DateTimeUtil'),

        InheritHelper = require('lib/InheritHelper'),

        ThreejsRenderer = require('module/ThreejsRenderer'),

        StatusCodeManager = require('module/component/StatusCodeManager'),

        HomePageAgent = require('module/agent/HomePageAgent'),

        FileManagePageAgent = require('module/agent/FileManagePageAgent'),

        CentreContentPage = require('module/interface/CentreContentPage'),

        AlertBox = require('module/interface/kit/AlertBox'),

        Loader = require('module/interface/kit/Loader'),

        GlobalVar = require('module/GlobalVar'),

        FileManagePageTemplate = require('text!../../../html/FileManagePage.html'),

        DropZoneIconTemplate = require('text!../../../html/fileManagePage/DropZoneIcon.html'),

        FileTableHeadTemplate = require('text!../../../html/fileManagePage/fileManageTable/TableHead.html'),

        FileTableBodyTemplate = require('text!../../../html/fileManagePage/fileManageTable/TableBody.html'),

        FileOperateModalTemplate = require('text!../../../html/fileManagePage/fileManageOperate/FileOperateModal.html');

    require('dropzone');
    require('dataTable');

    function FileManagePage() {

        this.superClass();

        this._isUploading = false;

        this._bindEvent();

        this.active();
    }

    InheritHelper.inheritPrototype(FileManagePage, CentreContentPage);

    FileManagePage.prototype.INDEX = 1;

    FileManagePage.prototype.active = function () {

        var self = this;

        this._getCloudSpaceInfo();

        this._refreshTabelHead();

        $('#fileTableFooter').html(Loader.getDiv());

        if (GlobalVar.debug) {

            var data = [{
                fileName: 'file1',
                fileSize: '110kb',
                fileContent: 'no description',
                path: 1,
                fileTime: '2015.11.26',
                isPC: !GlobalVar.isMobile
            }, {
                fileName: 'file2',
                fileSize: '120kb',
                fileContent: 'test file2',
                path: 2,
                fileTime: '2015.11.26',
                isPC: !GlobalVar.isMobile
            }];

            this.setFileTableBody(JSON.stringify(data));

            this._resetTabelHeadStyle();

            return;
        }

        FileManagePageAgent.queryFile('filelist', function (data) {

            self.setFileTableBody(data);

            self._resetTabelHeadStyle();

        }, function (error) {

            self.notifyErrorMessage(error.status);
        });
    };

    FileManagePage.prototype._resetTabelHeadStyle = function () {

        $('#fileTable').find('th').each(function () {
            $(this).removeAttr('style');
        });
    };

    FileManagePage.prototype._refreshTabelHead = function () {

        var language = GlobalVar.language.FileManagePage;

        $('#fileTableRow').html(Mustache.render(FileTableHeadTemplate, {
            FileNameText: language.FileName,
            SizeText: language.Size,
            DescriptionText: language.Description,
            UploadDateText: language.UploadDate,
            OperationText: language.Operation,
            isPC: !GlobalVar.isMobile
        }));
    };

    FileManagePage.prototype.setFileTableBody = function (dataPackage) {

        var language = GlobalVar.language.FileManagePage,
            fileItems = [],
            data = JSON.parse(dataPackage),
            dataFile = null;

        for (var index = 0, len = data.length; index < len; ++index) {

            dataFile = data[index];

            fileItems.push({
                name: dataFile.fileName,
                size: dataFile.fileSize,
                description: dataFile.fileContent,
                date: DateTimeUtil.getTimeZoneDate(dataFile.fileTime),
                flag: dataFile.path,
                source: this._getFileSourceLabel(dataFile.path),
                OperationButtonText: language.Operation,
                isPC: !GlobalVar.isMobile
            });
        }

        $('#fileTableFooter').html('');

        $('#fileTableBody').html(Mustache.render(FileTableBodyTemplate, {
            fileItems: fileItems
        }));

        if (!GlobalVar.isMobile) {

            try {
                $('#fileTable').DataTable({
                    "order": [[4, "desc"]]
                });
            } catch (e) {
                console.error(e);
            }
        }

        this._bindOperationButtonEvent();
    };

    FileManagePage.prototype._getFileSourceLabel = function (flag) {

        var labelContent = '';

        switch (flag) {
        case 0:
            labelContent = 'internal';
            break;
        case 1:
            labelContent = 'SD';
            break;
        case 2:
            labelContent = 'USB';
            break;
        default:
            labelContent = '??';
            break;
        }

        return labelContent;
    };

    FileManagePage.prototype._bindOperationButtonEvent = function () {

        var self = this;

        $('.OperationButton').each(function () {

            $(this).click(function (event) {
                self._onOperationButtonClick(event, $(this).closest('tr').data('filename'), $(this).closest('tr').data('flag'));
            });
        });
    };

    FileManagePage.prototype._onOperationButtonClick = function (event, filename, flag) {

        BrowserUtil.stopPropagation(event);

        var language = GlobalVar.language.FileManagePage;

        $('#mainModalContent').html(Mustache.render(FileOperateModalTemplate, {
            FileManageText: language.FileManage,
            DeleteButtonText: language.Delete,
            PreviewButtonText: language.Preview,
            PrintButtonText: language.Print,
            FileNameText: filename
        }));

        this._bindFileOperateModalEvent(filename, flag);

        $('#mainModal').foundation('open');
    };

    FileManagePage.prototype._bindFileOperateModalEvent = function (filename, flag) {

        var self = this,
            language = GlobalVar.language.AlertBox;

        $('#modal_DeleteFileButton').click(function (event) {

            var deleteFiles = [{
                filename: filename,
                path: flag
            }];

            FileManagePageAgent.operateFiles('/del/', deleteFiles, function (data) {

                $('#mainModal').foundation('close');
                self.trigger('active');

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

        });

        $('#modal_PreviewFileButton').click(function (event) {

            $('#mainModalContent').html(Loader.getDiv());

            if (GlobalVar.debug) {

                $('#mainModalContent').html('');

                if (null === GlobalVar.threejsRenderer) {

                    GlobalVar.threejsRenderer = new ThreejsRenderer();
                    GlobalVar.threejsRenderer.init('mainModalContent');
                    GlobalVar.threejsRenderer.render();

                } else {
                    GlobalVar.threejsRenderer.changeRenderViewDom('mainModalContent');
                }

                $('#mainModal').foundation('open');

                return;
            }

            var stlFileName = filename;

            var previewFiles = {
                filename: stlFileName.replace('.gcode', '.stl'),
                path: flag
            };

            FileManagePageAgent.previewFile(previewFiles, function (data) {

                $('#mainModalContent').html('');

                if (null === GlobalVar.threejsRenderer) {

                    GlobalVar.threejsRenderer = new ThreejsRenderer();
                    GlobalVar.threejsRenderer.init('mainModalContent');
                    GlobalVar.threejsRenderer.render();

                } else {
                    GlobalVar.threejsRenderer.changeRenderViewDom('mainModalContent');
                }

                GlobalVar.threejsRenderer.loadStlModelByteArray(data);

                $('#mainModal').foundation('open');

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

        });

        $('#modal_PrintFileButton').click(function (event) {

            var pintFiles = {
                filename: filename,
                path: flag
            };

            if (GlobalVar.debug) {

                $('#mainModal').foundation('close');

                $('.centreContent').each(function () {
                    $(this).hide();
                });

                window.location.hash = '#/home';

                $('#homePage').fadeIn();

                return;
            }

            FileManagePageAgent.operateFiles('/print/', pintFiles, function (data) {

                var dataInfo = JSON.parse(data);

                if (StatusCodeManager.isOK(dataInfo.code)) {

                    $('#mainModal').foundation('close');

                    $('.centreContent').each(function () {
                        $(this).hide();
                    });

                    window.location.hash = '#/home';

                    $('#homePage').fadeIn();

                    return;
                }

                var alert = new AlertBox(language.PrintFileError);
                $('body').append(alert.getDiv());

            }, function (error) {

                self.notifyErrorMessage(error.status);
            });

        });
    };

    FileManagePage.prototype._getCloudSpaceInfo = function () {

        var self = this;

        FileManagePageAgent.querySpace(function (data) {

            var spaceData = JSON.parse(data);

            $('#diskTotalSpace').html(spaceData.total);
            $('#diskUsedSpace').html(spaceData.used);

        }, function (error) {

            self.notifyErrorMessage(error.status);
        });

    };

    FileManagePage.prototype._bindEvent = function () {

        this._bindDropZoneEvent();
    };

    FileManagePage.prototype._bindDropZoneEvent = function () {

        var self = this;

        var dropFileZone = new Dropzone("#dropFileZone", ({
            dictDefaultMessage: DropZoneIconTemplate +
                GlobalVar.language.FileManagePage.DropToUpload,
            addRemoveLinks: true
        }));

        dropFileZone.on('queuecomplete', function () {
            self.trigger('active');
        });
    };

    FileManagePage.prototype.getContent = function () {

        var language = GlobalVar.language.FileManagePage;

        return Mustache.render(FileManagePageTemplate, {
            FileManageText: language.FileManage,
            DropToUploadText: language.DropToUpload,
            TotalSpaceText: language.Total,
            UsedSpaceText: language.Used,
            ButtonUploadText: language.ButtonUploadText,
            DeleteButtonText: language.Delete,
            ExportButtonText: language.Export
        });
    };

    return FileManagePage;

});
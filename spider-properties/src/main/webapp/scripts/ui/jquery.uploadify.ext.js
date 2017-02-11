function uploadifyShowImage(a) {
    if ($.facybox) {
        $.facybox({
            image: a
        });
        $("#facybox").draggable()
    }
} (function($) {
    function _getFileSize(fileByteSize) {
        var byteSize = Math.round(fileByteSize / 1024 * 100) * 0.01;
        var suffix = "KB";
        if (byteSize > 1000) {
            byteSize = Math.round(byteSize * 0.001 * 100) * 0.01;
            suffix = "MB"
        }
        var sizeParts = byteSize.toString().split(".");
        if (sizeParts.length > 1) {
            byteSize = sizeParts[0] + "." + sizeParts[1].substr(0, 2)
        } else {
            byteSize = sizeParts[0]
        }
        return byteSize + suffix
    }
    function _getAttachmentName(filename) {
        var name = "";
        if (filename.length > 20) {
            name = filename.substr(0, 20) + "..."
        } else {
            name = filename
        }
        return name
    }
    var methods = {
        init: function(options) {
            var _options = {
                uploader: commonRoot + "commons/upload/upload.action",
                swf: commonRoot + "scripts/ui/res/uploadify/uploadify.swf",
                buttonText: "浏  览 ...",
                height: 28,
                width: 80,
                checkExisting: false,
                debug: false,
                fileObjName: "file",
                fileSizeLimit: 0,
                fileTypeDesc: "所有文件",
                fileTypeExts: "*.*",
                multi: true,
                formData: {},
                removeTimeout: 1,
                requeueErrors: false,
                removeCompleted: true,
                successTimeout: 30,
                limit: 0,
                queueView: "default",
                queueViewStore: {
                    "default": '<span class="fileName"><a href="{0}">{1}</a>&nbsp;&nbsp;  ({2})</span>',
                    images: '<a href="javascript:uploadifyShowImage(\'{0}\')"><img src={0} style="width:90px;height:60px;" alt="{1}"/></a>											<span class="fileName"><a href="{0}">{1}</a>&nbsp;&nbsp;  ({2})</span>'
                },
                readOnly: false,
                attachmentType: "normal",
                onQueueLoad: function() {},
                onOpen: function() {},
                onUpdataRef: function() {},
                onUpdataRefError: function() {
                    hError("更新附件引用失败！")
                },
                onBeforeDelete: function() {},
                onDelete: function() {},
                onDeleteError: function() {
                    hError("删除附件失败！")
                }
            };
            $.extend(true, _options, options);
            if ($.browser.mozilla) {
                _options.uploader = _options.uploader + "?JSESSIONID=" + Constant.sessionId
            }
            _options.relId = $(this).attr("id") || ("attachment-" + new Date().getTime());
            $(this).attr("id", _options.relId);
            var uploadifyid = _options.relId + "-uploadify";
            _options.id = uploadifyid;
            _options.hiddenId = uploadifyid + "-hidden";
            _options.completedId = uploadifyid + "-Completed";
            var uploadify = $('<div id="' + _options.id + '"></div>');
            $(this).append("<div class='attachments-queue'></div>");
            $(this).append('<input id="' + _options.hiddenId + '" type="hidden">');
            $(this).append('<input id="' + _options.completedId + '" type="hidden">');
            $(this).append(uploadify);
            $(this).addClass("attachment");
            methods.loadlist.call(this, _options);
            if (_options.readOnly) {
                return
            }
            var $this = $(this);
            var __options = {
                onQueueComplete: function() {
                    $("#" + uploadifyid + "-Completed").val("1")
                },
                onUploadStart: function() {
                    $("#" + uploadifyid + "-Completed").val("0");
                    $("#" + _options.relId).attachments("checkQueueSize")
                },
                onUploadSuccess: function(file, data) {
                    data = eval("(" + data + ")");
                    var uploadAttachmentIds = $("#" + uploadifyid + "-hidden").val();
                    if (uploadAttachmentIds.length > 0) {
                        uploadAttachmentIds += ","
                    }
                    uploadAttachmentIds += data.message;
                    $("#" + uploadifyid + "-hidden").val(uploadAttachmentIds);
                    setTimeout(function() {
                        methods.loadlist.call($this, _options)
                    },
                    _options.removeTimeout * 1000);
                    methods.update.call($this)
                },
                onUploadError: function() {
                    setTimeout(function() {
                        $("#" + _options.relId).attachments("checkQueueSize")
                    },
                    _options.removeTimeout * 1000)
                }
            };
            $.extend(true, __options, _options);
            __options.formData.attachmentType = _options.attachmentType;
            uploadify.uploadify(__options)
        },
        loadlist: function(options) {
            var _options = {
                deleteUrl: commonRoot + "commons/upload/delete.action",
                updateUrl: commonRoot + "commons/upload/relation.action",
                downUrl: commonRoot + "commons/upload/download.action?uploadAttachmentId={0}",
                listUrl: commonRoot + "commons/upload/list.action",
                listStyle: "list"
            };
            if (options) {
                $.extend(true, _options, options);
                if ($.browser.mozilla) {
                    function addSessionId(url) {
                        if (url.indexOf("?") > 0) {
                            url += "&JSESSIONID=" + Constant.sessionId
                        } else {
                            url += "?JSESSIONID=" + Constant.sessionId
                        }
                        return url
                    }
                    _options.deleteUrl = addSessionId(_options.deleteUrl);
                    _options.updateUrl = addSessionId(_options.updateUrl);
                    _options.downUrl = addSessionId(_options.downUrl);
                    _options.listUrl = addSessionId(_options.listUrl)
                }
                $(this).data("options", _options)
            } else {
                _options = $(this).data("options")
            }
            var formObjId = $(_options.idfield).val();
            var hidden = $("#" + _options.id + "-hidden");
            var uploadAttachmentIds = hidden.val();
            var data = {};
            if (formObjId) {
                data.formObjId = formObjId;
                data.attachmentType = _options.attachmentType
            } else {
                if (uploadAttachmentIds) {
                    data.uploadAttachmentIds = uploadAttachmentIds
                } else {
                    return
                }
            }
            var $this = $(this).children(".attachments-queue");
            $.ajax({
                url: _options.listUrl,
                data: data,
                success: function(data, textStatus) {
                    $this.empty();
                    uploadAttachmentIds = "";
                    $.each(data,
                    function(n, item) {
                        var byteSize = _getFileSize(item.fileLength);
                        var fileName = _getAttachmentName(item.fileName);
                        var a = $('<div id="' + _options.id + item.id + '" class="uploadify-queue-item"></div>');
                        if (!_options.readOnly) {
                            a.append('<div class="cancel"><a href="javascript:$(\'#' + _options.relId + "').attachments('delete','" + item.id + "')\">X</a></div>")
                        }
                        a.append($.format(_options.queueViewStore[_options.queueView], $.format(_options.downUrl, item.id), fileName, byteSize));
                        $this.append(a);
                        var tempStr = item.id;
                        if (uploadAttachmentIds.length > 0) {
                            uploadAttachmentIds += ","
                        }
                        uploadAttachmentIds += tempStr
                    });
                    hidden.val(uploadAttachmentIds);
                    $("#" + _options.relId).attachments("checkQueueSize")
                }
            })
        },
        "delete": function(attachmentId) {
            var options = $(this).data("options");
            $(this).each(function() {
                if (options.onBeforeDelete() === false) {
                    return
                }
                $.ajax({
                    url: options.deleteUrl,
                    data: "uploadAttachmentId=" + attachmentId,
                    success: function(data, textStatus) {
                        if (data.success) {
                            $("#" + options.id + attachmentId).remove();
                            options.onDelete(data, textStatus, attachmentId);
                            $("#" + options.relId).attachments("checkQueueSize")
                        } else {
                            options.onDeleteError(attachmentId)
                        }
                    },
                    error: function() {
                        options.onDeleteError(attachmentId)
                    }
                })
            })
        },
        update: function() {
            var options = $(this).data("options");
            var formId = $(options.idfield).val();
            if (!formId) {
                return
            }
            var uploadAttachmentIds = methods.getIds.call(this);
            $.ajax({
                url: options.updateUrl,
                data: "uploadAttachmentIds=" + uploadAttachmentIds + "&formObjId=" + formId,
                success: function(data, textStatus) {
                    options.onUpdataRef(data, textStatus, uploadAttachmentIds)
                },
                error: function() {
                    options.onUpdataRefError(uploadAttachmentIds)
                }
            })
        },
        checkQueueSize: function() {
            var options = $(this).data("options");
            if (options.readOnly) {
                return false
            }
            var queueSize = $(this).first().find(".attachments-queue .uploadify-queue-item").size();
            if (options.limit != 0 && options.limit <= queueSize) {
                $.untilCall(this,
                function() {},
                function() {
                    try {
                        $("#" + options.id).uploadify("disable", true);
                        return true
                    } catch(e) {
                        return false
                    }
                })
            } else {
                $.untilCall(this,
                function() {},
                function() {
                    try {
                        if (options.limit != 0) {
                            $("#" + options.id).uploadify("settings", "queueSizeLimit", options.limit - queueSize)
                        }
                        $("#" + options.id).uploadify("disable", false);
                        return true
                    } catch(e) {
                        return false
                    }
                })
            }
            return queueSize
        },
        getIds: function() {
            var options = $(this).data("options");
            return $("#" + options.hiddenId).val()
        },
        ifCompleted: function() {
            var options = $(this).data("options");
            return $("#" + options.completedId).val() == "0" ? false: true
        },
        clear: function() {
            var options = $(this).data("options");
            $(this).find(".uploadify-queue-item").remove();
            $("#" + options.relId).attachments("checkQueueSize")
        }
    };
    $.fn.attachments = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments)
            } else {
                $.error("The method " + method + " does not exist in $.attachments")
            }
        }
    }
})($);
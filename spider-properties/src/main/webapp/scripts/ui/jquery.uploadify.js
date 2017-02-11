var SWFUpload;
if (SWFUpload == undefined) {
    SWFUpload = function(a) {
        this.initSWFUpload(a)
    }
}
SWFUpload.prototype.initSWFUpload = function(b) {
    try {
        this.customSettings = {};
        this.settings = b;
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings();
        this.loadFlash();
        this.displayDebugInfo()
    } catch(a) {
        delete SWFUpload.instances[this.movieName];
        throw a
    }
};
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.2.0 2009-03-25";
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290
};
SWFUpload.FILE_STATUS = {
    QUEUED: -1,
    IN_PROGRESS: -2,
    ERROR: -3,
    COMPLETE: -4,
    CANCELLED: -5
};
SWFUpload.BUTTON_ACTION = {
    SELECT_FILE: -100,
    SELECT_FILES: -110,
    START_UPLOAD: -120
};
SWFUpload.CURSOR = {
    ARROW: -1,
    HAND: -2
};
SWFUpload.WINDOW_MODE = {
    WINDOW: "window",
    TRANSPARENT: "transparent",
    OPAQUE: "opaque"
};
SWFUpload.completeURL = function(a) {
    if (typeof(a) !== "string" || a.match(/^https?:\/\//i) || a.match(/^\//)) {
        return a
    }
    var c = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port: "");
    var b = window.location.pathname.lastIndexOf("/");
    if (b <= 0) {
        path = "/"
    } else {
        path = window.location.pathname.substr(0, b) + "/"
    }
    return path + a
};
SWFUpload.prototype.initSettings = function() {
    this.ensureDefault = function(b, a) {
        this.settings[b] = (this.settings[b] == undefined) ? a: this.settings[b]
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", false);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if ( !! this.settings.prevent_swf_caching) {
        this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?": "&") + "preventswfcaching=" + new Date().getTime()
    }
    if (!this.settings.preserve_relative_urls) {
        this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
        this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url)
    }
    delete this.ensureDefault
};
SWFUpload.prototype.loadFlash = function() {
    var a, b;
    if (document.getElementById(this.movieName) !== null) {
        throw "ID " + this.movieName + " is already in use. The Flash Object could not be added"
    }
    a = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
    if (a == undefined) {
        throw "Could not find the placeholder element: " + this.settings.button_placeholder_id
    }
    b = document.createElement("div");
    b.innerHTML = this.getFlashHTML();
    a.parentNode.replaceChild(b.firstChild, a);
    if (window[this.movieName] == undefined) {
        window[this.movieName] = this.getMovieElement()
    }
};
SWFUpload.prototype.getFlashHTML = function() {
    return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
};
SWFUpload.prototype.getFlashVars = function() {
    var b = this.buildParamString();
    var a = this.settings.http_success.join(",");
    return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(a), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(b), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
};
SWFUpload.prototype.getMovieElement = function() {
    if (this.movieElement == undefined) {
        this.movieElement = document.getElementById(this.movieName)
    }
    if (this.movieElement === null) {
        throw "Could not find Flash element"
    }
    return this.movieElement
};
SWFUpload.prototype.buildParamString = function() {
    var c = this.settings.post_params;
    var b = [];
    if (typeof(c) === "object") {
        for (var a in c) {
            if (c.hasOwnProperty(a)) {
                b.push(encodeURIComponent(a.toString()) + "=" + encodeURIComponent(c[a].toString()))
            }
        }
    }
    return b.join("&amp;")
};
SWFUpload.prototype.destroy = function() {
    try {
        this.cancelUpload(null, false);
        var a = null;
        a = this.getMovieElement();
        if (a && typeof(a.CallFunction) === "unknown") {
            for (var c in a) {
                try {
                    if (typeof(a[c]) === "function") {
                        a[c] = null
                    }
                } catch(e) {}
            }
            try {
                a.parentNode.removeChild(a)
            } catch(b) {}
        }
        window[this.movieName] = null;
        SWFUpload.instances[this.movieName] = null;
        delete SWFUpload.instances[this.movieName];
        this.movieElement = null;
        this.settings = null;
        this.customSettings = null;
        this.eventQueue = null;
        this.movieName = null;
        return true
    } catch(d) {
        return false
    }
};
SWFUpload.prototype.displayDebugInfo = function() {
    this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set": "Not Set"), "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"].join(""))
};
SWFUpload.prototype.addSetting = function(b, c, a) {
    if (c == undefined) {
        return (this.settings[b] = a)
    } else {
        return (this.settings[b] = c)
    }
};
SWFUpload.prototype.getSetting = function(a) {
    if (this.settings[a] != undefined) {
        return this.settings[a]
    }
    return ""
};
SWFUpload.prototype.callFlash = function(functionName, argumentArray) {
    argumentArray = argumentArray || [];
    var movieElement = this.getMovieElement();
    var returnValue, returnString;
    try {
        returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>");
        returnValue = eval(returnString)
    } catch(ex) {
        throw "Call to " + functionName + " failed"
    }
    if (returnValue != undefined && typeof returnValue.post === "object") {
        returnValue = this.unescapeFilePostParams(returnValue)
    }
    return returnValue
};
SWFUpload.prototype.selectFile = function() {
    this.callFlash("SelectFile")
};
SWFUpload.prototype.selectFiles = function() {
    this.callFlash("SelectFiles")
};
SWFUpload.prototype.startUpload = function(a) {
    this.callFlash("StartUpload", [a])
};
SWFUpload.prototype.cancelUpload = function(a, b) {
    if (b !== false) {
        b = true
    }
    this.callFlash("CancelUpload", [a, b])
};
SWFUpload.prototype.stopUpload = function() {
    this.callFlash("StopUpload")
};
SWFUpload.prototype.getStats = function() {
    return this.callFlash("GetStats")
};
SWFUpload.prototype.setStats = function(a) {
    this.callFlash("SetStats", [a])
};
SWFUpload.prototype.getFile = function(a) {
    if (typeof(a) === "number") {
        return this.callFlash("GetFileByIndex", [a])
    } else {
        return this.callFlash("GetFile", [a])
    }
};
SWFUpload.prototype.addFileParam = function(a, b, c) {
    return this.callFlash("AddFileParam", [a, b, c])
};
SWFUpload.prototype.removeFileParam = function(a, b) {
    this.callFlash("RemoveFileParam", [a, b])
};
SWFUpload.prototype.setUploadURL = function(a) {
    this.settings.upload_url = a.toString();
    this.callFlash("SetUploadURL", [a])
};
SWFUpload.prototype.setPostParams = function(a) {
    this.settings.post_params = a;
    this.callFlash("SetPostParams", [a])
};
SWFUpload.prototype.addPostParam = function(a, b) {
    this.settings.post_params[a] = b;
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.removePostParam = function(a) {
    delete this.settings.post_params[a];
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.setFileTypes = function(a, b) {
    this.settings.file_types = a;
    this.settings.file_types_description = b;
    this.callFlash("SetFileTypes", [a, b])
};
SWFUpload.prototype.setFileSizeLimit = function(a) {
    this.settings.file_size_limit = a;
    this.callFlash("SetFileSizeLimit", [a])
};
SWFUpload.prototype.setFileUploadLimit = function(a) {
    this.settings.file_upload_limit = a;
    this.callFlash("SetFileUploadLimit", [a])
};
SWFUpload.prototype.setFileQueueLimit = function(a) {
    this.settings.file_queue_limit = a;
    this.callFlash("SetFileQueueLimit", [a])
};
SWFUpload.prototype.setFilePostName = function(a) {
    this.settings.file_post_name = a;
    this.callFlash("SetFilePostName", [a])
};
SWFUpload.prototype.setUseQueryString = function(a) {
    this.settings.use_query_string = a;
    this.callFlash("SetUseQueryString", [a])
};
SWFUpload.prototype.setRequeueOnError = function(a) {
    this.settings.requeue_on_error = a;
    this.callFlash("SetRequeueOnError", [a])
};
SWFUpload.prototype.setHTTPSuccess = function(a) {
    if (typeof a === "string") {
        a = a.replace(" ", "").split(",")
    }
    this.settings.http_success = a;
    this.callFlash("SetHTTPSuccess", [a])
};
SWFUpload.prototype.setAssumeSuccessTimeout = function(a) {
    this.settings.assume_success_timeout = a;
    this.callFlash("SetAssumeSuccessTimeout", [a])
};
SWFUpload.prototype.setDebugEnabled = function(a) {
    this.settings.debug_enabled = a;
    this.callFlash("SetDebugEnabled", [a])
};
SWFUpload.prototype.setButtonImageURL = function(a) {
    if (a == undefined) {
        a = ""
    }
    this.settings.button_image_url = a;
    this.callFlash("SetButtonImageURL", [a])
};
SWFUpload.prototype.setButtonDimensions = function(c, a) {
    this.settings.button_width = c;
    this.settings.button_height = a;
    var b = this.getMovieElement();
    if (b != undefined) {
        b.style.width = c + "px";
        b.style.height = a + "px"
    }
    this.callFlash("SetButtonDimensions", [c, a])
};
SWFUpload.prototype.setButtonText = function(a) {
    this.settings.button_text = a;
    this.callFlash("SetButtonText", [a])
};
SWFUpload.prototype.setButtonTextPadding = function(b, a) {
    this.settings.button_text_top_padding = a;
    this.settings.button_text_left_padding = b;
    this.callFlash("SetButtonTextPadding", [b, a])
};
SWFUpload.prototype.setButtonTextStyle = function(a) {
    this.settings.button_text_style = a;
    this.callFlash("SetButtonTextStyle", [a])
};
SWFUpload.prototype.setButtonDisabled = function(a) {
    this.settings.button_disabled = a;
    this.callFlash("SetButtonDisabled", [a])
};
SWFUpload.prototype.setButtonAction = function(a) {
    this.settings.button_action = a;
    this.callFlash("SetButtonAction", [a])
};
SWFUpload.prototype.setButtonCursor = function(a) {
    this.settings.button_cursor = a;
    this.callFlash("SetButtonCursor", [a])
};
SWFUpload.prototype.queueEvent = function(b, c) {
    if (c == undefined) {
        c = []
    } else {
        if (! (c instanceof Array)) {
            c = [c]
        }
    }
    var a = this;
    if (typeof this.settings[b] === "function") {
        this.eventQueue.push(function() {
            this.settings[b].apply(this, c)
        });
        setTimeout(function() {
            a.executeNextEvent()
        },
        0)
    } else {
        if (this.settings[b] !== null) {
            throw "Event handler " + b + " is unknown or is not a function"
        }
    }
};
SWFUpload.prototype.executeNextEvent = function() {
    var a = this.eventQueue ? this.eventQueue.shift() : null;
    if (typeof(a) === "function") {
        a.apply(this)
    }
};
SWFUpload.prototype.unescapeFilePostParams = function(c) {
    var e = /[$]([0-9a-f]{4})/i;
    var f = {};
    var d;
    if (c != undefined) {
        for (var a in c.post) {
            if (c.post.hasOwnProperty(a)) {
                d = a;
                var b;
                while ((b = e.exec(d)) !== null) {
                    d = d.replace(b[0], String.fromCharCode(parseInt("0x" + b[1], 16)))
                }
                f[d] = c.post[a]
            }
        }
        c.post = f
    }
    return c
};
SWFUpload.prototype.testExternalInterface = function() {
    try {
        return this.callFlash("TestExternalInterface")
    } catch(a) {
        return false
    }
};
SWFUpload.prototype.flashReady = function() {
    var a = this.getMovieElement();
    if (!a) {
        this.debug("Flash called back ready but the flash movie can't be found.");
        return
    }
    this.cleanUp(a);
    this.queueEvent("swfupload_loaded_handler")
};
SWFUpload.prototype.cleanUp = function(a) {
    try {
        if (this.movieElement && typeof(a.CallFunction) === "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            for (var c in a) {
                try {
                    if (typeof(a[c]) === "function" && c[0] <= "Z") {
                        a[c] = null
                    }
                } catch(b) {}
            }
        }
    } catch(d) {}
    window.__flash__removeCallback = function(e, f) {
        try {
            if (e) {
                e[f] = null
            }
        } catch(g) {}
    }
};
SWFUpload.prototype.fileDialogStart = function() {
    this.queueEvent("file_dialog_start_handler")
};
SWFUpload.prototype.fileQueued = function(a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("file_queued_handler", a)
};
SWFUpload.prototype.fileQueueError = function(a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("file_queue_error_handler", [a, c, b])
};
SWFUpload.prototype.fileDialogComplete = function(b, c, a) {
    this.queueEvent("file_dialog_complete_handler", [b, c, a])
};
SWFUpload.prototype.uploadStart = function(a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("return_upload_start_handler", a)
};
SWFUpload.prototype.returnUploadStart = function(a) {
    var b;
    if (typeof this.settings.upload_start_handler === "function") {
        a = this.unescapeFilePostParams(a);
        b = this.settings.upload_start_handler.call(this, a)
    } else {
        if (this.settings.upload_start_handler != undefined) {
            throw "upload_start_handler must be a function"
        }
    }
    if (b === undefined) {
        b = true
    }
    b = !!b;
    this.callFlash("ReturnUploadStart", [b])
};
SWFUpload.prototype.uploadProgress = function(a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_progress_handler", [a, c, b])
};
SWFUpload.prototype.uploadError = function(a, c, b) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_error_handler", [a, c, b])
};
SWFUpload.prototype.uploadSuccess = function(b, a, c) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_success_handler", [b, a, c])
};
SWFUpload.prototype.uploadComplete = function(a) {
    a = this.unescapeFilePostParams(a);
    this.queueEvent("upload_complete_handler", a)
};
SWFUpload.prototype.debug = function(a) {
    this.queueEvent("debug_handler", a)
};
SWFUpload.prototype.debugMessage = function(c) {
    if (this.settings.debug) {
        var a, d = [];
        if (typeof c === "object" && typeof c.name === "string" && typeof c.message === "string") {
            for (var b in c) {
                if (c.hasOwnProperty(b)) {
                    d.push(b + ": " + c[b])
                }
            }
            a = d.join("\n") || "";
            d = a.split("\n");
            a = "EXCEPTION: " + d.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(a)
        } else {
            SWFUpload.Console.writeLine(c)
        }
    }
};
SWFUpload.Console = {};
SWFUpload.Console.writeLine = function(d) {
    var b, a;
    try {
        b = document.getElementById("SWFUpload_Console");
        if (!b) {
            a = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(a);
            b = document.createElement("textarea");
            b.id = "SWFUpload_Console";
            b.style.fontFamily = "monospace";
            b.setAttribute("wrap", "off");
            b.wrap = "off";
            b.style.overflow = "auto";
            b.style.width = "700px";
            b.style.height = "350px";
            b.style.margin = "5px";
            a.appendChild(b)
        }
        b.value += d + "\n";
        b.scrollTop = b.scrollHeight - b.clientHeight
    } catch(c) {
        alert("Exception: " + c.name + " Message: " + c.message)
    }
}; (function(c) {
    var b = {
        init: function(d, e) {
            return this.each(function() {
                var n = c(this);
                var m = n.clone();
                var j = c.extend({
                    id: n.attr("id"),
                    swf: "uploadify.swf",
                    uploader: "uploadify.php",
                    auto: true,
                    buttonClass: "",
                    buttonCursor: "hand",
                    buttonImage: null,
                    buttonText: "SELECT FILES",
                    checkExisting: false,
                    debug: false,
                    fileObjName: "Filedata",
                    fileSizeLimit: 0,
                    fileTypeDesc: "All Files",
                    fileTypeExts: "*.*",
                    height: 30,
                    itemTemplate: false,
                    method: "post",
                    multi: true,
                    formData: {},
                    preventCaching: true,
                    progressData: "percentage",
                    queueID: false,
                    queueSizeLimit: 999,
                    removeCompleted: true,
                    removeTimeout: 3,
                    requeueErrors: false,
                    successTimeout: 30,
                    uploadLimit: 0,
                    width: 120,
                    overrideEvents: []
                },
                d);
                var g = {
                    assume_success_timeout: j.successTimeout,
                    button_placeholder_id: j.id,
                    button_width: j.width,
                    button_height: j.height,
                    button_text: null,
                    button_text_style: null,
                    button_text_top_padding: 0,
                    button_text_left_padding: 0,
                    button_action: (j.multi ? SWFUpload.BUTTON_ACTION.SELECT_FILES: SWFUpload.BUTTON_ACTION.SELECT_FILE),
                    button_disabled: false,
                    button_cursor: (j.buttonCursor == "arrow" ? SWFUpload.CURSOR.ARROW: SWFUpload.CURSOR.HAND),
                    button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                    debug: j.debug,
                    requeue_on_error: j.requeueErrors,
                    file_post_name: j.fileObjName,
                    file_size_limit: j.fileSizeLimit,
                    file_types: j.fileTypeExts,
                    file_types_description: j.fileTypeDesc,
                    file_queue_limit: j.queueSizeLimit,
                    file_upload_limit: j.uploadLimit,
                    flash_url: j.swf,
                    prevent_swf_caching: j.preventCaching,
                    post_params: j.formData,
                    upload_url: j.uploader,
                    use_query_string: (j.method == "get"),
                    file_dialog_complete_handler: a.onDialogClose,
                    file_dialog_start_handler: a.onDialogOpen,
                    file_queued_handler: a.onSelect,
                    file_queue_error_handler: a.onSelectError,
                    swfupload_loaded_handler: j.onSWFReady,
                    upload_complete_handler: a.onUploadComplete,
                    upload_error_handler: a.onUploadError,
                    upload_progress_handler: a.onUploadProgress,
                    upload_start_handler: a.onUploadStart,
                    upload_success_handler: a.onUploadSuccess
                };
                if (e) {
                    g = c.extend(g, e)
                }
                g = c.extend(g, j);
                var o = swfobject.getFlashPlayerVersion();
                var h = (o.major >= 9);
                if (h) {
                    window["uploadify_" + j.id] = new SWFUpload(g);
                    var i = window["uploadify_" + j.id];
                    n.data("uploadify", i);
                    var l = c("<div />", {
                        id: j.id,
                        "class": "uploadify",
                        css: {
                            height: j.height + "px",
                            width: j.width + "px"
                        }
                    });
                    c("#" + i.movieName).wrap(l);
                    l = c("#" + j.id);
                    l.data("uploadify", i);
                    var f = c("<div />", {
                        id: j.id + "-button",
                        "class": "uploadify-button " + j.buttonClass
                    });
                    if (j.buttonImage) {
                        f.css({
                            "background-image": "url('" + j.buttonImage + "')",
                            "text-indent": "-9999px"
                        })
                    }
                    f.html('<span class="uploadify-button-text">' + j.buttonText + "</span>").css({
                        height: j.height + "px",
                        "line-height": j.height + "px",
                        width: j.width + "px"
                    });
                    l.append(f);
                    c("#" + i.movieName).css({
                        position: "absolute",
                        "z-index": 1
                    });
                    if (!j.queueID) {
                        var k = c("<div />", {
                            id: j.id + "-queue",
                            "class": "uploadify-queue"
                        });
                        l.after(k);
                        i.settings.queueID = j.id + "-queue";
                        i.settings.defaultQueue = true
                    }
                    i.queueData = {
                        files: {},
                        filesSelected: 0,
                        filesQueued: 0,
                        filesReplaced: 0,
                        filesCancelled: 0,
                        filesErrored: 0,
                        uploadsSuccessful: 0,
                        uploadsErrored: 0,
                        averageSpeed: 0,
                        queueLength: 0,
                        queueSize: 0,
                        uploadSize: 0,
                        queueBytesUploaded: 0,
                        uploadQueue: [],
                        errorMsg: "Some files were not added to the queue:"
                    };
                    i.original = m;
                    i.wrapper = l;
                    i.button = f;
                    i.queue = k;
                    if (j.onInit) {
                        j.onInit.call(n, i)
                    }
                } else {
                    if (j.onFallback) {
                        j.onFallback.call(n)
                    }
                }
            })
        },
        cancel: function(d, f) {
            var e = arguments;
            this.each(function() {
                var l = c(this),
                i = l.data("uploadify"),
                j = i.settings,
                h = -1;
                if (e[0]) {
                    if (e[0] == "*") {
                        var g = i.queueData.queueLength;
                        c("#" + j.queueID).find(".uploadify-queue-item").each(function() {
                            h++;
                            if (e[1] === true) {
                                i.cancelUpload(c(this).attr("id"), false)
                            } else {
                                i.cancelUpload(c(this).attr("id"))
                            }
                            c(this).find(".data").removeClass("data").html(" - Cancelled");
                            c(this).find(".uploadify-progress-bar").remove();
                            c(this).delay(1000 + 100 * h).fadeOut(500,
                            function() {
                                c(this).remove()
                            })
                        });
                        i.queueData.queueSize = 0;
                        i.queueData.queueLength = 0;
                        if (j.onClearQueue) {
                            j.onClearQueue.call(l, g)
                        }
                    } else {
                        for (var m = 0; m < e.length; m++) {
                            i.cancelUpload(e[m]);
                            c("#" + e[m]).find(".data").removeClass("data").html(" - Cancelled");
                            c("#" + e[m]).find(".uploadify-progress-bar").remove();
                            c("#" + e[m]).delay(1000 + 100 * m).fadeOut(500,
                            function() {
                                c(this).remove()
                            })
                        }
                    }
                } else {
                    var k = c("#" + j.queueID).find(".uploadify-queue-item").get(0);
                    $item = c(k);
                    i.cancelUpload($item.attr("id"));
                    $item.find(".data").removeClass("data").html(" - Cancelled");
                    $item.find(".uploadify-progress-bar").remove();
                    $item.delay(1000).fadeOut(500,
                    function() {
                        c(this).remove()
                    })
                }
            })
        },
        destroy: function() {
            this.each(function() {
                var f = c(this),
                d = f.data("uploadify"),
                e = d.settings;
                d.destroy();
                if (e.defaultQueue) {
                    c("#" + e.queueID).remove()
                }
                c("#" + e.id).replaceWith(d.original);
                if (e.onDestroy) {
                    e.onDestroy.call(this)
                }
                delete d
            })
        },
        disable: function(d) {
            this.each(function() {
                var g = c(this),
                e = g.data("uploadify"),
                f = e.settings;
                if (d) {
                    e.button.addClass("disabled");
                    if (f.onDisable) {
                        f.onDisable.call(this)
                    }
                } else {
                    e.button.removeClass("disabled");
                    if (f.onEnable) {
                        f.onEnable.call(this)
                    }
                }
                e.setButtonDisabled(d)
            })
        },
        settings: function(e, g, h) {
            var d = arguments;
            var f = g;
            this.each(function() {
                var k = c(this),
                i = k.data("uploadify"),
                j = i.settings;
                if (typeof(d[0]) == "object") {
                    for (var l in g) {
                        setData(l, g[l])
                    }
                }
                if (d.length === 1) {
                    f = j[e]
                } else {
                    switch (e) {
                    case "uploader":
                        i.setUploadURL(g);
                        break;
                    case "formData":
                        if (!h) {
                            g = c.extend(j.formData, g)
                        }
                        i.setPostParams(j.formData);
                        break;
                    case "method":
                        if (g == "get") {
                            i.setUseQueryString(true)
                        } else {
                            i.setUseQueryString(false)
                        }
                        break;
                    case "fileObjName":
                        i.setFilePostName(g);
                        break;
                    case "fileTypeExts":
                        i.setFileTypes(g, j.fileTypeDesc);
                        break;
                    case "fileTypeDesc":
                        i.setFileTypes(j.fileTypeExts, g);
                        break;
                    case "fileSizeLimit":
                        i.setFileSizeLimit(g);
                        break;
                    case "uploadLimit":
                        i.setFileUploadLimit(g);
                        break;
                    case "queueSizeLimit":
                        i.setFileQueueLimit(g);
                        break;
                    case "buttonImage":
                        i.button.css("background-image", settingValue);
                        break;
                    case "buttonCursor":
                        if (g == "arrow") {
                            i.setButtonCursor(SWFUpload.CURSOR.ARROW)
                        } else {
                            i.setButtonCursor(SWFUpload.CURSOR.HAND)
                        }
                        break;
                    case "buttonText":
                        c("#" + j.id + "-button").find(".uploadify-button-text").html(g);
                        break;
                    case "width":
                        i.setButtonDimensions(g, j.height);
                        break;
                    case "height":
                        i.setButtonDimensions(j.width, g);
                        break;
                    case "multi":
                        if (g) {
                            i.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILES)
                        } else {
                            i.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILE)
                        }
                        break
                    }
                    j[e] = g
                }
            });
            if (d.length === 1) {
                return f
            }
        },
        stop: function() {
            this.each(function() {
                var e = c(this),
                d = e.data("uploadify");
                d.queueData.averageSpeed = 0;
                d.queueData.uploadSize = 0;
                d.queueData.bytesUploaded = 0;
                d.queueData.uploadQueue = [];
                d.stopUpload()
            })
        },
        upload: function() {
            var d = arguments;
            this.each(function() {
                var f = c(this),
                e = f.data("uploadify");
                e.queueData.averageSpeed = 0;
                e.queueData.uploadSize = 0;
                e.queueData.bytesUploaded = 0;
                e.queueData.uploadQueue = [];
                if (d[0]) {
                    if (d[0] == "*") {
                        e.queueData.uploadSize = e.queueData.queueSize;
                        e.queueData.uploadQueue.push("*");
                        e.startUpload()
                    } else {
                        for (var g = 0; g < d.length; g++) {
                            e.queueData.uploadSize += e.queueData.files[d[g]].size;
                            e.queueData.uploadQueue.push(d[g])
                        }
                        e.startUpload(e.queueData.uploadQueue.shift())
                    }
                } else {
                    e.startUpload()
                }
            })
        }
    };
    var a = {
        onDialogOpen: function() {
            var d = this.settings;
            this.queueData.errorMsg = "Some files were not added to the queue:";
            this.queueData.filesReplaced = 0;
            this.queueData.filesCancelled = 0;
            if (d.onDialogOpen) {
                d.onDialogOpen.call(this)
            }
        },
        onDialogClose: function(d, f, g) {
            var e = this.settings;
            this.queueData.filesErrored = d - f;
            this.queueData.filesSelected = d;
            this.queueData.filesQueued = f - this.queueData.filesCancelled;
            this.queueData.queueLength = g;
            if (c.inArray("onDialogClose", e.overrideEvents) < 0) {
                if (this.queueData.filesErrored > 0) {
                    alert(this.queueData.errorMsg)
                }
            }
            if (e.onDialogClose) {
                e.onDialogClose.call(this, this.queueData)
            }
            if (e.auto) {
                c("#" + e.id).uploadify("upload", "*")
            }
        },
        onSelect: function(h) {
            var i = this.settings;
            var f = {};
            for (var g in this.queueData.files) {
                f = this.queueData.files[g];
                if (f.uploaded != true && f.name == h.name) {
                    var e = confirm('The file named "' + h.name + '" is already in the queue.\nDo you want to replace the existing item in the queue?');
                    if (!e) {
                        this.cancelUpload(h.id);
                        this.queueData.filesCancelled++;
                        return false
                    } else {
                        c("#" + f.id).remove();
                        this.cancelUpload(f.id);
                        this.queueData.filesReplaced++
                    }
                }
            }
            var j = Math.round(h.size / 1024);
            var o = "KB";
            if (j > 1000) {
                j = Math.round(j / 1000);
                o = "MB"
            }
            var l = j.toString().split(".");
            j = l[0];
            if (l.length > 1) {
                j += "." + l[1].substr(0, 2)
            }
            j += o;
            var k = h.name;
            if (k.length > 25) {
                k = k.substr(0, 25) + "..."
            }
            itemData = {
                fileID: h.id,
                instanceID: i.id,
                fileName: k,
                fileSize: j
            };
            if (i.itemTemplate == false) {
                i.itemTemplate = '<div id="${fileID}" class="uploadify-queue-item">					<div class="cancel">						<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X</a>					</div>					<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>					<div class="uploadify-progress">						<div class="uploadify-progress-bar"><!--Progress Bar--></div>					</div></div>'
            }
            if (c.inArray("onSelect", i.overrideEvents) < 0) {
                itemHTML = i.itemTemplate;
                for (var m in itemData) {
                    itemHTML = itemHTML.replace(new RegExp("\\$\\{" + m + "\\}", "g"), itemData[m])
                }
                c("#" + i.queueID).append(itemHTML)
            }
            this.queueData.queueSize += h.size;
            this.queueData.files[h.id] = h;
            if (i.onSelect) {
                i.onSelect.apply(this, arguments)
            }
        },
        onSelectError: function(d, g, f) {
            var e = this.settings;
            if (c.inArray("onSelectError", e.overrideEvents) < 0) {
                switch (g) {
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    if (e.queueSizeLimit > f) {
                        this.queueData.errorMsg += "\nThe number of files selected exceeds the remaining upload limit (" + f + ")."
                    } else {
                        this.queueData.errorMsg += "\nThe number of files selected exceeds the queue size limit (" + e.queueSizeLimit + ")."
                    }
                    break;
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    this.queueData.errorMsg += '\nThe file "' + d.name + '" exceeds the size limit (' + e.fileSizeLimit + ").";
                    break;
                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                    this.queueData.errorMsg += '\nThe file "' + d.name + '" is empty.';
                    break;
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    this.queueData.errorMsg += '\nThe file "' + d.name + '" is not an accepted file type (' + e.fileTypeDesc + ").";
                    break
                }
            }
            if (g != SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
                delete this.queueData.files[d.id]
            }
            if (e.onSelectError) {
                e.onSelectError.apply(this, arguments)
            }
        },
        onQueueComplete: function() {
            if (this.settings.onQueueComplete) {
                this.settings.onQueueComplete.call(this, this.settings.queueData)
            }
        },
        onUploadComplete: function(f) {
            var g = this.settings,
            d = this;
            var e = this.getStats();
            this.queueData.queueLength = e.files_queued;
            if (this.queueData.uploadQueue[0] == "*") {
                if (this.queueData.queueLength > 0) {
                    this.startUpload()
                } else {
                    this.queueData.uploadQueue = [];
                    if (g.onQueueComplete) {
                        g.onQueueComplete.call(this, this.queueData)
                    }
                }
            } else {
                if (this.queueData.uploadQueue.length > 0) {
                    this.startUpload(this.queueData.uploadQueue.shift())
                } else {
                    this.queueData.uploadQueue = [];
                    if (g.onQueueComplete) {
                        g.onQueueComplete.call(this, this.queueData)
                    }
                }
            }
            if (c.inArray("onUploadComplete", g.overrideEvents) < 0) {
                if (g.removeCompleted) {
                    switch (f.filestatus) {
                    case SWFUpload.FILE_STATUS.COMPLETE:
                        setTimeout(function() {
                            if (c("#" + f.id)) {
                                d.queueData.queueSize -= f.size;
                                d.queueData.queueLength -= 1;
                                delete d.queueData.files[f.id];
                                c("#" + f.id).fadeOut(500,
                                function() {
                                    c(this).remove()
                                })
                            }
                        },
                        g.removeTimeout * 1000);
                        break;
                    case SWFUpload.FILE_STATUS.ERROR:
                        if (!g.requeueErrors) {
                            setTimeout(function() {
                                if (c("#" + f.id)) {
                                    d.queueData.queueSize -= f.size;
                                    d.queueData.queueLength -= 1;
                                    delete d.queueData.files[f.id];
                                    c("#" + f.id).fadeOut(500,
                                    function() {
                                        c(this).remove()
                                    })
                                }
                            },
                            g.removeTimeout * 1000)
                        }
                        break
                    }
                } else {
                    f.uploaded = true
                }
            }
            if (g.onUploadComplete) {
                g.onUploadComplete.call(this, f)
            }
        },
        onUploadError: function(e, i, h) {
            var f = this.settings;
            var g = "Error";
            switch (i) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                g = "HTTP Error (" + h + ")";
                break;
            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                g = "Missing Upload URL";
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                g = "IO Error";
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                g = "Security Error";
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                alert("The upload limit has been reached (" + h + ").");
                g = "Exceeds Upload Limit";
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                g = "Failed";
                break;
            case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                g = "Validation Error";
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                g = "Cancelled";
                this.queueData.queueSize -= e.size;
                this.queueData.queueLength -= 1;
                if (e.status == SWFUpload.FILE_STATUS.IN_PROGRESS || c.inArray(e.id, this.queueData.uploadQueue) >= 0) {
                    this.queueData.uploadSize -= e.size
                }
                if (f.onCancel) {
                    f.onCancel.call(this, e)
                }
                delete this.queueData.files[e.id];
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                g = "Stopped";
                break
            }
            if (c.inArray("onUploadError", f.overrideEvents) < 0) {
                if (i != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED && i != SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
                    c("#" + e.id).addClass("uploadify-error")
                }
                c("#" + e.id).find(".uploadify-progress-bar").css("width", "1px");
                if (i != SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND && e.status != SWFUpload.FILE_STATUS.COMPLETE) {
                    c("#" + e.id).find(".data").html(" - " + g)
                }
            }
            var d = this.getStats();
            this.queueData.uploadsErrored = d.upload_errors;
            if (f.onUploadError) {
                f.onUploadError.call(this, e, i, h, g)
            }
        },
        onUploadProgress: function(g, m, j) {
            var h = this.settings;
            var e = new Date();
            var n = e.getTime();
            var k = n - this.timer;
            if (k > 500) {
                this.timer = n
            }
            var i = m - this.bytesLoaded;
            this.bytesLoaded = m;
            var d = this.queueData.queueBytesUploaded + m;
            var p = Math.round(m / j * 100);
            var o = "KB/s";
            var l = 0;
            var f = (i / 1024) / (k / 1000);
            f = Math.floor(f * 10) / 10;
            if (this.queueData.averageSpeed > 0) {
                this.queueData.averageSpeed = Math.floor((this.queueData.averageSpeed + f) / 2)
            } else {
                this.queueData.averageSpeed = Math.floor(f)
            }
            if (f > 1000) {
                l = (f * 0.001);
                this.queueData.averageSpeed = Math.floor(l);
                o = "MB/s"
            }
            if (c.inArray("onUploadProgress", h.overrideEvents) < 0) {
                if (h.progressData == "percentage") {
                    c("#" + g.id).find(".data").html(" - " + p + "%")
                } else {
                    if (h.progressData == "speed" && k > 500) {
                        c("#" + g.id).find(".data").html(" - " + this.queueData.averageSpeed + o)
                    }
                }
                c("#" + g.id).find(".uploadify-progress-bar").css("width", p + "%")
            }
            if (h.onUploadProgress) {
                h.onUploadProgress.call(this, g, m, j, d, this.queueData.uploadSize)
            }
        },
        onUploadStart: function(d) {
            var e = this.settings;
            var f = new Date();
            this.timer = f.getTime();
            this.bytesLoaded = 0;
            if (this.queueData.uploadQueue.length == 0) {
                this.queueData.uploadSize = d.size
            }
            if (e.checkExisting) {
                c.ajax({
                    type: "POST",
                    async: false,
                    url: e.checkExisting,
                    data: {
                        filename: d.name
                    },
                    success: function(h) {
                        if (h == 1) {
                            var g = confirm('A file with the name "' + d.name + '" already exists on the server.\nWould you like to replace the existing file?');
                            if (!g) {
                                this.cancelUpload(d.id);
                                c("#" + d.id).remove();
                                if (this.queueData.uploadQueue.length > 0 && this.queueData.queueLength > 0) {
                                    if (this.queueData.uploadQueue[0] == "*") {
                                        this.startUpload()
                                    } else {
                                        this.startUpload(this.queueData.uploadQueue.shift())
                                    }
                                }
                            }
                        }
                    }
                })
            }
            if (e.onUploadStart) {
                e.onUploadStart.call(this, d)
            }
        },
        onUploadSuccess: function(f, h, d) {
            var g = this.settings;
            var e = this.getStats();
            this.queueData.uploadsSuccessful = e.successful_uploads;
            this.queueData.queueBytesUploaded += f.size;
            if (c.inArray("onUploadSuccess", g.overrideEvents) < 0) {
                c("#" + f.id).find(".data").html(" - Complete")
            }
            if (g.onUploadSuccess) {
                g.onUploadSuccess.call(this, f, h, d)
            }
        }
    };
    c.fn.uploadify = function(d) {
        if (b[d]) {
            return b[d].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d === "object" || !d) {
                return b.init.apply(this, arguments)
            } else {
                c.error("The method " + d + " does not exist in $.uploadify")
            }
        }
    }
})($);
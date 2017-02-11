/*
 * 扩展Jquery错误机制，统一处理错误
 */
;
(function($) {
	var errorMessages = {
		"400" : "请求无效",
		"401.1" : "未授权：登录失败",
		"401.2" : "未授权：服务器配置问题导致登录失败",
		"401.3" : "ACL 禁止访问资源",
		"401.4" : "未授权：授权被筛选器拒绝",
		"401.5" : "未授权：ISAPI 或 CGI 授权失败",
		"403" : "禁止访问",
		"403" : "对 Internet 服务管理器 (HTML) 的访问仅限于 Localhost",
		"403.1" : "禁止访问：禁止可执行访问",
		"403.2" : "禁止访问：禁止读访问",
		"403.3" : "禁止访问：禁止写访问",
		"403.4" : "禁止访问：要求 SSL",
		"403.5" : "禁止访问：要求 SSL 128",
		"403.6" : "禁止访问：IP 地址被拒绝",
		"403.7" : "禁止访问：要求客户证书",
		"403.8" : "禁止访问：禁止站点访问",
		"403.9" : "禁止访问：连接的用户过多",
		"403.10" : "禁止访问：配置无效",
		"403.11" : "禁止访问：密码更改",
		"403.12" : "禁止访问：映射器拒绝访问",
		"403.13" : "禁止访问：客户证书已被吊销",
		"403.15" : "禁止访问：客户访问许可过多",
		"403.16" : "禁止访问：客户证书不可信或者无效",
		"403.17" : "禁止访问：客户证书已经到期或者尚未生效",
		"404.1" : "无法找到 Web 站点",
		"404" : "无法找到文件",
		"405" : "资源被禁止",
		"406" : "无法接受",
		"407" : "要求代理身份验证",
		"410" : "永远不可用",
		"412" : "先决条件失败",
		"414" : "请求 的 URI 太长",
		"500" : "内部服务器错误",
		"500.100" : "内部服务器错误",
		"500.11" : "服务器关闭",
		"500.12" : "应用程序重新启动",
		"500.13" : "服务器太忙",
		"500.14" : "应用程序无效",
		"500.15" : "不允许请求 global.asa",
		"501" : "未实现",
		"502" : "网关错误"
	};
	var $_ajax = $.ajax;
	$.ajax = function(s) {
		s = $.extend({
			dataType : "json",
			cache : false,
			type : "POST"
		}, s);
		/*
		 * var old=s.error; var errHeader=s.errorHeader||"Error-Json";
		 * s.error=function(xhr,statusText,err){ var statusCode = xhr.status;
		 * switch(statusCode){ case 200: if(statusText == 'parsererror'){
		 * alert("返回数据格式转换错误！"); }else{ alert("数据已返回，但出现未知错误！"); } break; case
		 * 500: try{ var o = eval("("+xhr.responseText+")"); if(o.success !==
		 * undefined){ alert(o.message||errorMessages[statusCode]); break; }
		 * }catch(e){alert(e.message)}; default : alert("网络访问错误：" +
		 * (errorMessages[statusCode]) || '与服务器通讯失败'); } if(typeof old ==
		 * "function"){ old.call(this, xhr,statusText,err); } }; var oldsucc =
		 * s.success; s.success = function(data, textStatus, jqXHR){ if(typeof
		 * oldsucc == "function"){ oldsucc.call(this, data, textStatus, jqXHR); } }
		 */
//		if (s.url.indexOf("?") > 0) {
//			s.url += '&requestMode=ajax'
//		} else {
//			s.url += '?requestMode=ajax'
//		}
		$_ajax(s);
	}

})(jQuery);

;
(function($) {
	/**
	 * 当满足条件时执行函数
	 * 
	 * @param scope
	 *            函数执行作用域
	 * @param _callee
	 *            被执行的方法
	 * @param _untilFuc
	 *            返回执行的条件 例： $.untilCall(this, function(){ alert(a); },
	 *            function(){ return a!=null; })
	 */
	$.untilCall = function(scope, _callee, _untilFuc) {
		var t;
		function fuc() {
			var fn = _untilFuc.call(scope);
			if (!fn) {
				t = setTimeout(fuc, 5);
			} else {
				_callee.call(scope);
				clearTimeout(t);
			}
		}
		t = setTimeout(fuc, 5);
	};

	$
			.extend(
					$.fn,
					{
						// 自适应
						/**
						 * 自适应大小 options = { heightOnly : 只适应高度, widthOnly :
						 * 只适应宽度, heightOff : 高度减少值, widthOff : 宽度减少值 target
						 * ：适应目标 }
						 */
						resizeTo : function(s) {
							var sizer, $this = $(this), option = {
								heightOnly : false,
								widthOnly : false,
								heightOff : 0,
								widthOff : 0
							};
							if (typeof s == 'string') {
								sizer = $(s);
							} else {
								if (!s) {
									sizer = $this.parent();
								} else {
									if (!s.target)
										s.target = $this.parent();
									sizer = $(s.target);
									$.extend(option, s);
								}
							}
							var ex_width = $this.width() - $this.outerWidth();
							var ex_height = $this.height()
									- $this.outerHeight();
							function _resize() {
								if (!option.heightOnly)
									$this.width(sizer.width() + ex_width
											+ option.widthOff);
								if (!option.widthOnly)
									$this
											.height((sizer.is('body') ? document.documentElement.clientHeight
													: sizer.height())
													+ ex_height
													+ option.heightOff);
							}
							_resize();
							$(sizer).on('resize', _resize);
						},
						// 在这里添加表单的序列化方法，过滤值为空的参数。
						serializeArrayNonBlank : function() {
							var res = this.serializeArray();
							var len = res.length;
							for (var i = len - 1; i > -1; i--) {
								if (res[i].value == "") {
									res.splice(i, 1);
								}
							}
							return res;
						}
					});
	$.fn.extend({
		realHeight : function(h) {
			console.log(this);
			var mh = parseFloat(this.css("margin-top") || 0)
					+ parseFloat(this.css("margin-bottom") || 0);
			var ph = parseFloat(this.css("padding-top") || 0)
					+ parseFloat(this.css("padding-bottom") || 0);
			var bh = parseFloat(this.css("border-top") || 0)
					+ parseFloat(this.css("border-bottom") || 0);
			if (typeof h === "number") {
				this.height(h - mh - ph - bh);
			} else {
				return this.height() + mh + ph + bh;
			}
		}
	});
})(jQuery);

/*
 * Date.prototype.parseStr = function(format) { var YYYY = this.getFullYear();
 * //2011 var YY = YYYY%100; // 11 format = format.replace("@YYYY@",YYYY);
 * format = format.replace("@YY@",YY);
 * 
 * var M=this.getMonth()+1; var MM=(M<10)?"0"+M:M;
 * format=format.replace("@MM@",MM); format=format.replace("@M@",M);
 * 
 * var D=this.getDate(); var DD=(D<10)?"0"+D:D;
 * format=format.replace("@DD@",DD); format=format.replace("@D@",D);
 * 
 * var h=this.getHours(); var hh=(h<10)?"0"+h:h;
 * format=format.replace("@hh@",hh); format=format.replace("@h@",h); var
 * m=this.getMinutes(); var mm=(m<10)?"0"+m:m;
 * format=format.replace("@mm@",mm); format=format.replace("@m@",m); var
 * s=this.getSeconds(); var ss=(s<10)?"0"+s:s;
 * format=format.replace("@ss@",ss); format=format.replace("@s@",s); return
 * format; }
 */
// js date 转字符
Date.prototype.DateAdd = function(strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
	case 's':
		return new Date(Date.parse(dtTmp) + (1000 * Number));
	case 'n':
		return new Date(Date.parse(dtTmp) + (60000 * Number));
	case 'h':
		return new Date(Date.parse(dtTmp) + (3600000 * Number));
	case 'd':
		return new Date(Date.parse(dtTmp) + (86400000 * Number));
	case 'w':
		return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
	case 'q':
		return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3,
				dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp
						.getSeconds());
	case 'm':
		return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp
				.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp
				.getSeconds());
	case 'y':
		return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp
				.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp
				.getSeconds());
	}
}
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
	var month = this.getMonth() + 1;
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/,
			(this.getYear() % 100) > 9 ? (this.getYear() % 100).toString()
					: '0' + (this.getYear() % 100));
	str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
	str = str.replace(/M/g, month);
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString()
			: '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString()
			: '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes()
			.toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds()
			.toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str;
}
/*
 * String.prototype.toABC = function(){ return Number(this).toABC(); }
 */
Number.prototype.toABC = function() {
	var nToUE = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
			'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
			'Z' ];
	return nToUE[this];
}
/*
 * Boolean.prototype.toTF = function(){ if(this){ return "正确"; }else{ return
 * "错误"; } } String.prototype.toTF = function(){ if(this=="true"){ return "正确";
 * }else{ return "错误"; } }
 */
// --------------------------显示提示信息之用---------start----------------------
var msgAlertTime = 0;// 秒
function showMsg(msg) {
	var n = realLength(msg);
	var mainObj = $("#errormsg");
	if (mainObj.length == 0) {
		mainObj = $("<div id='errormsg'><b class='rtop'><b class='r1'></b><b class='r2'></b><b class='r3'></b><b class='r4'></b></b><span></span><b class='rbottom'><b class='r4'></b><b class='r3'></b><b class='r2'></b><b class='r1'></b></b></div>");
		mainObj.appendTo("body");
	}
	var aw = $(document).width();
	var ah = $(document).height();

	var l = $(this).offset().left - 10;
	var t = $(this).offset().top - 40;

	if ((l + (n * 6) + 16) > aw) {
		l = aw - ((n * 6) + 32);
	}

	mainObj.css("left", l);
	mainObj.css("top", t);

	mainObj.find("span").html(msg);
	mainObj.show(300);
	if (msgAlertTime > 0) {
		msgAlertTime = 3;
	} else {
		msgAlertTime = 3;
		hideMsg()
	}
	$(this).bind("mouseout", function() {
		msgAlertTime = 0;
		mainObj.hide(300);
	});
}
function hideMsg() {
	if (msgAlertTime > 0) {
		msgAlertTime--;
		window.setTimeout(hideMsg, 1000);
	} else {
		$("#errormsg").hide(300);
	}
}
// --------------------------显示提示信息之用--------- end ---------------------
// ----------------取字符串有效长度---------start---------
function realLength(value) {
	var vlen = 0;
	for (var i = 0; i < value.length; i++) {
		vlen++;
		if (escape(value.charAt(i)).indexOf("%u") != -1)
			vlen++;
	}
	return vlen;
}
// ----------------取字符串有效长度--------- end ---------
// ----------------小数保留小数位数-----------------------
$.round = function(digit, length) {
	length = length ? parseInt(length) : 0;
	if (length <= 0)
		return Math.round(digit);
	digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
	return digit;
};
// 接收秒为单位的数字返回字符串
Number.prototype.toDate = function() {
	var pDay = parseInt(this / (60 * 60 * 24));
	var pHour = parseInt((this / (60 * 60)) % 24);
	var pMin = parseInt((this / 60) % 60);
	var pSec = parseInt(this % 60);
	var timeStr = "";
	if (pDay > 0) {
		timeStr += pDay + "天";
	}
	if (pHour > 0) {
		timeStr += pHour + "小时";
	}
	if (pMin > 9) {
		timeStr += pMin + "分";
	} else {
		timeStr += "0" + pMin + "分";
	}
	if (pSec > 9) {
		timeStr += pSec + "秒";
	} else {
		timeStr += "0" + pSec + "秒";
	}
	return timeStr;
}
/*
 * 重写jquery 的each 方法,添加null判断,为null时为其赋空对象.
 */
$.each = function(obj, callback, args) {
	if (obj == void 0) {
		obj = new Object();
	}
	var value, i = 0,

	length = obj.length, isArray = isArraylike(obj);

	if (args) {
		if (isArray) {
			for (; i < length; i++) {
				value = callback.apply(obj[i], args);

				if (value === false) {
					break;
				}
			}
		} else {
			for (i in obj) {
				value = callback.apply(obj[i], args);

				if (value === false) {
					break;
				}
			}
		}

		// A special, fast, case for the most common use of each
	} else {
		if (isArray) {
			for (; i < length; i++) {
				value = callback.call(obj[i], i, obj[i]);

				if (value === false) {
					break;
				}
			}
		} else {
			for (i in obj) {
				value = callback.call(obj[i], i, obj[i]);

				if (value === false) {
					break;
				}
			}
		}
	}

	return obj;
};
function isArraylike(obj) {
	var length = obj.length, type = jQuery.type(obj);

	if (jQuery.isWindow(obj)) {
		return false;
	}

	if (obj.nodeType === 1 && length) {
		return true;
	}

	return type === "array"
			|| type !== "function"
			&& (length === 0 || typeof length === "number" && length > 0
					&& (length - 1) in obj);
}
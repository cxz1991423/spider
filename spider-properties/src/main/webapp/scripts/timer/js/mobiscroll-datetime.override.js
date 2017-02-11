(function($){
	var currYear = new Date().getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};

    opt.default1 = {
        theme: 'android-holo light', //皮肤样式
        display: 'modal', //显示方式 modal bubble
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        timeFormat: 'HH:ii:ss',//二十四小时制
        timeWheels: 'HHiiss',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
    };
    var optDateTime = $.extend(opt['datetime'], opt['default1']);
	$.fn.scrollDateTime = function(){
		this.mobiscroll(optDateTime).datetime(optDateTime);
	};
	$.fn.scrollDate = function(){
		this.mobiscroll($.extend(opt['date'], opt['default1']));
	};
})(jQuery);
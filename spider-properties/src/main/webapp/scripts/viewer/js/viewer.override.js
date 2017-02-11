;
(function() {
	/**
	 * such as <img view_id="uuid123456" sourcePath ="test.jpg" src="test.min.jpg"/>
	 * @param sourceAttrName 必填 'sourcePath'
	 * @param onViewFn 图片显示触发事件
	 * @param onHideFn 图片隐藏触发事件
	 */
	$.fn.viewers = function(sourceAttrName, onViewFn, onHideFn) {
		$(this).each(function() {
			new Viewer(this, {
				//navbar : false,//缩略图导航
				title : false,//标题、像素
				url : sourceAttrName,//大图地址(属性名)
				zoomRatio : 0.2,//鼠标滑轮放大缩小倍数
				view : onViewFn,
				hide : onHideFn
			});
			$(this).find('img').css('cursor', 'zoom-in');
		});
	};
	$.fn.viewer = function(sourceAttrName, onViewFn, onHideFn) {
		new Viewer(this.get(0), {
			navbar : false,//缩略图导航
			title : false,//标题、像素
			url : sourceAttrName,//大图地址(属性名)
			zoomRatio : 0.2,//鼠标滑轮放大缩小倍数
			view : onViewFn,
			hide : onHideFn
		});
		this.css('cursor', 'zoom-in');
	};
})();
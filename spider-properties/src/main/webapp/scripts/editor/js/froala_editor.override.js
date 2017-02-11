(function($) {
	$.fn.editor = function(options) {
		var defaults = {
			theme : null, // 主题 默认白色主题 dark,gray,red,royal
			// height : 300,// 编辑框高度 纯数字 默认100%
			width : null,// 编辑框宽度 纯数字 默认100%
		}, settings = $.extend(defaults, options);
		this.froalaEditor({
			theme : settings.theme,
			width : settings.width,
			language : 'zh_cn',
			//功能(可排序)
			toolbarButtons : [ 'fullscreen', 'bold', 'italic', 'underline',
					'subscript', 'superscript', 'fontFamily', 'fontSize',
					'paragraphFormat', 'color', 'align', 'formatOL',
					'formatUL', 'outdent', 'indent', 'quote', 'insertHR',
					'insertLink', 'insertTable', 'undo', 'redo',
					'clearFormatting' ]
		});
		//监听是否插入了图片
		$('.fr-box').on('DOMNodeInserted',function(e){
			var imgs = $('.fr-element img');
			if(imgs.length>0){
				imgs.each(function(){
					$(this).remove();
				});
			}
		});
		
		//删除图片视频文件上传功能
		$('[data-cmd="insertVideo"]').remove().end().next('.fr-dropdown-menu')
				.remove();
		$('[data-cmd="insertImage"]').remove().end().next('.fr-dropdown-menu')
				.remove();
		$('[data-cmd="insertFile"]').remove().end().next('.fr-dropdown-menu')
				.remove();
		$('.fr-separator.fr-hs').remove();
		//删除代码块功能
		$('[data-param1="PRE"]').remove();
	};
})(jQuery);
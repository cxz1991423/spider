(function($) {
	$.fn.videojs = function(options) {
		//禁止右键
		this.get(0).oncontextmenu = function(){return false;};
		
		var defaults = {
				width: 800,//宽
				height: 450,//高
				url: '',//视频地址
				poster: '',//视频缩略图
				autoplay:false,//自动播放 默认false
			},
			settings = $.extend(defaults, options),
			videostr = '<video id="video_viewer" class="video-js vjs-default-skin vjs-big-play-centered"'+ 
				'controls preload="none"' +
				'poster="' + settings.poster + '" data-setup="{}">' +
				'<source src="' + settings.url + '" type="video/mp4" />' +
				'<source src="' + settings.url + '" type="video/webm" />' +
				'<source src="' + settings.url + '" type="video/ogg" />' +
//		标题	'<track kind="captions" src="example-captions.vtt" srclang="en" label="English"></track>' +
//		字幕	'<track kind="subtitles" src="example-captions.vtt" srclang="en" label="English"></track>' +
				'</video>';
		this.html('').append(videostr);
		
		videojs("video_viewer", {
//			"techOrder": ["flash", "html5"],
			"autoplay": settings.autoplay,
			"controlBar": {
				captionsButton: false,
				chaptersButton: false,
				liveDisplay: false,
				playbackRateMenuButton: false,
				subtitlesButton: false
			},
			"preload": "auto",//预加载资源
			 "width": settings.width,
			 "height": settings.height,
			 
		}, function() {
			//加载完毕执行
			this.on('loadeddata', function() {
//				console.log(this)
			});
			//播放结束执行
			this.on('ended', function() {
				 this.pause();
//				 this.dispose();//销毁
			});
		});
	};
})(jQuery);
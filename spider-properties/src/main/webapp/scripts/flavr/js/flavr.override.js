(function(){
	var model = null;
	String.prototype.showConfirm = function(onSubmit,onCancel,onBuild,title) {
		var content = this;
		model = new $.flavr({
			title:title,
			animateEntrance : 'fadeIn', 
			animateClosing : 'fadeOut',
			content: content,
			init: function(){
				console.log("init")
			},
			buttons: {
				lesser: {
					style: 'lesser',
					text: '取消',
					action: onCancel
				},
				primary: {
					style: 'primary',
					text: '确定',
					action: onSubmit
				}
			},
			onShow: function(){
				$('.flavr-content').before('<span id="flavr-close"></span>');
				$('#flavr-close').on('click',function(){
					close();
				});
			},
			onBuild: onBuild
		});
	};

	String.prototype.showMessage = function(onBuildFn,onSubmitFn) {
		var content = this;
		model = new $.flavr({
			animateEntrance : 'fadeIn', 
			animateClosing : 'fadeOut',
			content: content,
			init:function(){
				console.log("init")
			},
			buttons: {
				primary: {
					style: 'primary',
					text: '确定',
					action: onSubmitFn
				}
			},
			onShow:function(){
				$('.flavr-content').before('<span id="flavr-close"></span>');
				$('#flavr-close').on('click',function(){
					model.close();
				});
			},
			onBuild:onBuildFn
		});
	};
	function close(){
		model.close();
	}
})();

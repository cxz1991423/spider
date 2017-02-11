(function($){
	var spinner = '<div class="cover"></div><div class="spinner-containner"><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div></div>';
	var $spinner = $(spinner);
	$.fn.loadding = function(){
		$('body').append($spinner);
	}
	$.fn.loadding.close=function(){
		$spinner.remove();
	}
})(jQuery)
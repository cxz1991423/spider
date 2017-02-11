
#
<ul id="jq22">
    <li><img src="img/tibet-1.jpg" alt="图片1" data_id="123"></li>
    <li><img src="img/tibet-2.jpg" alt="图片2"></li>
    <li><img src="img/tibet-3.jpg" alt="图片3"></li>
    <li><img src="img/tibet-4.jpg" alt="图片4"></li>
    <li><img src="img/tibet-5.jpg" alt="图片5"></li>
    <li><img src="img/tibet-6.jpg" alt="图片6"></li>
</ul>
#

#使用方法   new Viewer(document.getElementById('jq22'));
#或者单个文件:new Viewer(document.querySelector('img[data_id="123"]'));


****************参*****数*****配*****置********************

# 	用法:
#   new Viewer(document.querySelector('img[data_id="123"]'),{
#		inline:true,
#		navbar:false
#		...
#	});


    名称			  类型				 默认值			             说明
inline			布尔值			false			启用 inline 模式
button			布尔值			true			显示右上角关闭按钮（jQuery 版本无效）
navbar			布尔值/整型			true			显示缩略图导航
title			布尔值/整型			true			显示当前图片的标题（现实 alt 属性及图片尺寸）
toolbar			布尔值/整型			true			显示工具栏
tooltip			布尔值			true			显示缩放百分比
movable			布尔值			true			图片是否可移动
zoomable		布尔值			true			图片是否可缩放
rotatable		布尔值			true			图片是否可旋转
scalable		布尔值			true			图片是否可翻转
transition		布尔值			true			使用 CSS3 过度
fullscreen		布尔值			true			播放时是否全屏
keyboard		布尔值			true			是否支持键盘
interval		整型				5000			播放间隔，单位为毫秒
zoomRatio		浮点型			0.1				鼠标滚动时的缩放比例
minZoomRatio	浮点型			0.01			最小缩放比例
maxZoomRatio	数字				100				最大缩放比例
zIndex			数字				2015			设置图片查看器 modal 模式时的 z-index
zIndexInline	数字				0				设置图片查看器 inline 模式时的 z-index
url				字符串/函数			src				设置大图片的 url
build			函数				null			回调函数，具体查看演示
built			函数				null			回调函数，具体查看演示
show			函数				null			回调函数，具体查看演示
shown			函数				null			回调函数，具体查看演示
hide			函数				null			回调函数，具体查看演示
hidden			函数				null			回调函数，具体查看演示
view			函数				null			回调函数，具体查看演示
viewed			函数				null			回调函数，具体查看演示



<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新闻爬取页</title>
<%@ include file="/commons/common_bootstrap_include.jsp"%>
<%@ include file="/scripts/flavr/plugin.jsp"%>
<%@ include file="/scripts/spinner/plugin.jsp"%>
<link  rel="stylesheet" type="text/css" href="${rPath}casebase/spider/css/spider.css">
<script src="${rPath}casebase/spider/js/spider.js"></script>
<style type="text/css">
	.config-field-value {
	    width: 86%;
	}
</style>
</head>
<body>
	<div id="spider-main">
		<div id="btn-box">
			<button type="button" id="spider-add-listPage" class="btn spider-add-btn spider-add-active">添加列表页</button>
			<button type="button" id="spider-add-targetPages" class="btn spider-add-btn">批量内容页</button>
			<button type="button" id="spider-add-js-json" class="btn spider-add-btn">JS-json</button>
			<button type="button" id="spider-add-simplePage" class="btn spider-add-btn">单页任意爬取</button>
		</div>
		<div id="configs">
			<ul id="listPage" ref="spider-add-listPage">
				<li>
					<h3 class="title">添加列表页</h3>
					<span class="notice">注:列表页,要爬取的目标页在列表页之内,需要从中提取。<font class="rednotice">*</font><font>号为必填，其余为选填</font></span>
				</li>
				<li>
					<span class="config-title">网站名<font class="rednotice">*</font> : </span>
					<input class="config siteName" placeholder="siteName,如:北京人民网" value="北京人民网">
				</li>
				<li>
					<span class="config-title">域　名<font class="rednotice">*</font> : </span>
					<input class="config domain" placeholder="domain,如:bj.people.com.cn" value="bj.people.com.cn">
				</li>
				<li>
					<span class="config-title">起始页<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn test-startUrl">测试</button>
					<input class="config startUrl" 
							placeholder="startUrl,如:http://bj.people.com.cn/GB/82840/index.html" 
							value="http://bj.people.com.cn/GB/82840/index.html">
				</li>
				<li>
					<span class="config-title">起始页正则<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn test-mainUrlRegex">测试</button>
					<input class="config mainUrlRegex" 
							placeholder="mainUrlRegex,如:http://bj.people.com.cn/GB/82840/index\d*.html" 
							value="http://bj.people.com.cn/GB/82840/index\d*.html">
				</li>
				<li>
					<span class="config-title">引伸页正则(regex) : </span>
					<button class="btn spider-test-btn test-moreUrlRegex">测试</button>
					<input class="config moreUrlRegex" 
							placeholder="moreUrlRegex,用于在当前页提取出后续要爬的url如:http://bj.people.com.cn/GB/82840/index\d*.html" 
							value="http://bj.people.com.cn/GB/82840/index\d*.html">
				</li>
				<!-- <li>
					<span class="config-title">列表区域正则 : </span>
					<button class="btn spider-test-btn" id="listPage-mainAreaRegex-test">测试</button>
					<input class="config mainAreaRegex" placeholder="mainAreaRegex,用于起始页爬完之后在当前页提取出后续要爬的url">
				</li> -->
				<li>
					<span class="config-title">列表区域(xpath)<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn" id="listPage-mainAreaXpath-test">测试</button>
					<input class="config mainAreaXpath" 
							placeholder='mainAreaXpath,用于起始页爬完之后在当前页提取出后续要爬的url 如://div[@class="ej_list_box clear"]' 
							value='//div[@class="ej_list_box clear"]'>
				</li>
				<li>
					<span class="config-title">子链(xpath)<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn" id="listPage-childUrlXpath-test">测试</button>
					<input class="config childUrlXpath" 
						placeholder='childUrlXpath,用于子链接爬取 如://div[@class="ej_list_box clear"]/ul/li/a/@href'
						value='//div[@class="ej_list_box clear"]/ul/li/a/@href'>
				</li>
				<li>
				<span class="config-title">子链正则 : </span>
					<button class="btn spider-test-btn" id="listPage-childUrlRegex-test">测试</button>
					<input class="config childUrlRegex" placeholder="childUrlRegex,用于子链接精校,可选 如:http://bj.people.com.cn/n2/\d*/\d*/c\d*-\d*.html"
					value="http://bj.people.com.cn/n2/\d*/\d*/c\d*-\d*.html">
				</li>
				<!-- <li>
					<span class="config-title">下一页正则 : </span>
					<button class="btn spider-test-btn" id="listPage-nextPageUrlRegex-test">测试</button>
					<input class="config nextPageUrlRegex" placeholder="nextPageUrlRegex,用于起始页爬完之后在当前页提取出后续要爬的url">
				</li> -->
				<li>
					<h3 class="title">子页测试：<button class="btn spider-test-btn config-field-test">测试</button></h3>
					&nbsp;
					<span class="notice">注:<!-- 字段名必须为纯英文，且不能以下划线开头， -->测试子页链接为列表页匹配到的第一个子页链接</span>
				</li>
				<!-- <li>
					<button id="field-add" class="btn spider-add-btn spider-add-active">添加字段</button>　
				</li> -->
				<li><hr/></li>
				<li>
					<span class="config-title">是否有分页情况<font class="rednotice">*</font> : </span>
					<span class="notice">注:内容页里是否存在分页情况,如果有,则需要标记分页链接的xpath</span>
					<p></p>
					<input type="hidden" name="ifNextPage" value="0">
					<input type="radio" name="if-next-1" value="1" id="ifnext1">
					<label for="ifnext1" class="radio-label">是</label>
					<input type="radio" name="if-next-1" value="0" id="ifnext2" checked="checked">
					<label for="ifnext2" class="radio-label">否</label>
				</li>
				<li class="hide">
					<span class="config-title">下一页(xpath)<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn" id="listPage-childNextPage-test">测试</button>
					<span class="notice">注:请在网页中对比测试结果</span>
					<input class="config childNextPage" 
							placeholder='childNextPage,如果存在多页情况，则需标记分页链接的xpath' 
							value=''>
				</li>
				<li class="fields">
					<input type="hidden" class="config-field-name" value="t">
					<input type="hidden" class="config-field-comment" value="标题">
					<span>标　　题xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value" value='//div[@class="clearfix w1000_320 text_title"]/h1/text()'>　
				</li><hr/>
				<li class="fields">
					<input type="hidden" class="config-field-name" value="c">
					<input type="hidden" class="config-field-comment" value="正文">
					<span>正　　文xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value" value='//div[@class="box_con"]'>　
				</li><hr/>
				<li class="fields">
					<input type="hidden" class="config-field-name" value="d">
					<input type="hidden" class="config-field-comment" value="发布时间">
					<span>发布时间xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value" value='//div[@class="box01"]/div[@class="fl"]/text()'>　
				</li><hr/>
				<li id="field-add-point"></li>
				<!-- <li><hr/></li> -->
				<li class="btn-box">
					<button id="listPage-reset" class="btn spider-btn" type="button">重　置</button>
					<button id="listPage-submit" class="btn spider-btn" type="button">保　存</button>
				</li>
			</ul>
			<ul id="targetPages" ref="spider-add-targetPages" class="hide">
				<li>
					<h3 class="title">添加批量内容页</h3>
					<span class="notice">注:批量添加内容页，并抓取新闻信息。<font class="rednotice">*</font><font>号为必填，其余为选填</font></span>
				</li>
				<!-- <li>
					<span class="config-title">起始页<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn" id="targetPages-startUrl-test">测试</button>
					<span class="notice">起始页用于后期定时扫描获取最新报道</span>
					<input class="config startUrl" 
							placeholder='startUrl,用于后期定时扫描获取最新报道' 
							value=''>
				</li> -->
				<li>
					<span class="config-title">内容页URL<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn test-startUrl">测试</button>
					<span class="notice">注:每一行只能写一条URL，不能有其他特殊字符，只对第一条URL做测试</span>
					<textarea class="config targetUrls" 
							placeholder='targetUrls,批量添加需要爬取的内容页URL' 
							value=''>http://bj.people.com.cn/n2/2017/0119/c82840-29616950.html
http://bj.people.com.cn/n2/2017/0119/c82840-29616935.html
http://bj.people.com.cn/n2/2017/0119/c82840-29616082.html</textarea>
				</li>
				<li>
					<span class="config-title">内容页正则<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn test-mainUrlRegex">测试</button>
					<input class="config mainUrlRegex" 
							placeholder='mainUrlRegex,内容页正则用于约束验证URL格式' 
							value=''>
				</li>
				<li>
					<span class="config-title">是否有分页情况<font class="rednotice">*</font> : </span>
					<span class="notice">注:内容页里是否存在分页情况,如果有,则需要标记分页链接的xpath</span>
					<p></p>
					<input type="hidden" name="ifNextPage" value="0">
					<input type="radio" name="if-next-2" value="1" id="ifnext3">
					<label for="ifnext3" class="radio-label">是</label>
					<input type="radio" name="if-next-2" value="0" id="ifnext4" checked="checked">
					<label for="ifnext4" class="radio-label">否</label>
				</li>
				<li class="hide">
					<span class="config-title">下一页(xpath)<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn" id="targetPages-nextPage-test">测试</button>
					<span class="notice">注:请在网页中对比测试结果</span>
					<input class="config nextPage" 
							placeholder='nextPage,如果存在多页情况，则需标记分页链接的xpath' 
							value=''>
				</li>
				<li>
					<h3 class="title">内容页字段测试：<button class="btn spider-test-btn config-field-test">测试</button></h3>
				</li>
				<!-- <li>
					<button id="field-add" class="btn spider-add-btn spider-add-active">添加字段</button>　
				</li> -->
				<li><hr/></li>
				<li class="fields">
					<input type="hidden" class="config-field-name" value="t">
					<input type="hidden" class="config-field-comment" value="标题">
					<span>标　　题xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value" value=''>　
				</li><hr/>
				<li class="fields">
					<input type="hidden" class="config-field-name" value="c">
					<input type="hidden" class="config-field-comment" value="正文">
					<span>正　　文xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value" value=''>　
				</li><hr/>
				<li class="fields">
					<input type="hidden" class="config-field-name" value="d">
					<input type="hidden" class="config-field-comment" value="发布时间">
					<span>发布时间xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value" value=''>　
				</li><hr/>
				
				<li class="btn-box">
					<button id="targetPages-reset" class="btn spider-btn" type="button">重　置</button>
					<button id="targetPages-submit" class="btn spider-btn" type="button">保　存</button>
				</li>
			</ul>
			<ul id="js-json" ref="spider-add-js-json" class="hide">
				<li>
					<h3 class="title">添加JS-json解析</h3>
					<span class="notice">注:列表页,要爬取的目标页在列表页之内,需要从中提取。<font class="rednotice">*</font><font>号为必填，其余为选填</font></span>
				</li>
				<li class="btn-box">
					<button id="js-json-reset" class="btn spider-btn" type="button">重　置</button>
					<button id="js-json-submit" class="btn spider-btn" type="button">保　存</button>
				</li>
			</ul>
			<ul id="simplePage" ref="spider-add-simplePage" class="hide">
				<li>
					<h3 class="title">添加单页面任意爬取</h3>
					<span class="notice">注:单页面任意爬取，所有需要的信息都在本页面，通过分页显示<font class="rednotice">*</font><font>号为必填，其余为选填</font></span>
				</li>
				<li>
					<span class="config-title">URL<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn test-startUrl">测试</button>
					<input class="config startUrl" 
							placeholder='startUrl,添加URL' 
							value=''>
				</li>
				<li>
					<span class="config-title">下一页Xpath<font class="rednotice">*</font> : </span>
					<button class="btn spider-test-btn" id="simplePage-URL-test">测试</button>
					<input class="config simplePageURL" 
							placeholder='simplePageURL,添加URL' 
							value=''>
				</li>
				<li>
					<h3 class="title">子页测试</h3>
					&nbsp;
					<span class="notice">注:字段名必须为纯英文，且不能以下划线开头，测试子页链接为列表页匹配到的第一个子页链接</span>
				</li>
				<li>
					<button class="btn spider-add-btn spider-add-active field-add">添加字段</button>　
					<button class="btn spider-test-btn config-field-test">测试</button>
				</li>
				<li><hr/></li>
				<li class="fields">
					<span>字段名<font class="rednotice">*</font> : </span>
					<input class="config-field-name">
					<span>备　注<font class="rednotice">*</font> : </span>
					<input class="config-field-comment">
					<span> xpath<font class="rednotice">*</font> : </span>
					<input class="config-field-value custom-value" value=''>　
					<button class="btn spider-delete-btn">删除字段</button>
				</li><hr/>
				<li class="btn-box">
					<button id="listPage-reset" class="btn spider-btn" type="button">重　置</button>
					<button id="listPage-submit" class="btn spider-btn" type="button">保　存</button>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
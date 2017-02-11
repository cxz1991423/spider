<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE>
<html lang="zh-CN">
<head>
<%
	//用于更改样式
	String[] styles = new String[] { "ss-left", "ss-right" };
	request.setAttribute("ss_styles", styles);
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>spider配置</title>
<%@ include file="/commons/common_bootstrap_include.jsp"%>
<%@ include file="/scripts/flavr/plugin.jsp"%>
<%@ include file="/scripts/spinner/plugin.jsp"%>
<link  rel="stylesheet" type="text/css" href="${rPath}casebase/spider/css/spider.css">
<script src="${rPath}casebase/spider/js/spider.js"></script>
</head>
<body>
	<div id="spider-main">
		<button type="button" id="spider-add-listPage" class="btn spider-add-btn spider-add-active">添加列表页</button> 
		<!-- <button type="button" id="spider-add-targetPage" class="btn spider-add-btn">添加目标页</button> -->
		<ul id="spider-listPage-config">
			<li>
				<h3 class="title">添加列表页</h3>
				<span class="notice">注:列表页,要爬取的目标页在列表页之内,需要从中提取。<font class="rednotice">*</font><font>号为必填，其余为选填</font></span>
			</li>
			<li>
				<span class="config-title">网站名<font class="rednotice">*</font> : </span>
				<input class="config siteName" placeholder="siteName,如:新华网" value="新华网">
			</li>
			<li>
				<span class="config-title">域　名<font class="rednotice">*</font> : </span>
				<input class="config domain" placeholder="domain,如:bj.people.com.cn" value="bj.people.com.cn">
			</li>
			<li>
				<span class="config-title">起始页<font class="rednotice">*</font> : </span>
				<button class="btn spider-test-btn" id="listPage-startUrl-test">测试</button>
				<input class="config startUrl" 
						placeholder="startUrl,如:http://bj.people.com.cn/GB/82840/index.html" 
						value="http://bj.people.com.cn/GB/82840/index.html">
			</li>
			<li>
				<span class="config-title">起始页正则<font class="rednotice">*</font> : </span>
				<button class="btn spider-test-btn" id="listPage-startUrlRegex-test">测试</button>
				<input class="config startUrlRegex" 
						placeholder="startUrlRegex,如:http://bj.people.com.cn/GB/\d{5}/index\d*.html" 
						value="http://bj.people.com.cn/GB/\d{5}/index\d*.html">
			</li>
			<li>
				<span class="config-title">引伸页正则(regex) : </span>
				<button class="btn spider-test-btn" id="listPage-moreUrlRegex-test">测试</button>
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
				<input class="config-field-name" value="title">
				<span>备　注<font class="rednotice">*</font> : </span>
				<input class="config-field-comment" value="标题">
				<span> xpath<font class="rednotice">*</font> : </span>
				<input class="config-field-value" value='//div[@class="clearfix w1000_320 text_title"]/h1/text()'>　
				<button class="btn spider-delete-btn">删除字段</button>
			</li><hr/>
			<li class="fields">
				<span>字段名<font class="rednotice">*</font> : </span>
				<input class="config-field-name" value="content">
				<span>备　注<font class="rednotice">*</font> : </span>
				<input class="config-field-comment" value="正文">
				<span> xpath<font class="rednotice">*</font> : </span>
				<input class="config-field-value" value='//div[@class="box_con"]'>　
				<button class="btn spider-delete-btn">删除字段</button>
			</li><hr/>
			<li class="fields">
				<span>字段名<font class="rednotice">*</font> : </span>
				<input class="config-field-name" value="contentImg">
				<span>备　注<font class="rednotice">*</font> : </span>
				<input class="config-field-comment" value="正文图片">
				<span> xpath<font class="rednotice">*</font> : </span>
				<input class="config-field-value" value='//div[@class="box_pic"]'>　
				<button class="btn spider-delete-btn">删除字段</button>
			</li><hr/>
			<li id="field-add-point"></li>
			<!-- <li><hr/></li> -->
			<li class="btn-box">
				<button id="listPage-reset" class="btn spider-btn" type="button">重　置</button>
				<button id="listPage-submit" class="btn spider-btn" type="button">保　存</button>
			</li>
		</ul>
		<ul id="spider-targetPage-config" class="hide">
			<li><h3 class="title">添加目标页</h3><span>目标页:目标页面包括完整内容页和需要分页爬取的内容页</span></li>
			<li><span class="config-title">网站名 : </span>
			<input class="config" id="targetPage-siteName" placeholder="siteName,如:新华网"></li>
			<li><span class="config-title">域　名 : </span>
			<input class="config" id="targetPage-hostName" placeholder="hostName,如:http://www.xinhuanet.com/"></li>
			<li><span class="config-title">起始页 : </span>
			<input class="config" id="targetPage-startUrl" placeholder="startUrl,如:http://blog.csdn.net/u010900754/article/details/51395529"></li>
			<li><span class="config-title">子页正则 : </span>
			<input class="config" id="targetPage-requestUrls" placeholder="requestUrls,用于起始页爬完之后在当前页提取出后续要爬的url"></li>
			<li><span class="config-title">添加列表页 : </span>
			<input class="config" id="" placeholder="" /></li>
			<li><button id="field-add" class="btn spider-add-btn spider-add-active">添加字段</button>&nbsp;<span>注:字段名必须为纯英文，且不能以下划线开头</span></li>
			<li><hr/></li>
			<li><span>字段名 : </span><input class="config-field-name"><span> xpath : </span><input class="config-field-value"><button class="btn spider-delete-btn">删除字段</button><button class="btn spider-test-btn config-field-test">测试</button></li><hr/>
			<li><span>字段名 : </span><input class="config-field-name"><span> xpath : </span><input class="config-field-value"><button class="btn spider-delete-btn">删除字段</button><button class="btn spider-test-btn config-field-test">测试</button></li><hr/>
			<li><span>字段名 : </span><input class="config-field-name"><span> xpath : </span><input class="config-field-value"><button class="btn spider-delete-btn">删除字段</button><button class="btn spider-test-btn config-field-test">测试</button></li><hr/>
			<li id="field-add-point"></li>
			<li class="btn-box"><button id="targetPage-reset" class="btn spider-btn" type="button">重置</button><button id="targetPage-submit" class="btn spider-btn" type="button">保存</button></li>
		</ul>
	</div>

</body>
</html>
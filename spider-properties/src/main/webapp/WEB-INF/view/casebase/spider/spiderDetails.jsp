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
<title>spider详情页</title>
<%@ include file="/commons/common_bootstrap_include.jsp"%>
<%@ include file="/scripts/flavr/plugin.jsp"%>
<%@ include file="/scripts/spinner/plugin.jsp"%>
</head>
<body>
spiderdetails
</body>
</html>
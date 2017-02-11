<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<% 
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String theme = "extlike";
request.setAttribute("theme", theme);
String rPath = basePath;
request.setAttribute("rPath", rPath);
String resourceRoot = "/resource/";
request.setAttribute("resourceRoot", resourceRoot);
String wsRoot = "ws://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<link rel="shortcut icon" href="${rPath}/favicon.ico" type="image/x-icon" />  
<link rel="stylesheet" type="text/css" href="${rPath}scripts/bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}scripts/bootstrap/css/jquery.dataTables.min.css"/>
<script type="text/javascript" src="${rPath}scripts/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${rPath}scripts/jquery.overide.js"></script>

<script type="text/javascript" src="${rPath}scripts/common/jquery-migrate.js"></script>
<script type="text/javascript" src="${rPath}scripts/common/jquery.tojsonstring.js"></script>

<script type="text/javascript" src="${rPath}scripts/ui/jquery.uploadify.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui/jquery.uploadify.ext.js"></script>

<script type="text/javascript" src="${rPath}scripts/ui/jquery.form.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui/jquery.form.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui/jquery.validate.js"></script>
<%-- <script type="text/javascript" src="${rPath}scripts/ui/jquery.validate.ext.js"></script> --%>
<script type="text/javascript" src="${rPath}scripts/ui/WdatePicker.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui/jquery.datetime.js"></script>

<script type="text/javascript" src="${rPath}scripts/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${rPath}scripts/bootstrap/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="${rPath}scripts/bootstrap/js/jquery.dataTables.ext.js"></script>

<!--[if lt IE 9]>
    <script type="text/javascript" src="${rPath}scripts/bootstrap/js/html5shiv.min.js"></script>
    <script type="text/javascript" src="${rPath}scripts/bootstrap/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
var templateRoot = '<%= basePath %>';
var pageRoot = '${pageContext.request.contextPath}';
var commonRoot = '${rPath}';
var wsRoot = '<%= wsRoot %>';
var resourceRoot = '${resourceRoot}';
</script>
<style type="text/css">
*{
	-webkit-transition: all .2s ease-in-out;
	-moz-transition: all .2s ease-in-out;
	-o-transition: all .2s ease-in-out;
	-ms-transition: all .2s ease-in-out;
	transition: all .2s ease-in-out; 
}
</style>
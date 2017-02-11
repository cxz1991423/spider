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
request.setAttribute("minPath", "/");
%>
<link rel="stylesheet" type="text/css"  href="${rPath}themes/${theme}/jquery-ui/jquery.ui.base.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/${theme}/jquery-ui/jquery.ui.theme.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/${theme}/jquery-ui/layout-default.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/common/jqgrid/ui.jqgrid.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/common/alert/jquery.alerts.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/common/ztree/zTreeStyle.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/common/uploadify/uploadify.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/common/tip-red/tip-red.css"/>
<link rel="stylesheet" type="text/css" href="${rPath}themes/${theme}/main.css"/>

<script type="text/javascript" src="${rPath}scripts/jquery-1.9.1.js"></script>
<script type="text/javascript" src="${rPath}scripts/common${minPath}/jquery-migrate.js"></script>
<script type="text/javascript" src="${rPath}scripts/common${minPath}/jquery.metadata.js"></script>
<script type="text/javascript" src="${rPath}scripts/common${minPath}/jquery.tojsonstring.js"></script>
<script type="text/javascript" src="${rPath}scripts/common${minPath}/swfobject.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery-ui.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.ztree.all.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.ztree.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/WdatePicker.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.datalabel.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.layout.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui/i18n/jqgrid.locale-cn.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.jqGrid.src.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.jqGrid.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.uploadify.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.uploadify.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.validate.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.validate.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui/i18n/jquery.validate.messages_cn.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.form.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.form.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.datetime.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.alerts.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.overides.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.ui.button.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.ui.panel.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.ui.tabs.ext.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.poshytip.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.qtip.js"></script>
<script type="text/javascript" src="${rPath}scripts/ui${minPath}/jquery.ui.convert.js"></script>
<script type="text/javascript">
var templateRoot = '<%= basePath %>';
var pageRoot = '${pageContext.request.contextPath}';
var commonRoot = '${rPath}';
Constant = {
		sessionId : "${pageContext.session.id}",
		jQgrid : {
			rowNum : 15, 
			rowList : [15, 30, 50],
			height : 300
		},
		editor:{
			all:"bold italic underline strikethrough subscript superscript | font size " +
		            "style | color highlight removeformat | bullets numbering | outdent " +
		            "indent | alignleft center alignright justify | undo redo | " +
		            "rule image link unlink | cut copy paste pastetext | print source",
			normal:"bold italic underline strikethrough subscript superscript | font size "
		}
}
</script>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ include file="/commons/common_bootstrap_include.jsp"%>
<%@ include file="/scripts/websocket/socket.jsp"%>
</head>
<body>
<h3>接收信息:</h3>
<div id="content"></div>
<script type="text/javascript">
	var noticeSocket = function() {
		var s = new SockJS('/socket');
		var stompClient = Stomp.over(s);
		stompClient.connect({}, function() {
			console.log('notice socket connected!');
			stompClient.subscribe('/topic/notice', function(data) {
				console.log(data)
				$('#content').html(data);
			});
		});
	};
</script>
</body>
</html>
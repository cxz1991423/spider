<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ include file="/commons/common_bootstrap_include.jsp"%>
<%@ include file="/scripts/websocket/socket.jsp"%>
<script type="text/javascript">
	var stompClient = null;
	function setConnected(connected) {
		document.getElementById('connect').disabled = connected;
		document.getElementById('disconnect').disabled = !connected;
		document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
		document.getElementById('response').innerHTML = '';
	}
	// 开启socket连接
	function connect() {
		var socket = new SockJS('/socket');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			setConnected(true);
		});
	}
	// 断开socket连接
	function disconnect() {
		if (stompClient != null) {
			stompClient.disconnect();
		}
		setConnected(false);
	}
	// 向‘/app/change-notice’服务端发送消息
	function sendName() {
		var value = document.getElementById('name').value;
		stompClient.send("/app/change-notice", {}, value);
	}
	connect();
</script>
<title>helloWebsocket</title>
</head>
<body>
	<h3>Hello Websocket</h3>

	<div>
		<div>
			<button id="connect" onclick="connect();">Connect</button>
			<button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
		</div>
		<div id="conversationDiv">
			<p>
				<label>notice content?</label>
			</p>
			<p>
				<textarea id="name" rows="5"></textarea>
			</p>
			<button id="sendName" onclick="sendName();">Send</button>
			<p id="response"></p>
		</div>
	</div>

</body>
</html>
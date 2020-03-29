//var wsUrl = "ws://192.168.11.204:8808/vl8-web/im/"+useName;
//var wsUrl = "ws://101.201.238.199:8080/vl8-web/im/"+useName;18612779214
//var user = JSON.parse(vlUtils.getStorage('user'));
//var useName = user.bill_no;
//var wsUrl = "ws://101.201.238.199:8080/vl8-web/im/"+useName;
//var wsUrl = "ws://192.168.3.39:8808/vl8-web/im/"+userbillNo;
//var ws = null;
//console.log("执行websocket包js");
var record = []; //这个聊天信息  初始化。
var currentgroupCode = "";
var currentUserbillNo = "";
if(typeof(template) != "undefined") {
	template.config('escape', false);
};

var ui = {
	body: document.querySelector('body'),
	footer: document.querySelector('footer'),
	footerRight: document.querySelector('.footer-right'),
	footerLeft: document.querySelector('.footer-left'),
	btnMsgType: document.querySelector('#msg-type'),
	boxMsgText: document.querySelector('#msg-text'),
	boxMsgSound: document.querySelector('#msg-sound'),
	btnMsgImage: document.querySelector('#msg-image'),
	areaMsgList: document.querySelector('#msg-list'),
	boxSoundAlert: document.querySelector('#sound-alert'),
	h: document.querySelector('#h'),
	content: document.querySelector('.mui-content')
};

function show101() {
   console.log("调用show101");
	var wvs = plus.webview.all();
	for(var i = 0; i < wvs.length; i++) {
		if(wvs[i].getURL().indexOf("tab-webview-subpage-chat.html") > -1) {
			console.log('webview' + i + ': ' + wvs[i].getURL());
 			wvs[i].evalJS("quDong();");
		}

	}

}

function createWebSocket(wsUrl) {
	try {
		ws = new WebSocket(wsUrl);
		initEventHandle();
	} catch(e) {
 		reconnect(wsUrl);
	}

}

function getCurrentgroupCode(groupCode,userbillNo) {
	currentgroupCode = groupCode;
	currentUserbillNo = userbillNo;
}

function initEventHandle() {
 	ws.onopen = function() { 
 	};
 	ws.onclose = function() { 
	};
	ws.onerror = function() {
	};
 	ws.onmessage = function(message) { 
 		if(message.data == "gg"){
	    	return;
	    }
// 		num++;
		console.log("收到的消息："+JSON.stringify(message));
		console.log("收到的消息data："+message.data); 
//		console.log("收到的消息isTrusted："+message.isTrusted);
//		console.log("收到的消息origin："+message.origin);
//		console.log("收到的消息lastEventId："+message.lastEventId);
//		console.log("收到的消息source："+message.source);
	    var msg = JSON.parse(message.data);
	    console.log("msg:"+JSON.stringify(msg));
	    if(msg.data == "gg"){
	    	return;
	    }
		//
		var user = JSON.parse(vlUtils.getStorage('user'));
		var bill_user = user.bill_no;
		var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
		
		usersDB.transaction(function (tx) {
	 		var key101 = "(bill_no, fbill_no, cc_user, bill_user, bill_context, bill_date, bill_dept, bill_title, link_lnext,bill_com)";
			var key102 = "(bill_no, bill_user, bill_name, fbill_no, bill_title, cc_user, bill_context, bill_com, bill_date, bill_task, node_qty, bill_dept, link_next,  bill_ipaddr, bill_gpsaddr, bill_text )";
			tx.executeSql('SELECT * FROM vdim101 WHERE fbill_no = "'+msg.msg[0].fbill_no+'" AND bill_user = "'+bill_user+'"', [], function (tx, results) {
				if (results.rows.length == 0) {
					var val101_new = '("'+getDataCode("vdim101") +'","' +msg.msg[0].fbill_no+'","'
								  		 +msg.msg[0].cc_user     +'","' +bill_user+'","'
								         +msg.msg[0].bill_context+'","' +msg.msg[0].bill_date+'","","'
								         +msg.msg[0].bill_name   +'","vdim102_list","'+msg.msg[0].bill_com+'")';
					usersDB.transaction(function (tx) {
					    tx.executeSql('INSERT INTO vdim101 '+ key101+' VALUES ' + val101_new +'');
					});
					console.log("3-1，101中无这个对话！, 新增，存好了！"+val101_new);
					show101(); 
					var val102 = '("'+ msg.msg[0].bill_no+'", "'+msg.msg[0].bill_user+'", "'+msg.msg[0].bill_name+'", "'
								   + msg.msg[0].fbill_no+'", "'+msg.msg[0].bill_title+'", "'+msg.msg[0].cc_user+'", "'
								   + msg.msg[0].bill_context+'", "'+msg.msg[0].bill_com+'", "'+ msg.msg[0].bill_date +'", "'
								   + msg.msg[0].bill_task + '", "0", "","","","","" )' ;
					usersDB.transaction(function (tx) {
					    tx.executeSql('INSERT INTO vdim102 '+ key102+' VALUES ' + val102 +'');
					});
					// 接收方的图片地址
					var himPic = currentgroupCode + ".png";
					var him_relativePath = "_downloads/Vldicon/" + himPic;
					var him_path = plus.io.convertLocalFileSystemURL(him_relativePath);
					// 存了之后判断是不是当前聊天状态
					if(currentgroupCode == msg.msg[0].fbill_no && currentUserbillNo == msg.msg[0].cc_user){
						record.push({
							sender: 'him',
							type: 'text',
							src: him_path,
							content: msg.msg[0].bill_context
						})
					}
					// 绑定
					bindMsgList();
				}else {
					usersDB.transaction(function(tx) {
					    tx.executeSql('UPDATE vdim101 SET bill_context="'+msg.msg[0].bill_context+'" WHERE fbill_no="'+msg.msg[0].fbill_no+'" AND bill_user = "'+bill_user+'"');
					    tx.executeSql('UPDATE vdim101 SET bill_date="'+msg.msg[0].bill_date+'" WHERE fbill_no="'+msg.msg[0].fbill_no+'" AND bill_user = "'+bill_user+'"');
					});
					console.log("3-2收到消息，101中有这个对话！更新！");
					show101(); 
					var val102 = '("'+ msg.msg[0].bill_no+'", "'+msg.msg[0].bill_user+'", "'+msg.msg[0].bill_name+'", "'
								   + msg.msg[0].fbill_no+'", "'+msg.msg[0].bill_title+'", "'+msg.msg[0].cc_user+'", "'
								   + msg.msg[0].bill_context+'", "'+msg.msg[0].bill_com+'", "'+ msg.msg[0].bill_date +'", "'
								   + msg.msg[0].bill_task + '", "0", "","","","","" )' ;
					usersDB.transaction(function (tx) {
					    tx.executeSql('INSERT INTO vdim102 '+ key102+' VALUES ' + val102 +'');
					});
					// 接收方的图片地址
					var himPic = currentgroupCode + ".png";
					var him_relativePath = "_downloads/Vldicon/" + himPic;
					var him_path = plus.io.convertLocalFileSystemURL(him_relativePath);
					// 存了之后判断是不是当前聊天状态
					if(currentgroupCode == msg.msg[0].fbill_no && currentUserbillNo == msg.msg[0].cc_user){
						record.push({
							sender: 'him',
							type: 'text',
							src: him_path,
							content: msg.msg[0].bill_context
						})
					}
					// 绑定
					bindMsgList();
					return;
				}
				console.log("4ok")
			}, null);
		});
	}
}

 

function sendMessage(text, groupCode,chatMen,teamBillCom) {
 	var onlyCode = getDataCode("vdim102");
//	var getTime = getDate();
	var getTime =  vlUtils.dateToString(new Date());
	var user = JSON.parse(vlUtils.getStorage('user'));
	var bill_user = user.bill_no;
	var bill_name = user.linkbd_username;
	console.log(bill_name);
//	console.log("调用sendMessage发送前的状态:"+ws.readyState)
 	var obj = {
		"bill_no": onlyCode,
		"bill_user": bill_user,
		"bill_name": bill_name,
		"fbill_no": groupCode,
		"bill_title": chatMen,
		"cc_user": groupCode,
		"bill_context": text.content,
		"bill_com": teamBillCom,
		"bill_date": getTime,
		"bill_task": "d_new",
		"node_qty": "0",
		"bill_dept": "",
		"link_next": "",
		"bill_ipaddr": "",
		"bill_gpsaddr": "",
		"bill_text": "",
	}
	var datas = JSON.stringify(obj);
//	console.log("发送前状态:"+ws.readyState);
	ws.send(datas); 
//	console.log("发送一条："+JSON.stringify(datas))
	// 存入数据库
	/*
	 * 1. 查询vdim101表有没有与这个人的对话
	 * 2. 有, 打开vdim102,增加这行记录
	 *    无, 在vdim101创建新记录, 然后打开vdim102,增加这行记录
	 */
	var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
	usersDB.transaction(function (tx) {
 		var key101 = "(bill_no, fbill_no, cc_user, bill_user, bill_context, bill_date, bill_dept, bill_title, link_lnext, bill_com)";
		var key102 = "(bill_no, bill_user, bill_name, fbill_no, bill_title, cc_user, bill_context, bill_com, bill_date, bill_task, node_qty, bill_dept, link_next,  bill_ipaddr, bill_gpsaddr, bill_text )";
		tx.executeSql('SELECT * FROM vdim101 WHERE fbill_no = "'+groupCode+'"', [], function (tx, results) {
			if (results.rows.length == 0) {
				var val101 = '("'+getDataCode("vdim101")+'","'+groupCode+'","'+groupCode+'","'+bill_user+'","'+text.content+'","'+getTime+'","","'+chatMen+'","vdim102_list","'+teamBillCom+'")';
				usersDB.transaction(function (tx) {
				    tx.executeSql('INSERT INTO vdim101 '+ key101+' VALUES ' + val101 +'');
				});
//				console.log("点击发送，101中无这个对话！新增！");
//				console.log("发送101，新增："+val101);
				show101(); 
				var val102_new = '("'+onlyCode+'", "'+bill_user+'", "'+bill_name+'", "'+groupCode+'", "'+chatMen+'", "'+groupCode+'", "'+text.content+'", "'+teamBillCom+'", "'+getTime+'", "d_new", "0", "","","","","")'
//				console.log("第一条："+val102_new);
				usersDB.transaction(function (tx) {
				    tx.executeSql('INSERT INTO vdim102 '+ key102+' VALUES ' + val102_new +'');
				});
			}else {
				usersDB.transaction(function(tx) {
				    tx.executeSql('UPDATE vdim101 SET bill_context="'+text.content+'" WHERE fbill_no="'+groupCode+'" AND bill_user = "'+bill_user+'"');
				    tx.executeSql('UPDATE vdim101 SET bill_date="'+getTime+'" WHERE fbill_no="'+groupCode+'" AND bill_user = "'+bill_user+'"');
				});
//				console.log("点击发送，101中有这个对话！更新！");
				show101(); 
				var val102 = '("'+onlyCode+'", "'+bill_user+'", "'+bill_name+'", "'+groupCode+'", "'+chatMen+'", "'+groupCode+'", "'+text.content+'", "'+teamBillCom+'", "'+getTime+'", "d_new", "0", "","","","","")'
//				console.log("第二条："+val102);
				usersDB.transaction(function (tx) {
				    tx.executeSql('INSERT INTO vdim102 '+ key102+' VALUES ' + val102 +'');
				});
				return;
			}
		}, null);
	});
	
}

function bindMsgList() {
	//绑定数据:
	/*tp.bind({
		template: 'msg-template',
		element: 'msg-list',
		model: record
	});*/
	//页面面板上的信息  msg-template 模板  record 
	// console.log("ui.areaMsgList")
	// console.log(ui.areaMsgList)
	if(typeof(template) != "undefined") {
		ui.areaMsgList.innerHTML = template('msg-template', {
			"record": record
		});
		//
		var msgItems = ui.areaMsgList.querySelectorAll('.msg-item');
		[].forEach.call(msgItems, function(item, index) {
			item.addEventListener('tap', function(event) {
				msgItemTap(item, event);
			}, false);
		});
		//		imageViewer.findAllImage();
		ui.areaMsgList.scrollTop = ui.areaMsgList.scrollHeight + ui.areaMsgList.offsetHeight;
	};
};
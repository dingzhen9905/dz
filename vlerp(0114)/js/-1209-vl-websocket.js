//var wsUrl = "ws://192.168.11.204:8808/vl8-web/im/"+useName;
//var wsUrl = "ws://101.201.238.199:8080/vl8-web/im/"+useName;18612779214
//var user = JSON.parse(vlUtils.getStorage('user'));
//var useName = user.bill_no;
//var wsUrl = "ws://101.201.238.199:8080/vl8-web/im/"+useName;
//var wsUrl = "ws://192.168.3.39:8808/vl8-web/im/"+userbillNo;
//var ws;
//alert("执行websocket包js");
var record = []; //这个聊天信息  初始化。
var heartCheck = {
	timeout: 300000, //60ms
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function() {
		//  	alert(this.timeoutObj)
		//  	alert(this.serverTimeoutObj);
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);　　　　
		this.start();
	},
	start: function() {
		var self = this;
		console.log(new Date());
		this.timeoutObj = setTimeout(function() {
			console.log(ws.readyState)
			ws.send("test");
			console.log(ws.bufferedAmount)
			console.log(new Date());
			self.serverTimeoutObj = setTimeout(function() {
				ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
			}, self.timeout)
		}, this.timeout)
	}
}
 
if(typeof(template) != "undefined") {
	template.config('escape', false);
}


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
//	alert("调用show101")
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
//		alert(type);
		
		ws = new WebSocket(wsUrl);
		initEventHandle();

	} catch(e) {
		//TODO handle the exception
		reconnect(wsUrl);
	}

}

function initEventHandle() {
	ws.onopen = function() {
		console.log("open打开连接")
//		heartCheck.start();
	};
	ws.onclose = function() { 
		console.log("ws.onclose关闭连接");
		if(typeof(wsUrl) == "undefined") {
			var user = JSON.parse(vlUtils.getStorage('user'));
			var useName = user.bill_no;

//			var wsUrl = "ws://101.201.238.199:8080/vl8-web/im/" + useName;
			var wsUrl = "ws://192.168.3.39:8808/vl8-web/im/"+userbillNo;
//			var wsUrl = "ws://192.168.11.204:8808/vl8-web/im/"+useName;

		}
		
		setTimeout(function(){
			reconnect(wsUrl);
		},60000)
		
	};
	ws.onerror = function() {
		console.log("ws.onerror连接出错");
		if(typeof(wsUrl) == "undefined") {
			var user = JSON.parse(vlUtils.getStorage('user'));
			var useName = user.bill_no;
			var wsUrl = "ws://101.201.238.199:8080/vl8-web/im/" + useName;
//			var wsUrl = "ws://192.168.11.204:8808/vl8-web/im/"+useName;
		}
		
		setTimeout(function(){
			reconnect(wsUrl);
		},60000)
		 
	};

	ws.onmessage = function(message) {
//		if(typeof message == "object"){
//			 alert(JSON.stringify(message))
//			 return;
//		}
		console.log(JSON.stringify(message))
//		if(message == "forcedReturn") {
//			alert("当前账号在另一台设备登录，强制退出当前应用");
//			return;
//		}
//		alert("---------------");
//		heartCheck.reset();//心跳检测
		console.log("调用了onmessage收到消息了");
		var data = JSON.parse(message.data);
		var obj = data.msg[0]; //读取到的消息obj
		console.log(JSON.stringify(obj)); 
		var information = obj.bill_context;
		var imfbill_no = obj.fbill_no;
		var AccImBillNo = obj.bill_user;
		 var aaa =obj.bill_name;
//		alert(information);
//检查图片是否已存在
alert(imfbill_no);
		var filename=imfbill_no+".png";
		var relativePath = "_downloads/Vldicon/" + filename;
        plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
            console.log("图片存在,直接设置=" + relativePath);
            //如果文件存在,则直接设置本地图片
        }, function(e) {
            console.log("图片不存在,联网下载=" + relativePath);
            //如果文件不存在,联网下载图片
            	var dtask = plus.downloader.createDownload( systemURL+"File/downloadFile?billNo="+imfbill_no, {filename:"Vldicon/"}, function ( d, status ) {
				// 下载完成
				if ( status == 200 ) { 
					console.log("服务器请求图片");
//			 		 var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
//			 		 return sd_path;
				} 
			});
   			dtask.start(); 
        });
		if(!vlUtils.isnull(information)) {
			var ws = plus.webview.currentWebview();
//			alert("当前Webview窗口：" + ws.getURL());
//			alert("当前Webview窗口：" + ws.getID());
			var pw =plus.webview.getTopWebview();
			if(pw.getURL().indexOf("vdim102_list.html") > -1 && pw.getTitle()==imfbill_no) {
				var filename=imfbill_no+".png";
				var relativePath = "_downloads/Vldicon/" + filename;
				var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
				record.push({
					sender: 'others',
					type: 'text',
					src: sd_path,
					content: information
				});
				/*添加的方法*/
				bindMsgList();

			}
		}
		//writeFileJson101(bill_context,AccImBillNo);
//		alert("_documents/vlddata/vdim101.json");
		plus.io.resolveLocalFileSystemURL("_documents/vlddata/vdim101.json",
			function(entry) {
				entry.file(function(file) {
					var fileReader = new plus.io.FileReader();
					fileReader.readAsText(file, 'utf-8');
					fileReader.onloadend = function(evt) { //读文件操作完成时 
						var responseData = evt.target.result;
//						alert("登录连接im后台推送写文件vdim101.json");
						if(responseData.length == 0) {
							entry.createWriter(function(writer) {
								writer.onwrite = function(e) {
									show101(); //更新vdim101json
									plus.console.log("Write data success!");
								};
								// Write data to the end of file.
								obj.bill_user=JSON.parse(vlUtils.getStorage('user')).bill_no;//响应回来变更制单人
								obj.bill_title=aaa;
//								alert(aaa);
								var data1 = "[" + JSON.stringify(obj) + "]";
//								var str = JSON.stringify(data1);
								writer.seek(0);
								writer.write(data1);

							}, function(e) {
//								alert(e.message);
							});

						} else {
							var data1 = JSON.parse(responseData);
							var text = "";
							var flagnew=true;
							for(var i = 0; i < data1.length; i++) {
								var bill_no = data1[i]["fbill_no"];
								var bill_context = data1[i]["bill_context"];
								var selfUesrName = data1[i]["bill_user"];
								if((imfbill_no == bill_no) && (selfUesrName == JSON.parse(vlUtils.getStorage('user')).bill_no)) {
									flagnew=false;
									var getTime = new Date();
									data1[i]["bill_title"]=aaa;
									data1[i]["bill_context"] = information;
									data1[i]["bill_date"] = vlUtils.dateToString(getTime);
									entry.createWriter(function(writer) {
										writer.onwrite = function(e) {
											show101(); //更新vdim101json
											plus.console.log("Write data success!");
										};
										// Write data to the end of file.
										writer.seek(0);
										writer.write(JSON.stringify(data1));
										//													writer.write(JSON.stringify(data1));

									}, function(e) {
//										alert(e.message);
									});
								}
							}
							if(flagnew){
								entry.createWriter(function(writer) {
										writer.onwrite = function(e) {
											show101(); //更新vdim101json
											plus.console.log("Write data success!");
										};
										// Write data to the end of file.
										obj.bill_title=aaa;
										 obj.bill_user=JSON.parse(vlUtils.getStorage('user')).bill_no;//响应回来变更制单人
										data1.push(obj);
										writer.seek(0);
										writer.write(JSON.stringify(data1));
										//													writer.write(JSON.stringify(data1));

									}, function(e) {
//										alert(e.message);
									});
							}
						}
					}
				});
				//vdim102.json写102json
				plus.io.resolveLocalFileSystemURL("_documents/vlddata/vdim102.json",
					function(entry) {
						entry.file(function(file) {
							var fileReader = new plus.io.FileReader();
							fileReader.readAsText(file, "utf-8");
							fileReader.onloadend = function(evt) {
								var responseData = evt.target.result;
//								alert("登录连接im后台推送写文件vdim102.json");
//								alert(responseData.length);
								// 长度不等于 0 的时候 进行的读写操作
								if(responseData.length != 0) {
									plus.io.resolveLocalFileSystemURL(
										"_documents/vlddata/vdim102.json",
										function(entry1) {
											entry1.createWriter(function(writer) {
												writer.onwrite = function(e) {
													console.log("Write data success !");
												};
												//返回成功之后写入的数据
												console.log(obj + "写入");
//												obj.bill_user=JSON.parse(vlUtils.getStorage('user')).bill_no;
 												var data2 = ","+JSON.stringify(obj);
												writer.seek(writer.length);
												writer.write(data2);
											})
										},
										function(e) {
											mui.alert(e.message);
										})
								} else {
									plus.io.resolveLocalFileSystemURL(
										"_documents/vlddata/vdim102.json",
										function(entry1) {
											entry1.createWriter(function(writer) {
												writer.onwrite = function(e) {
													console.log("Write data success!  1021");
												};
//												obj.bill_user=JSON.parse(vlUtils.getStorage('user')).bill_no;
							    				var data2 = JSON.stringify(obj); 
 
												writer.seek(0);
												writer.write(data2);
											})
										},
										function(e) {
											mui.alert(e.message);
										})
								}
							}
						})
					},
					function(e) {
						mui.alert(e.message);
					})
			},
			function(e) {
				alert("Resolve file URL failed: " + e.message);
			}); 
	}

}

function reconnect(wsUrl) {
	//没连接上会一直重连，设置延迟避免请求过多
	console.log("ws.reconnect重新连接");
	  setTimeout(function () {
			createWebSocket(wsUrl);
	     }, 10000);
}

function sendMessage(text, groupCode) {
	/*唯一编号*/
//	alert("调用sendMessage")
//	alert(groupCode);
	var onlyCode = getDataCode("vdim102");
	var getTime = getDate();
	var user = JSON.parse(vlUtils.getStorage('user'));
	var bill_user = user.bill_no;
	var bill_name = user.linkbd_username;
	console.log(bill_name);
	var linkvd_userdept = user.linkvd_userdept;
	//提交的数据
//	alert(ws.readyState)
	var obj = {
		"bill_title": "",
		"bill_name": bill_name,
		"bill_no": onlyCode,
		"bill_task": "d_new",
		"fbill_no": groupCode,
		"cc_user": groupCode,
		"bill_user": bill_user,
		"bill_com": linkvd_userdept,
		"bill_dept": "",
		"link_next": "",
		"node_qty": "0",
		"bill_ipaddr": "",
		"bill_gpsaddr": "",
		"bill_context": text,
		"bill_date": getTime,
		"bill_text": ""
	}
	var datas = JSON.stringify(obj);
	console.log(datas);
	ws.send(datas); 
	//发送写文件
	//writeFileJson101(bill_context,AccImBillNo);
		//alert("_documents/vlddata/vdim101.json");
		plus.io.resolveLocalFileSystemURL("_documents/vlddata/vdim101.json",
			function(entry) {
				entry.file(function(file) {
					var fileReader = new plus.io.FileReader();
					fileReader.readAsText(file, 'utf-8');
					fileReader.onloadend = function(evt) { //读文件操作完成时 
						var responseData = evt.target.result;
						if(responseData.length == 0) {
							entry.createWriter(function(writer) {
								writer.onwrite = function(e) {
									show101(); //更新vdim101json
									plus.console.log("Write data success!");
								};
								// Write data to the end of file.
								var data1 = "[" + JSON.stringify(obj) + "]";
//								var str = JSON.stringify(data1);
								writer.seek(0);
								writer.write(data1);

							}, function(e) {
								alert(e.message);
							});

						} else {
							var data1 = JSON.parse(responseData);
							
							for(var i = 0; i < data1.length; i++) {
								var bill_no = data1[i]["fbill_no"];
								var bill_context = data1[i]["bill_context"];
								var selfUesrName = data1[i]["bill_user"];
								if((groupCode == bill_no) && (selfUesrName == JSON.parse(vlUtils.getStorage('user')).bill_no)) {
									var getTime = new Date();
									data1[i]["bill_context"] = text;
									data1[i]["bill_date"] = vlUtils.dateToString(getTime);
									entry.createWriter(function(writer) {
										writer.onwrite = function(e) {
											show101(); //更新vdim101json
											plus.console.log("Write data success!");
										};
										// Write data to the end of file.
										writer.seek(0);
										writer.write(JSON.stringify(data1));
										//													writer.write(JSON.stringify(data1));

									}, function(e) {
										alert(e.message);
									});
								}
							}
						}
					}
				});
				//vdim102.json写102json
				plus.io.resolveLocalFileSystemURL("_documents/vlddata/vdim102.json",
					function(entry) {
						entry.file(function(file) {
							var fileReader = new plus.io.FileReader();
							fileReader.readAsText(file, "utf-8");
							fileReader.onloadend = function(evt) {
								var responseData = evt.target.result;
//								alert("登录连接im后台推送写文件vdim102.json");
//								alert(responseData.length);
								// 长度不等于 0 的时候 进行的读写操作
								if(responseData.length != 0) {
									plus.io.resolveLocalFileSystemURL(
										"_documents/vlddata/vdim102.json",
										function(entry1) {
											entry1.createWriter(function(writer) {
												writer.onwrite = function(e) {
													console.log("Write data success !");
												};
												//返回成功之后写入的数据
												console.log(obj + "写入");
 												var data2 = ","+JSON.stringify(obj);
												writer.seek(writer.length);
												writer.write(data2);
											})
										},
										function(e) {
											mui.alert(e.message);
										})
								} else {
									plus.io.resolveLocalFileSystemURL(
										"_documents/vlddata/vdim102.json",
										function(entry1) {
											entry1.createWriter(function(writer) {
												writer.onwrite = function(e) {
													console.log("Write data success!  1021");
												};
												var data2 = JSON.stringify(obj); 
 
												writer.seek(0);
												writer.write(data2);
											})
										},
										function(e) {
											mui.alert(e.message);
										})
								}
							}
						})
					},
					function(e) {
						mui.alert(e.message);
					})
			},
			function(e) {
				alert("Resolve file URL failed: " + e.message);
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
	alert("ui.areaMsgList")
	alert(ui.areaMsgList)
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
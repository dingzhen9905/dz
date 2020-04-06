
// 全局定义一个APP的变量 


App = (function(root){
	
PlusAdaptor(root);
var Config = {};

function Log(msg){
	console.log(msg +";\n");
	App.logBuffer += msg;
}
function PlusAdaptor(root){
	if(root.navigator.userAgent.indexOf("Html5Plus")<0){
		console.log("Html5Plus is not exist");
		root.TAP = "click";
		root.RELEASE = "click"
		
		if(root.mui){
			root.mui.plusReady = function(cb){
//				window.onload = cb;
				cb();
			}
			root.mui.preload = {
				show: function(){}
			}
		}
		
		plus={
			webview:{
				currentWebview: function(){
					return{
						setStyle:function(){}
					}
				}
			},
			runtime:{
				appid: "appid_default"
			},
			device:{
				uuid:　"NoPlus"
			},
			push:{
				getClientInfo: function(){
					return{
						token:"",
						clientid:"clientid",
						appid:"",
						appkey:"",
						
					}
				},
				setAutoNotification: function(){},
				addEventListener: function(){},
			}
		}
	}
	else{
		root.TAP = "tap";
		root.RELEASE  = "release";
	}
}
//监听返回键的方法
function delayQuit(){
	var preTime = 0;
	mui.back = function() {
		var now = new Date().getTime();
		if (now - preTime > 2000) {
			preTime = now;
			mui.toast('再按一次退出应用');
		} else {
			plus.runtime.quit();
		}
	};
}
//本地存储
var Storage = {
	set: function(key,value){
		localStorage.setItem(key, JSON.stringify(value));
	},
	get: function(key){
		return JSON.parse(localStorage.getItem(key));
	},
	remove: function(key){
		localStorage.removeItem(key);
	}
}

//点击打开页面的方法以及传递的参数
function openWin(url, extras){
	
	return mui.openWindow({
		    url:url,
		    id:url,
		    styles:{
		   
		    },
		    extras:extras||null,
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
		      duration:100//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    },
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		    }
		})
}

return{
	Release: true,
	Log:Log,
	log:Log,
	delayQuit: delayQuit,
	ID: function(id){
		return mui("#"+id)[0];
	},
	BindTapEvent: function(id, e){
//  	this.ID(id).addEventListener(TAP, e, false);
	},
	Util:{},
	Storage: Storage,
	getRole:　function(){
		return Storage.get("status").role;
	},
	preventBack:　function(){
		this.back = mui.back;
		mui.back = function(){}
		console.log("App PreventBack")
	},
	recoveryBack: function(){
		mui.back = this.back;
	},
	openWin:openWin,
};	
}(window));


(function($){
	App.Util.displayProp = function (obj){    
	    var names=[];       
	    for(var name in obj){       
	       names.push(name);  
	    }  
	    console.log(names);  
	}
	var UserInfoKey = "UserInfo";
	App.User = {
		update: function(info){
			var UserInfo = App.Storage.get(UserInfoKey) || {};
			$.extend(UserInfo, info);
			App.Storage.set(UserInfoKey, UserInfo);
		},
		get: function(){
			return App.Storage.get(UserInfoKey);
		},
		delete: function(){
			App.Storage.remove(UserInfoKey);
		}
	}
}(mui));

(function(){
	var _status = App.Storage.get("status");
	if(_status == null){
		 App.Storage.set("status", {
		 	state:null,
		 	role: 'driver',
		 });
	}
//	else{
//		App.Storage.remove("status")
//	}
	
	
}());


(function(){
	var LOG_FILE = "/sdcard/log.txt"
	App.logBuffer = "";
	var saveBuffer;
	App.saveLog = function(){
		console.log(App.logBuffer)
		saveBuffer = App.logBuffer;
		App.logBuffer = ""
		writelog(saveBuffer)
	}
	function writelog(text){
		if(App.Release){return;}
		void plus.io.resolveLocalFileSystemURL(LOG_FILE, function(entry){
			entry.createWriter( function ( writer ) {
				w = writer;
				// fast forwards file pointer to end of file
				w.seek(w.length);
				w.onerror = function(e){
					alert( e.message );
				}
				
				w.write(text);
				w.onwrite = function(){
//					App.saveBuffer ="";
//					alert("write done")
				}
					
					
				}, function ( e ) {
					alert( e.message );
			} );
		},function(e){
			alert( e.message );
		});
	}
	
}());
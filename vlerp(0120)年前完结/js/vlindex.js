//var URL,VlCfg,VlUtils,VlAjax,VlDate,VlPage,VlIMDB,VlStore,VlDom,VlEdit,VlEvent,VlValid,VlProcess,VlTools;
var URL = (function(url){
	var _res = {
		urlmic  : ["www.miclink.cn"],
		urltime : ["http://www.vltime.cn/vl8-web/"],
                    //http://192.168.0.10:8083/vl8-web/
		url192  : ["http://172.168.14.15:8080/vl8-web/",   "192", "本地版本","http://172.168.14.15:8083/mypath/"],
		url03   : ["http://101.201.238.199:8080/vl8-web/", "03",  "测试版本", "http://101.201.238.199:8080/mypath/"],
		url21   : ["http://39.104.169.236:8080/vl8-web/",  "21",  "", "http://39.104.169.236:8080/mypath/"],

		urlImgA : "/storage/emulated/0/Android/data/www.vlerp.com/downloads/Vldicon/",
		urlImgH : "/storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/downloads/Vldicon/"
	}
	return _res[url];
})('url21');
var VlCfg  = {
	SYSURL : URL[0],			// 查询数据链接地址
	version  : ("0115.01_" + URL[1]+"."),	// 打包日期
	DBname : URL[2],			// 当前数据库/服务器的简称
	imgPath : URL[3],			// 图片路径
	imPath : (URL[0] + "im/")	// 聊天链接
};
var BILL_STATUS = {"L" : "待送审","S" : "待审核","Y" : "已审核","YF": "已失效"};
var BILL_BTN_STATUS = {
	"new" : {
		"show" : ['保存','送审'],
		"hide" : ['收回','删除']
	},
	"L" : {
		"show" : ['保存','送审','删除'],
		"hide" : ['收回']
	},
	"S" :  {
		"show" : ['收回'],
		"hide" : ['保存','送审','删除']
	},
	"Y" :  {
		"show" : ['收回'],
		"hide" : ['保存','送审','删除']
	}
}
var VlUtils = {
	// 深拷贝
	deepCopy : function (p, c) {
		var c = c || {};
		for (var i in p) {
			if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {};
					VlUtils.deepCopy(p[i], c[i]);
				} else {
				c[i] = p[i];
			}
		}
		return c;
	},
	// 防抖
	// 节流
	throttle : function (func, wait) {
	    let previous = 0;
	    return function() {
	        let now = Date.now();
	        let context = this;
	        let args = arguments;
	        if (now - previous > wait) {
	            func.apply(context, args);
	            previous = now;
	        }
	    }
	},
	//
	isnull: function (str) {//判断是否为空
        if (str == undefined) return true;
        if (str == "undefined") return true;
        if (str == null) return true;
        if (str == "null") return true;
        if(typeof(str)=="number"){
            return false;
        }
        if(typeof(str)=="string"){
            var str2=str;
            str = str2.replace(/(^\s*)|(\s*$)/g, "");
        }
        if (str == "") return true;
        return false;
  	},
	// 中文转码(解决中文的乱码问题)
	toUtf8: function (str) {
	    var out, i, len, c;
	    out = "";
	    len = str.length;
	    for (i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if ((c >= 0x0001) && (c <= 0x007F)) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
	            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	        } else {
	            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
	            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	        }
	    }
	    return out;
	} 
};

var VlDate = {
	// 获取当天时间
	get: function (now,type) {
        var now 	= now ? now : (new Date()),
        	year 	= now.getFullYear(),
        	month 	= now.getMonth() + 1,
        	day 	= now.getDate(),
        	hour 	= now.getHours(),
        	minute 	= now.getMinutes(),
        	second 	= now.getSeconds(),
        	obj, res;
        //
        month  	= month >= 10 ? month : ("0" + month);
        day  	= day >= 10 ? day : ("0" + day);
        hour  	= hour >= 10 ? hour : ("0" + hour);
        minute  = minute >= 10 ? minute : ("0" + minute);
        second  = second >= 10 ? second : ("0" + second);

        // 2019年7月12日 14点35分27秒
        obj = {
        	ym 		: (year + "" + month), 					// 201907
	        ymd 	: (year + "" + month + "" + day),		// 20190712
	        hm 		: (hour + "" + minute), 				// 1435
	        _ymd01 	: (year + "-" + month + "-01"), 		// 2019-07-01 // 本月1日
	        _ymd 	: (year + "-" + month + "-" + day), 	// 2019-07-12
	        _hms 	: (hour + ":" + minute + ":" + second), // 14:35:27
	        // 2019-07-12 14:35:27
	        _ymdhms : (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second), 
        }
        // res = arguments[1] ? (obj[arguments[1]] ? obj[arguments[1]] : obj) : obj;
        res = arguments[1] && obj[arguments[1]] || obj;
        return res;
		},
	// 时间差
	//计算天数差的函数，通用
    diff: function(sDate1,  sDate2){
    	//sDate1和sDate2是xxxx-xx-xx格式   "2006-12-18"
    	var  aDate,  oDate1,  oDate2,  iDays;
    	aDate  =  sDate1.split("-");
    	oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
    	//转换为xx-xx-xxxx格式
    	aDate  =  sDate2.split("-");
    	oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
    	iDays  =  parseInt((oDate2  -  oDate1)  /  1000  /  60  /  60  /24);
    	//把相差的毫秒数转换为天数
    	return  iDays
    },
	// 判断时间大小
};
var VlPage = {
	// beforOpen
	beforeOpen : function (){
		var _args = arguments,
			_page;
		for(var i = 0; i < _args.length; i++){
			_page = plus.webview.getWebviewById(_args[i]);
			if(!VlUtils.isnull(_page)){
				plus.webview.hide(_page);
				plus.webview.close(_page);
			}
		}
	},
	// 返回指定的页面
	backToPage : function (parentview,childview){
		if(childview){
			var listview = plus.webview.getWebviewById(childview);
			listview.reload();
		}
		var plistview = plus.webview.getWebviewById(parentview);
			plistview.reload();
		var oldBack = mui.back;
	    mui.back = function(){
	    	var webview = plus.webview.getWebviewById(parentview);
	    	webview.show();
	    }
	    mui.back();
	},
	scrollToTop : function (id){
		var contentWebview = null;
		document.querySelector('header').addEventListener('doubletap', function() {
			if(contentWebview == null) {
				contentWebview = plus.webview.currentWebview().children()[0];
			}
			contentWebview.evalJS("mui('#"+id+"').pullRefresh().scrollTo(0,0,100)");
		});
	}
};
var VlIMDB = {
	create : function(bill_user){
		var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
		usersDB.transaction(function (tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS vdim101 (bill_no unique, fbill_no, cc_user, bill_user, bill_context, bill_date, bill_dept, bill_title, link_lnext, bill_com)');
		    tx.executeSql('CREATE TABLE IF NOT EXISTS vdim102 (bill_no unique, bill_user, bill_name, fbill_no, bill_title, cc_user, bill_context, bill_com, bill_date, bill_task, node_qty, bill_dept, link_next,  bill_ipaddr, bill_gpsaddr, bill_text )');
		});
	},
	insert : function(bill_user,db,val){
		var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
		var key101 = "(bill_no, fbill_no, cc_user, bill_user, bill_context, bill_date, bill_dept, bill_title, link_lnext,bill_com)";
		var key102 = "(bill_no, bill_user, bill_name, fbill_no, bill_title, cc_user, bill_context, bill_com, bill_date, bill_task, node_qty, bill_dept, link_next,  bill_ipaddr, bill_gpsaddr, bill_text )";
		if(db == "vdim101"){
			usersDB.transaction(function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS vdim101 (bill_no unique, fbill_no, cc_user, bill_user, bill_context, bill_date, bill_dept, bill_title, link_lnext,bill_com)');
			    tx.executeSql('INSERT INTO '+ db + key101 +' VALUES ' + val +'');
			});
		}
		if(db == "vdim102"){
			usersDB.transaction(function (tx) {
		    	tx.executeSql('CREATE TABLE IF NOT EXISTS vdim102 (bill_no unique, bill_user, bill_name, fbill_no, bill_title, cc_user, bill_context, bill_com, bill_date, bill_task, node_qty, bill_dept, link_next,  bill_ipaddr, bill_gpsaddr, bill_text )');
			    tx.executeSql('INSERT INTO '+ db + key102 +' VALUES ' + val +'');
			});
		}

	},
	delete    : function(bill_user,db,bill_no){
		var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
		usersDB.transaction(function(tx) {
		    tx.executeSql('DELETE FROM '+db+' WHERE bill_no="'+content+'');
		});
	},
	update : function(bill_user,content,groupCode){
		var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
		usersDB.transaction(function(tx) {
		    tx.executeSql('UPDATE vdim101 SET bill_context="'+content+'" WHERE fbill_no="'+groupCode+'"');
		});
	},
	read   : function(bill_user,condition,notzero,zero){
		var usersDB = openDatabase(bill_user, '1.0', 'usersDB', 2 * 1024 * 1024);
		usersDB.transaction(function (tx) {
			tx.executeSql(condition, [], function (tx, results) {
				if (results.rows.length == 0) {
					// 查询后，查到相应的数据
					notzero();
				}else {
					// 查询后，未查到相应的数据
					zero();
				}
			}, null);
		});
	},
};
var VlStore = {
	get : function (key) {
		return localStorage.getItem(key);	
	},
	set : function (key, value) {
		if(typeof value === "object" && typeof value == null){
			value = JSON.stringify(value);
		}
		localStorage.setItem(key,value);
	},
	clear: function() {
		localStorage.clear();
	},
	remove: function (key) {
		localStorage.removeItem(key);
	},
	size : function (){
		var size = 0;
        for(var i in localStorage) {
            if(localStorage.hasOwnProperty(i)) {
                size += localStorage.getItem(i).length;
            }
        }
        console.log('当前已用存储：' + (size / 1024).toFixed(2) + 'KB');
	},
	pGet : function (key) {
		return plus.storage.getItem(key);	
	},
	pSet : function (key, value) {
		if(typeof value === "object" && typeof value == null){
			value = JSON.stringify(value);
		}
		plus.storage.setItem(key,value);
	},
	pClear: function() {
		plus.storage.clear();
	},
	pRemove: function (key) {
		plus.storage.removeItem(key);
	},
};
var VlCooike = {
	get : function (){},
	set : function (){},
	getSessionId : function (){
		return plus.navigator.getCookie( VlCfg.SYSURL );
	},
	setSessionId : function (){
		// console.log(VlCfg.SYSURL)
		var _cookieSid = VlCooike.getSessionId(),// 后台设置的cookie
			_storageSid,	// 存储在本地的sessionid
			_setValue,		// 设置sessionid的值
			_date,			// seeionid的过期时间
			_url = VlCfg.SYSURL.split("vl8-web")[0];
		// console.log("登陆页重新存储cooike之前-后台的SESSION:"+_cookieSid)
		if(mui.type(_cookieSid) === "null"){
			_storageSid = VlStore.pGet("sessionid");
			_date 		= new Date().getDate() + 1;
			_setValue 	= 'JSESSIONID=' + _storageSid + '; expires=' + _date + '; path=/vl8-web';
			// console.log(_url);
			plus.navigator.setCookie( _url, _setValue );
		}
	},
	saveSessionId : function () {
		var _value = VlCooike.getSessionId().split("=")[1];
		// console.log(_value)
		VlStore.pSet("sessionid", _value);
	},
	clearSessionId : function () {
		plus.storage.removeItem("sessionid");
	}
};

var VlDom = {
	getId : function (a) {},
};

var VlEdit = {
	getValue : function (normalData,billTextData) {
		/**
		* @param normalData = {h:{},v:{},c:{}}  	// 标准字段
		* @param billTextData={h:{},v:{},c:{}}		// 大字段,如果大字段是object类型的话就传，不是则不传
		* h 页面上需要通过innerHTML获取的，为{}
		* v 页面上需要通过value获取的，为{}
		* c 页面上的单选，注意需要将input的name设为字段名
		* @return
		*/
		var getData = {},
			itemh,
			itemv,
			defaultV;
		for(var i in normalData.h){
			itemh = document.getElementById(i);
			getData[i] = itemh ?  itemh.innerHTML : defaultV;
		}
		for(var k in normalData.v){
			itemv =  document.getElementById(k)
			getData[k] = itemv ? itemv.value : defaultV;
		}
		for(var j in normalData.c){
			getData[j] = VlUtils.isnull(jQuery("input[name='"+j+"']:checked").val())?normalData.c[j]:jQuery("input[name='"+j+"']:checked").val();
//			getData[j] = VlUtils.isnull(jQuery("input[name='"+j+"']:checked").val())?normalData.c[j]:jQuery("input[name='"+j+"']:checked").val();
		}
//		var len = mui(".roleType").length;
//		for(var i = 0; i < len; i++) { // 判断是否选择
//			if(mui(".roleType")[i].checked) {
//				var billbflow = mui(".roleType")[i].value;
//			}
//		}
		// 处理大字段
		var billtext;
		if(arguments[1]){
			billtext = VlEdit.getValue(arguments[1]);
			var textArr = [];
			textArr[0] = billtext;
			getData.bill_text = JSON.stringify(textArr);
		}
		// 处理date字段？
		// 处理node字段？
		var aNode = ["node_amt", "node_namt", "node_qty", "node_nqty", "node_price", "node_nprice", "node_rate", "node_nrate"];
		for(var n = 0; n < aNode.length; n ++){
			var _node = aNode[n];
			if(getData[_node] == "" || typeof getData[_node] === 'string'){
				getData[_node] = getData[_node] == Number(getData[_node]) ? Number(getData[_node]) : 0;
			}
		}
		return getData;
	},
	setValue : function (data,normalData,billTextData) {
		for(var i in normalData.h){
			itemh = document.getElementById(i);
			itemh && (itemh.innerHTML = typeof data[i] === 'undefined' ? "" : data[i]);
		}
		for(var k in normalData.v){
			itemv = document.getElementById(k);
			if(itemv){
				if(typeof data[k] === 'undefined' ){
					itemv.value = "";
				}else{
					itemv.value = k.indexOf('date') > -1 ?  data[k].slice(0,10) : data[k];
				}
			}
		}
		for (var j in normalData.c ){
			for (var a = 0 ; a < jQuery("input[name='"+j+"']").length; a++) {
				if(jQuery("input[name='"+j+"']").eq(a).val() == data[j]){
					jQuery("input[name='"+j+"']").eq(a).attr("checked",true);
					break;
				}
			}
		}
		// 处理大字段
		if(arguments[2]){
			var billtextValue;
			if(typeof(data.bill_text) == 'string'){
				billtextValue = JSON.parse(data.bill_text)[0];
			}else{
				billtextValue = data.bill_text[0];
			}
			VlEdit.setValue(billtextValue,billTextData);
		}
	},
	checkRequired : function () {            
		var check = true;
		var blankInputLens = mui(".requiredInput").length;
		for(var i = 0; i < blankInputLens; i++) {
			    mui(".requiredInput")[i].value.trim()
			if(!mui(".requiredInput")[i].value || mui(".requiredInput")[i].value.trim() == "") {				
				var label = mui(".requiredInput")[i].previousElementSibling;
				mui.toast(label.innerText + "不允许为空");
				mui("#saveBtn").button('reset');
				check = false;
				return check;
			}
		}
		return check;
	},
	checkVaild : function () {},
	compareData: function (oldobj,newobj,billtextisObj) {//修改时对比新老数据
		var updateBilltext = [	// 修改时，请求的数据终的bill_text
			{},
			{}
		];	
        var arr=[];
        var obj={};
        for (var name in oldobj) {
        	if(name=="bill_text" && billtextisObj){		
        		updateBilltext[0].bill_text = [{}];
        		updateBilltext[1].bill_text = [{}];
        		if(typeof(newobj[name]) == "string" && newobj[name] != ""){
        			var ss=JSON.parse(newobj[name]);
        		}else{
        			var ss=newobj[name];
        		}
        		if(typeof(oldobj[name]) == "string" && newobj[name] != ""){
        			oldobj[name]=JSON.parse(oldobj[name]);
        		}
        		for(var linkkey in oldobj[name][0]){
        			if(oldobj[name][0][linkkey] != ss[0][linkkey] && (linkkey in ss[0])){
            			updateBilltext[1]["bill_text"][0][linkkey]=ss[0][linkkey];
            			updateBilltext[0]["bill_text"][0][linkkey]=oldobj[name][0][linkkey];
        			}
        		}
        			
        	}else{
        		obj[name]=oldobj[name];
//      		var arr=['bill_id','bill_date','bill_user','bill_com','bill_task'];
        		var arr=['bill_date','bill_user','bill_com','bill_task','bill_ndate'];
        		var flag=true;
        		for(var i=0;i<arr.length;i++){
        			if(name==arr[i]){
        				flag=false;
        			}
        		}
        		if(flag){
        			if(oldobj[name] != newobj[name]&& (name in newobj) ){
	            		updateBilltext[0][name]=oldobj[name];
	            		updateBilltext[1][name]=newobj[name];
            		}
        		} 
           }
           
        }
        if(billtextisObj){
        	updateBilltext[0]["bill_text"]=JSON.stringify(updateBilltext[0]["bill_text"]);
			updateBilltext[1]["bill_text"]=JSON.stringify(updateBilltext[1]["bill_text"]);
        }
		obj["bill_text"]=JSON.stringify(updateBilltext);
     	return obj;      
    }
};
var VlEvent = {
	add : function () {},
	remove : function () {},
	getTarget : function () {},
	getEvent : function () {},
	prevent : function (e) {
		e.preventBubble ? e.preventDefault() : window.event.returnValue == false;
	},
	stop : function (e) {
		window.event? window.event.cancelBubble = true : e.stopPropagation();
	},
};
var VlValid = {
	checkMobile : function (str){
		// 支持4-5位厂编（数字字母任意组合）、0或1开头的11位电话号码
		var reg1 = /^1\d{10}$/,
	    	reg2 = /^[A-Za-z0-9]{4}$/,
	    	reg3 = /^[A-Za-z0-9]{5}$/,
	    	reg4 = /^0\d{10}$/,
	    	res = reg1.test(str) || reg2.test(str) || reg3.test(str) || reg4.test(str);
	    if (res) {
	    	return true;
	    } else {
	        mui.toast("请输入正确的号码或者厂编");
	        return false;
	    }
	},
	checkUser : function (str){
		// 用户名格式 字母、数字、下划线组成，字母开头，4-16位
	    var re = /^[a-zA-z]\w{3,15}$/;
	    if(re.test(str)){
	        return true;
	    }else{
	        mui.toast("用户名格式不正确");
	        return false;
	    }
	},
	verifyCode:function(codeval){ // 校验码制是否符合校验规则
		var codetype = codeval; // 0402添加
		codetype = codetype.substring(0,1); // 0402添加
		// 目前: 0501
		// 内码14位：HTTP://VLET.CN/NHVPQNK25B2ANT
		// 外码14位：WHVP8AUH9L0U9Q
		// 箱码14位：XHVPFC3GMPFE2V
		if(codetype != "H" && codetype != "X" && codetype != "W" && codetype != "N"){
			mui.toast("001非标准码:非标准头!");// 开头不是H/N/X/W开头
			return;
		}else if((codetype != "X" || codetype != "W" || codetype != "N") && codeval.length != 14){
			mui.toast("001非标准码:非标准长度!");// 开头不是H/N/X/W开头
			return;
		}
		var codelens = codeval.length;

		// 是否符合验证正则
		var isCorrectCode = false;
		if(codeval){
			var prevDigit = codeval.substring(0,codelens-1);
			var checkDigit = codeval.substring(codelens-1);
			if(codeval.length != 14){
				if(ValidRule(prevDigit, "long")==checkDigit){
					isCorrectCode = true;
				}
			}else{
				if(ValidRule(prevDigit, "short")==checkDigit){
					isCorrectCode = true;
				}
			}

		}
		//
		function ValidRule(code,type) {
			var rules = {
				"long"  : [62,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"],
				"short" : [36,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
			}
			var arr = rules[type][1].split("");
			var num = rules[type][0];
			var codeArr = code.split("");
			// 遍历数组
			var sum = 0;
			for (var i = 0 ; i < codeArr.length; i++) {
				sum += codeArr[i].charCodeAt();
			}
			return arr[sum % num];
		}
		return isCorrectCode;
	},
	checkReg : function (type,val){
		var _json = {
			"reg1" : /(^-?)([0-9]{0,5}$)/,
			"reg2" : /[^0-9]{0,5}$/,
		}
		var _reg = /(^-?)([0-9]{0,5}$)/;
		return _reg.test(val);
//		function inputnum(obj,val){
//	        obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
//	        obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
//	        obj.value = obj.value.replace(/\.{2,}/g,""); //只保留第一个, 清除多余的
//	        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
//	        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
//	    }
	}
};
// 数据处理
var VlProcess = {
	cutout: function(code){
		var newcode = code;
		if(/([^\/]+)$/.test(code)){
		   var newcode=RegExp.$1;
		}
		return newcode;
	},
	sliceKeys : function (data){
		var oData = {};
		for(var k in data) {
			oData[k.slice(0, 2)] = data[k];
		}
		return oData;
	}
};
// 其他类工具（在mui提供的方法的基础上封装的，或者完全只与vl项目有关的）
var VlTools = {
	// 注释掉输出:
	cslog:function (parms){
		var flagcs=false;
		if(flagcs){
			console.log(parms);
		}
	},
	getBno : function  (code){
 		//业务编码+三级流程+年月+时间+标识  +3位随机码
	 	var date = VlDate.get(new Date());
//	 	console.log(JSON.stringify(date))
	    var onlyCode = code + "00_"
	     			+ date.ymd + "_"
	     			+ date.hm + VlTools.uuid("B",3,40) ;
	    return onlyCode;
	},
	uuid: function (prefix, len, radix) {//生成唯一的uuid
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return prefix + uuid.join('');
    },
    toast : function (txt, pos){
    	if(arguments[1]){
    		plus.nativeUI.toast(txt,{"verticalAlign":pos})
    	}else{
    		mui.toast(txt);
    	}
    },
    // 判断类型
	vlType: function (val){
		if(typeof val === 'undefined'){
			return 'undefined';
		}else{
			return mui.type(val);
		}
	},
	// 逐级联动
	pickData: function (opt) {
		var picker = new mui.PopPicker({
			layer: opt.level
		});
		picker.setData(opt.data);
		return picker;
	},
	actionSheet: function (opt) {
		plus.nativeUI.actionSheet({
			title: opt.title,
			cancel: "取消",
			buttons: opt.data
		}, function(e) {
			if(e.index != 0){
				return opt.cb(e.index - 1)
			}else{
				opt.cancel && opt.cancel();
			}
		});
	},
	getLocate: function (sCB, eCB) {
//		var p = plus.navigator.checkPermission('LOCATION');
//		var _obj = {
////			"authorized"	: "用户已授权使用此权限",
////			"undetermined"	: "未确定是否可使用此权限", //此时调用对应的API时系统会弹出提示框让用户确认
////			"notdeny"		: "用户未拒绝使用此权限", // 与denied相反，可能是"authorized"或者"undetermined"
//			"denied"		: "用户已拒绝使用此权限",
//			"unknown"		: "无法获取此权限状态", // 系统存在权限管理但无法查询
//			"unsupported"	: "程序不支持此权限"
//		}
//		_obj[p] && plus.nativeUI.alert('用户已拒绝使用此权限');
	
	  if(plus.os.name ==="Android"){
			var res;
			plus.geolocation.getCurrentPosition(function (p) {
				var _defaultPos = {"addresses" : "定位失败","coords":{"longitude":0,"latitude":0}};
				res = typeof p.addresses === "undefined" ?  _defaultPos : p;
				sCB && sCB(res);
			}, function (e) {
				res = "获取定位位置信息失败："+ e.message ;
				eCB && eCB(res)
			}, {geocode:true});
		}else{
			var res;
			var geolocation = new BMap.Geolocation();
			  geolocation.getCurrentPosition(function(r) {
			    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
				  sCB && sCB(r);  
			    } else {
				   res = "获取定位位置信息失败：";
				   eCB && eCB(res)
			    }
			  });
		}
	},
	setImg : function (id, path) {
		document.getElementById(id).setAttribute("src", path);
	},
	getImgSrc : function (id,path){
		return path;
	}
};
//
var VlAjax = {
	PORT : {
		// 操作
		"sendTask" 	: "Api/Task/sendTask",
		"sendTaskSkipLogon": "Api/Task/sendTaskClient",
		// 购物车
		"car"		: "Buy/car",
		"carDelete" : "Buy/deleteProduct",
		// 登入登出
		"login"	   	: "Login/login",
		"logout" 	: "Login/logout",
		// 验证码	
		"getMsgC"	: "Login/SMSValidation",	// 获取验证码
		"validMsgC" : "Login/Inspect",			// 校验验证码
		"setNewPW"	: "Login/SMSSavePassWord",	// 通过验证码修改密码（忘记密码）
		"updatePW"	: "Login/savePassWord",		// 修改密码
		"changePW"	: "Login/changePassword",	// 强制修改密码
		// 上传下载
		"app"		: "File/APP", // {billName:"",filePostfix:".apk"}
		"upload"	: "File/uploadFile",
		
		// 查询
		"active"	: "/Find/Ddata/activity",	// 动态查询
		"activeSkipLogon"	: "Find/Ddata/activitySkipLogon", // 动态查询、不校验登陆状态
		"detail"	: "Find/Ddata/findDetail",	// 主明细数据查询
		"carfind"	: "Find/Ddata/cartFindDetail", 	// 购物车
		"all"		: "Business/allocated",			// 通用查询接口
		"newAll"	: "Business/newAllocated",		// 自定排序字段、排序顺序、模糊查询字段
		"find"		: "Find/Ddata/find",			// 查询接口，目前多用于单条数据查询
		"fuzzy"		: "Find/Ddata/fuzzy",			// 模糊查询接口
		"querySkipLogon"	: "Api/unauthOperation/query",  // 不校验登陆状况？？
		// 用户帐户
		"balance"	: "Account/surplusAccount", // 查询余额
		//版本更新
		"newVersion" : "Login/newVersion"      //检查版本更新
	},
	HEADERS : {
		"json"	: {'Content-Type':"application/json"},
		"json2"	: {'contentType': "application/json;"},
		"json3"	: {'Content-Type': "application/json;charset=UTF-8"},
		"form"	: {'Content-Type':"application/x-www-form-urlencoded; charset=utf-8"}, // 登陆登出时用它
		"form2"	: {'contentType': "application/x-www-form-urlencoded; charset=utf-8"},
	},
	post : function (opt, data, sCb0, eCb, sCb1) {
		/**
		 * VlAjax.post();
		 * @param opt {object} {} ajax配置参数包含：接口、请求头设置、同步异步设置等
		 * @param data {object} {} 请求参数
		 * @param sCb0 {function}  请求成功，且通过后台校验，必传，不传则不做任何处理
		 * @param eCb0 {function}  请求出错，没有调后台接口，不传则调用默认处理函数
		 * @param eCb1 {function}  请求成功，但不通过后台接口校验，返回错误提示，不传则调用默认处理函数
		 * */
		/**
		 VlAjax.post({
		 	"port" 		: "接口简称", // 必传，不传则会提示："接口名无效～"
		 	"headers" 	: "请求头简称", // 不传则默认为json，即：{'Content-Type':"application/json"}
		 	"async" 	: "默认异部，如果需要同步，则传入false",
		 	"outPath" 	: "出错时，退到登录页的路径，默认是../login.html",
		 	"isFirst"	: "用于查询时，如果是上拉加载则传入false，不传默认为true",
			"extras"    : "额外的参数，对象形式"，以后outPath、isFirst都可以在此传入
		 })
		*/
		// 参数的处理
		// console.log(JSON.stringify(data))
		var _typeAjaxParam = typeof data;
		if( _typeAjaxParam !== "object"){
			alert("传入的请求参数无效～");
			return;
		}else{
			var _opt = VlAjax.dealPostParams(opt);
			if(_opt){
				// console.log(JSON.stringify(_opt))
				VlAjax.sendAJAX(_opt, data, sCb0, eCb, sCb1);
			}else{
				alert("接口名无效～");
				return;
			}
		}
		
	},
	get : function () {},
	sendAJAX : function (opt, data, sCb0, eCb, sCb1) {
		// console.log(JSON.stringify(opt))
		mui.ajax({
			url 	: (VlCfg.SYSURL + opt["port"]),
			data	: data,
			dataType: 'json', 	//服务器返回json格式数据
			type	: 'post', 	//HTTP请求类型
			beforeSend: function() {VlAjax.checkNetState();},// 检查网络链接状态
			timeout	: 60000, 	//超时时间设置为10秒
			async	: opt["async"],   // async(是否异部) :  false(不异步=同步), true(异步)
			headers	: opt["headers"],
			success	: function(data) {
				// console.log("success:"+JSON.stringify(data));
				switch (data.code){
					case 0:
					case '0':
						sCb0 && sCb0(data, opt["isFirst"], opt["extras"]);
						break;
					case 1:
					case '1':
						// console.log("code1:"+JSON.stringify(data));
						if(sCb1){
							sCb1(data)
						}else {
							VlAjax.sCBCode1(data.error_code,data.error_description,opt["outPath"])
						}
						break;
					default:
						break;
				}
			},
			error	: function(xhr, type, errorThrown) {
				if(eCb){
					eCb(xhr, type, errorThrown);
				}else{
					VlAjax.errorCB(xhr, type, errorThrown);
				}
			}
		});
	},
	dealPostParams : function (opt) {
		var _PORT = VlAjax.PORT,
			_HEADERS = VlAjax.HEADERS,
			_oprtShortName = opt.port;
		if(typeof _oprtShortName === 'undefined'){
			return false;
		}else{
			var _port = _PORT[opt.port],
				_headers = typeof opt.headers === 'undefined' ?  _HEADERS["json"] : _HEADERS[opt.headers],
				_async = typeof opt.async === 'undefined' ?  true : opt.async, // 默认异部// 保存需要同步
				_extras = typeof opt.extras === 'undefined' ? {} : opt.extras,
				_isFirst, _outPath;
				if(typeof opt.isFirst === 'undefined'){
					_isFirst = typeof _extras.isFirst === 'undefined' ?  true : _extras.isFirst; // 默认true// 上拉加载需要传入false
				}else{
					_isFirst = opt.isFirst;
				}
				if(typeof opt.outPath === 'undefined'){
					_outPath = typeof _extras.outPath === 'undefined' ? "../login.html" : _extras.outPath;
				}else{
					_outPath = opt.outPath;
				}
				// _isFirst = typeof opt.isFirst === 'undefined' ?  true : opt.isFirst, // 默认true// 上拉加载需要传入false
				// _outPath = typeof opt.outPath === 'undefined' ? "../login.html" : opt.outPath;
				// console.log(_headers)
			return {
				"port" 		: _port,
				"headers" 	: _headers,
				"async" 	: _async,
				"outPath" 	: _outPath,
				"isFirst"	: _isFirst,
				"extras"	: _extras,
			}
		}
	},
	rqsOneBill : function (opt, sCB0, eCB, sCB1){
		/**
		 * 请求单条数据，一般用在详情页
		 * @opt {Object}
		 */
		/**
		 VlAjax.rqsOneBill({
		 	"name" 		: "要查询的表名，一般为bill_no的前七位，如果不传，则自动取bill_no的前七位", 
		 	"bill_no" 	: "查询的单据，必传", 
		 	"bill_com" 	: "单据的单位/当前登陆单位"
		 })
		*/
		if(typeof opt.bill_no === "undefined"){
		   alert("请传入单据号~");
		   return;
		}
		var p = {
			name		: opt["name"] ? opt["name"] : opt["bill_no"].slice(0,8),    
			bill_task	: "L,S,Y,YF",
			bill_no		: opt["bill_no"],
			bill_com	: opt["bill_com"], 
			currentPage	: 1,
			pageSize	: 1, 
			paramText	: "",
		}
		VlAjax.post({"port": "find"}, p , sCB0, eCB, sCB1);
	},
	getImgPath : function (name,file){
		// http://101.201.238.199:8080/mypath/Vldicon/vdvc101.png
		var arr = ["vdsa402"];//
		var type = ["vdsa402"]
		var _file = arr.indexOf(file) === -1 ? "Vldicon/" : "Vlbfile/";
		var _fix = arr.indexOf(file) === -1 ? ".png" : ".jpg";
		return (VlCfg.imgPath + _file + name + _fix);
	},
	getImgPathmen : function (name,file){
		// http://101.201.238.199:8080/mypath/Vlhfile/vdvc101.png
		var _file ="Vlhfile/";
		var _fix = ".png";
		return (VlCfg.imgPath + _file + name + _fix);
	},
	dlIcon: function (name, id, sCBfun) {// 创建下载任务保存小图片
		var filename= name+".png",
			relativePath = "_downloads/Vldicon/" + filename,	// 本地路径
			resURL = VlCfg.SYSURL +"File/downloadFile?billNo="+ name +"&filePostfix=.png";
        plus.io.resolveLocalFileSystemURL(relativePath, isExist, notExist);
        function isExist(entry) {
           	var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
			if(typeof sCBfun === "undefined"){
				sCBfun(id, sd_path);
			}else{
				VlTools.setImg(id, sd_path)
			}
        }
        function notExist(e) {
            var dtask = plus.downloader.createDownload( resURL, {filename:"_downloads/Vldicon/"}, function ( d, status ) {
				if ( status == 200 ) {
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
					var patharr= sd_path.split(".png")
					var arrlast= sd_path.split(".png").length-1;
					if(VlUtils.isnull(patharr[arrlast])){
						if(typeof sCBfun === "undefined"){
							sCBfun(id, sd_path);
						}else{
							VlTools.setImg(id, sd_path)
						}
					}else{
						console.log("怎么设置")
					}
				} 
			});
   			dtask.start(); 
        }
	},
	dlApk : function (param){
		return (VlCfg.SYSURL + "File/APP?billName=" + param + "&filePostfix=.apk");
	},
	reLogin : function () {
		// 获取session
		var now = new Date(),
			date = VlDate.get(new Date(), "_ymdhms"),
			dateStr = hex_md5(date),
			userInfo = JSON.parse(VlStore.pGet('user')),
			tel = userInfo.usertel,
			pw = userInfo.pwMd5 + dateStr,
			sysAlias = userInfo.com_linkvd_userCom,
			mobile = plus.os.name,
			_v,sysAlias;
		if(plus.runtime.version.slice(0,1) == "8" || plus.runtime.version.slice(0,1) == 8) {
			_v = plus.runtime.version; // 展示当前版本号
		} else {
			_v = "8.2045";
		}
		var _p = {
			username: tel,
			password: pw,
			dateTime: date,
			code	: "2",
			version	: _v,
			mobile	: mobile,
			system	: sysAlias
		}
		// 提交登陆的请求
		VlAjax.post({
			"port"	  : "login",
			"headers" : "form",
		},_p,sCBreLogin);
		function sCBreLogin(data){
			VlCooike.saveSessionId();
			var current = plus.webview.currentWebview();
			current.reload();
		}
	},
	backLoginPage : function (isLogout, outPath) {
		var _outPath = arguments[1] ? outPath : "../login.html"
		mui.openWindow({
			url: _outPath,
			id: "login.html",
			createNew:false
		})
		plus.storage.removeItem("user");
		plus.storage.removeItem("sessionid");
		plus.storage.removeItem("offilinetip");
		// VlStore.set("offilinetip", "0");
		var wvs = plus.webview.all(),
			_page, _pageId,
			ignorePages = isLogout ? ["HBuilder", "login.html", "logout.html"] : ["HBuilder", "login.html"]; 
		for(var i = 0; i < wvs.length; i++) { 
			_page = wvs[i];
			_pageId = wvs[i].id;
			if(ignorePages.indexOf(_pageId) === -1){
				plus.webview.hide(_page);
				// plus.webview.hide(_page,"none");
				plus.webview.close(_page,"none");
			}			
		}
		
	},
	checkNetState : function () {
		var network = true;
		if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
			network = false;
		}
		if(!network){
			mui.toast("诶~网络好像不太好~",{duration:"long"});
			return;
		}
	},
	sCBCode1 : function (errCode,msg,urlPath){
		console.log("code1:"+errCode+"，信息："+msg)
		plus.nativeUI.closeWaiting();
		switch (errCode){
			case "401": // 
				VlAjax.reLogin();
				break;
			case "403": //
				VlAjax.offlineTip(msg, urlPath);
				break;
			default : 
				mui.toast(( msg || "code1：诶，好像出错啦~" ));
				break;
		}
	},
	errorCB :  function (XMLHttpRequest, textStatus, errorThrown){
		plus.nativeUI.closeWaiting();
		console.log("vlindex-error:"+XMLHttpRequest.status);
		console.log("vlindex-error:"+XMLHttpRequest.readyState);
		console.log("vlindex-error:"+textStatus);  //总是返回 paraseeror,

		mui.toast("error:诶，可能网络不好，稍后再试吧!");
	},
	offlineTip : function(msg, urlPath){
		var tipStatus = VlStore.get("offilinetip");
		// console.log(tipStatus)
		// console.log(urlPath)
		if(tipStatus !== "1"){
			VlStore.set("offilinetip", "1");
			var btnArray = ['重新登录', '退出'];
			mui.confirm(msg, '下线通知', btnArray, function(e) {
				if(e.index == 0) {
					VlAjax.reLogin();
				} else {
					VlAjax.backLoginPage(false, urlPath);
				}
				VlStore.set("offilinetip", "0");
			});
			
		}
	}
};


var VlAjaxDl = {
	icon: function (name, id, sCBfun) {
		var filename= name+".png",
			relativePath = "_downloads/Vldicon/" + filename,	// 本地路径
			resURL = VlCfg.SYSURL +"File/downloadFile?billNo="+ name +"&filePostfix=.png";
	    plus.io.resolveLocalFileSystemURL(relativePath, isExist, notExist);
	    function isExist(entry) {
	       	var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
			if(typeof sCBfun === "undefined"){
				sCBfun(id, sd_path);
			}else{
				VlTools.setImg(id, sd_path)
			}
			
	    }
	    function notExist(e) {
	        var dtask = plus.downloader.createDownload( resURL, {filename:"_downloads/Vldicon/"}, function ( d, status ) {
				if ( status == 200 ) {
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
					var patharr= sd_path.split(".png")
					var arrlast= sd_path.split(".png").length-1;
					if(VlUtils.isnull(patharr[arrlast])){
						if(typeof sCBfun === "undefined"){
							sCBfun(id, sd_path);
						}else{
							VlTools.setImg(id, sd_path)
						}
					}else{
						console.log("怎么设置")
					}
				} 
			});
			dtask.start(); 
	    }
	},
	excel : function (opt) {
		var _path = (VlCfg.SYSURL + "File/downloadByExecl?"),
			_params = "",
			_url = _path;
		for(var k in opt){
			if(opt.hasOwnProperty(k)){
				_params += "&" + k + "=" + opt[k];
			}
		}
		_url += _params.slice(1);
		plus.nativeUI.showWaiting("文件下载中,请耐心等待!");
		VlAjaxDl.createDlFile(_url);
	},
	file : function (name){
		var _url = VlCfg.SYSURL + "/File/downloadSubsidiaryFile?billNo=" + name +"&bill_context=.pdf";
		plus.nativeUI.showWaiting("文件下载中,请耐心等待");
		VlAjaxDl.createDlFile(_url);
	},
	upadteApk : function (){
	},
	getApkDlPath : function (param){
		return (VlCfg.SYSURL + "File/APP?billName=" + param + "&filePostfix=.apk");
	},
	createDlFile : function (_url){
		var dtask = plus.downloader.createDownload(_url, {}, function(d, status) {
			if(d.state == 4 && status == 200) {
				var path = d.filename;
				plus.nativeUI.closeWaiting();
				mui.toast("文件下载完成~");
				plus.runtime.openFile( path, {}, function (err){
					mui.alert("文件打开失败:"+err.message);
				});
			} else {
				mui.alert('文件下载失败:' + status);
			}
		});
		dtask.start();
	}
};
var VlAjaxImgload={
	img : function (keys, filePaths){
		var _url = VlCfg.SYSURL + "File/uploadDiconFile";
		VlAjaxImgload.create({
			url : _url,
			title : "图片",
			filePaths : filePaths,
			keys : keys
		});
	},
	create : function (opt) {
		var task = null,
			_uploadOpt = {method: "POST", blocksize: 204800, priority: 100},
			_title = opt["title"] ? opt["title"] : "文件",
			_url = opt["url"],
			_filePaths = opt["filePaths"],
			_keys = opt["keys"]
		
		task = plus.uploader.createUpload(_url, _uploadOpt, completedCB);	
		for(var i = 0; i < _filePaths.length; i++){
			task.addFile(_filePaths[i], { key: _keys[i] }); 
		}
		task.start();

		// 当上传任务提交完成时触发，成功或失败都会触发。
		function completedCB(t, status) {

			console.log("上传大小：" + t.uploadedSize +"B   =" + t.uploadedSize / 1024 +"KB");
			console.log("文件大小：" + t.totalSize +"B   =" + t.totalSize / 1024 +"KB");
			console.log("上传信息:"+JSON.stringify(t));
			var _backInfo = t.responseText,
				_data;
			var isBackEndcbInfo =  _backInfo && mui.type(_backInfo) === "string" && (_backInfo.indexOf("{") > -1);
			if(isBackEndcbInfo){
				_data = JSON.parse(_backInfo);
				
				if(_data.code == "0"){
					plus.nativeUI.toast(_title+":"+_data.message, {
						'verticalAlign': "top"
					});
					//
				}else{
					//
					alert("code1：" + _data.error_description)
				}
			}else{
				if(status == 200) {
					plus.nativeUI.toast(_title+"上传成功~", {
						'verticalAlign': "top"
					});
				} else {
					alert(_title+"上传失败：" + (_backInfo || status))
				}
			}
		}
	},
}
var VlAjaxUpload = {
	img : function (keys, filePaths){
		var _url = VlCfg.SYSURL + "File/uploadImg";
		VlAjaxUpload.create({
			url : _url,
			title : "图片",
			filePaths : filePaths,
			keys : keys
		});
	},
	create : function (opt) {
		var task = null,
			_uploadOpt = {method: "POST", blocksize: 204800, priority: 100},
			_title = opt["title"] ? opt["title"] : "文件",
			_url = opt["url"],
			_filePaths = opt["filePaths"],
			_keys = opt["keys"]
			
		// 
		task = plus.uploader.createUpload(_url, _uploadOpt, completedCB);
		for(var i = 0; i < _filePaths.length; i++){
			task.addFile(_filePaths[i], { key: _keys[i] }); 
		}
		task.start();
		
		// 当上传任务提交完成时触发，成功或失败都会触发。
		function completedCB(t, status) {
			console.log("上传大小：" + t.uploadedSize +"B   =" + t.uploadedSize / 1024 +"KB");
			console.log("文件大小：" + t.totalSize +"B   =" + t.totalSize / 1024 +"KB");
			console.log("上传信息:"+JSON.stringify(t));
			var _backInfo = t.responseText,
				_data;
			var isBackEndcbInfo =  _backInfo && mui.type(_backInfo) === "string" && (_backInfo.indexOf("{") > -1);
			if(isBackEndcbInfo){
				_data = JSON.parse(_backInfo);
//				console.log(JSON.stringify(_data))
				if(_data.code == "0"){
					plus.nativeUI.toast(_title+":"+_data.message, {
						'verticalAlign': "top"
					});
			
				   
				}else{
					//
					alert("code1：" + _data.error_description)
					/*oData=_data.data				
					for(var k in oData){	
					oData[k.slice(0,2)]=oData[k]
					file = oData["失败"]+".jpg"
					var local_vdsa402newPath = '_doc/Vlbfile'; //
                 	plus.io.resolveLocalFileSystemURL( local_vdsa402newPath, function( entry ) {
                 		// 可通过entry对象操作test.html文件 
                 		entry.file( function(file){
                 			var fileReader = new plus.io.FileReader();
                 			alert("getFile:" + JSON.stringify(file));
                 			fileReader.readAsText(file, 'utf-8');
                 			fileReader.onloadend = function(evt) {
                 				alert("11" + evt);
                 				alert("evt.target" + evt.target);
                 				alert(evt.target.result);
                 			}
                 			alert(file.size + '--' + file.name);
                 		} );
                 	}, function ( e ) {
                 		alert( "Resolve file URL failed: " + e.message );
                 	} );		
				}
				if(_data.hasOwnProperty("message")){
					var oData=_data.data
					var errorimg=[]
					var errorurl=[]
					//图片上传失败 继续上传
					if(plus.os.name ==="Android"){
						setTimeout(function() {						
							for(var k in oData){
							oData[k.slice(0,2)]=oData[k]
							errorimg.push(oData["失败"])
							errorurl.push("/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/Vlbfile/"+oData["失败"]+".jpg")					        
							}
							VlAjaxUpload.img(errorimg,errorurl)
						}, 20000);
					}else{
						setTimeout(function() {
							for(var k in oData){
							oData[k.slice(0,2)]=oData[k]
							errorimg.push(oData["失败"])
							errorurl.push("_doc/Vlbfile/"+oData["失败"]+".jpg")    
							}
							VlAjaxUpload.img(errorimg,errorurl)
						}, 20000);
					}		
				 }*/
				 
				 /*	plus.io.resolveLocalFileSystemURL(path, function(entry) {
						var paths = entry.fullPath;
						setImg(idx, nvc801bno, paths, path);
						plus.nativeUI.closeWaiting("正在设置图片...");
					}, function(e) {
						plus.nativeUI.closeWaiting("正在设置图片...");
						alert("设置图片失败" + e.message);  
					});*/
			 }
			}else{
				if(status == 200) {
					plus.nativeUI.toast(_title+"上传成功~", {
						'verticalAlign': "top"     
					});
				} else {
					alert(_title+"上传失败：" + (_backInfo || status))
//					console.log(_title+"上传失败：" + (_backInfo || status))
				}
			}
		}
	},
	compress : function (){
		//
	}
};
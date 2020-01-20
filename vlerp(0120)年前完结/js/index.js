
var $$ = jQuery.noConflict();
var newUser = false;
//声明全局变量
window.systemURL = (function(url){
	var _res = {
		urlmic  : "www.miclink.cn",
		urltime : "http://www.vltime.cn/vl8-web/",
                  //http://192.168.0.17:8083/vl8-web/
		url192  : "http://172.168.14.15:8080/vl8-web/",		// 本地库
		url03   : "http://101.201.238.199:8080/vl8-web/",	// 测试库
		url21   : "http://39.104.169.236:8080/vl8-web/",	// 正式库
	}
	return _res[url];
})('url21');
// 发布日期
var betaVersion = "0115.01"; 
window.systemImgURL = (function(url){
	var _res = {
		urlImgA : "/storage/emulated/0/Android/data/www.vlerp.com/downloads/Vldicon/",
		urlImgH : "/storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/downloads/Vldicon/"
	}
	return _res[url];
})('urlImgA');
window.sysIm = (function(db){
	var res = {
		"im03" : "ws://101.201.238.199:8080/vl8-web/im/",
	}
	return res[db];
})("im03");
//手机的验证   11位数字，以1开头。
function checkMobile(str) {
	var  re = /^1\d{10}$/;
    var  res = /^[A-Za-z0-9]{4}$/;
    var  resu = /^[A-Za-z0-9]{5}$/;
    var  result=/^0\d{10}$/;
    if (re.test(str)) {
    	var numStatus = 1;
         return numStatus ;
    } else if(res.test(str)) {
    	var numStatus = 1;
        return numStatus ;
    } else if(resu.test(str)) {
    	var numStatus = 1;
        return numStatus ;
    }  else if(result.test(str)) {
    	var numStatus = 1;
        return numStatus ;
    } else {
        mui.toast("请输入正确的号码或者厂编");
        return false;
    }
//  //匹配国内电话号码(0511-4405222 或 021-87888822)
//	function istell(str){
//		var result=str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
//		if(result==null) return false;
//		return true;
//	}
}
	 
// 用户名格式 字母、数字、下划线组成，字母开头，4-16位
function  checkUser(str){
    var re = /^[a-zA-z]\w{3,15}$/;
    if(re.test(str)){
        return true;
    }else{
        mui.toast("用户名格式不正确");
        return false;
    }          
}	  
 //唯一标识的编写
 function  getDataCode(code){
 	//业务编码+三级流程+年月+时间+标识  +3位随机码
 	var date = new Date();
    var seperator1 = "_"; 
     onlyCode = code+"00"+seperator1+vlUtils.dateToString2(date).dateTime+seperator1+vlUtils.dateToString2(date).secondTime+vlUtils.uuid("B",3,40);
     return onlyCode;
 }
 
 /*获取当前时间*/
function  getDate(){
	var date = new Date();
 	var month = date.getMonth() + 1;
    var houer = date.getHours();
    var strDate = date.getDate();
    var getMinutes = date.getMinutes();
    var getSeconds =  date.getSeconds(); 
    var sp1 = "-";
    var sp2 = ":";
    var dateTime = date.getFullYear()+sp1+ month +sp1+strDate +" "+houer+sp2+getMinutes+sp2+getSeconds;	
    return dateTime;
}
//vlUtils包
var vlUtils={
	cutout: function(code){
		var newcode = code;
		if(/([^\/]+)$/.test(code)){
		   var newcode=RegExp.$1;
		}
		return newcode;
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
				if(vlUtils.Base62(prevDigit)==checkDigit){
					isCorrectCode = true;
				}
			}else{
				if(vlUtils.VerCode36(prevDigit)==checkDigit){
					isCorrectCode = true;
				}
			}
			
		}
		return isCorrectCode;
		
	},
	Base62:function(code){
		var arr ="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		// code 要转为二进制数组
		var codeArr = code.split("");
		// 遍历数组
		var sum = 0;
		for (var i = 0 ; i < codeArr.length; i++) {
			sum += codeArr[i].charCodeAt();
		}
		return arr[sum%62];
	},
	VerCode36: function(code) {
		var arr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		// code 要转为二进制数组
		var codeArr = code.split("");
		var sum = 0;
		for (var i = 0 ; i < codeArr.length; i++) {
			sum += codeArr[i].charCodeAt();
		}
		return arr[sum % 36];
	},
	contrastMD:function(olddata,newdata){
		var billText = [{},{}];	// 修改时，请求的数据终的bill_text
		// 对比之前先统一为json格式
		// 标准字段
		for(var key in olddata){
			if(key == "bill_text"|| key == "bill_date"){
				continue;
			}
			if(olddata[key]!= newdata[key]){
				billText[0][key] = olddata[key];		// 原值推入第一个{}
				billText[1][key] = newdata[key];		// 新值推入第一个{}
			}
		}
		// 确定大字段为obj
		if(typeof(olddata.bill_text) == "string" && olddata.bill_text != ""){
			olddata.bill_text = JSON.parse(olddata.bill_text)
		}
		if(typeof(newdata.bill_text) == "string" && newdata.bill_text != ""){
			newdata.bill_text = JSON.parse(newdata.bill_text)
		}
		billText[0].bill_text = [{}];
		billText[1].bill_text = [{}];
		// 遍历大字段
		for(var k in olddata.bill_text[0]){
			if(olddata.bill_text[0][k]!= newdata.bill_text[0][k]){
				billText[0].bill_text[0][k] = olddata.bill_text[0][k];
				billText[1].bill_text[0][k] = newdata.bill_text[0][k];
			}
		}
		billText[0].bill_text = JSON.stringify(billText[0].bill_text);
		billText[1].bill_text = JSON.stringify(billText[1].bill_text);
		return billText;		// 对比数据
		
	},
	UpdateMDData:function(olddata,newdata){
		var rqsdata = {main:"",detail:[]}; 	// 用于深克隆newdata得出新的数据
		rqsdata.main = vlUtils.deepCopy(olddata.main,rqsdata.main);	// 用于存放（变化对比数据【放在bill_text内】）并提交
		var MbillText = vlUtils.contrastMD(olddata.main,newdata.main);
		// 更改要提交的数据的主表的bill_text
		if(typeof(rqsdata.main.bill_text) != "string" || rqsdata.main.bill_text == "" ) {
			rqsdata.main.bill_text = JSON.stringify(MbillText);
		}
		rqsdata.main.bill_task = "d_save";
		
		if(olddata.detail.length == 0){	// 原来的明细为空，说明只有新增或者明细无变化 
			rqsdata.detail = newdata.detail;
			for(var i = 0; i < rqsdata.detail.length; i++){
				if(typeof(rqsdata.detail[i].bill_text) != "string"){
					rqsdata.detail[i].bill_text = JSON.stringify(rqsdata.detail[i].bill_text)
				}
				rqsdata.detail[i].bill_task = "d_new";
			}
		}
		else if(newdata.detail.length == 0){ // 新的明细为空，说明只有删除或者明细无变化 
			rqsdata.detail = olddata.detail;
			for(var i = 0; i < rqsdata.detail.length; i++){
				if(typeof(rqsdata.detail[i].bill_text) != "string"){
					rqsdata.detail[i].bill_text = JSON.stringify(rqsdata.detail[i].bill_text)
				}
				rqsdata.detail[i].bill_task = "d_delete";
			}
		}
		else{ // 新、旧明细表均不为空
			// 遍历明细表
			var dsave_billnoArr = [];
			var ddel_billnoArr = [];
			var dnew_billnoArr = [];
			// 修改项
			for(var i = 0; i < olddata.detail.length; i ++ ){
				for(var k = 0; k < newdata.detail.length; k ++ ){
					if(olddata.detail[i].bill_no == newdata.detail[k].bill_no){
						dsave_billnoArr.push(olddata.detail[i].bill_no);
						var DBillText = vlUtils.contrastMD(olddata.detail[i],newdata.detail[k]);
						olddata.detail[i].bill_text = JSON.stringify(DBillText);
						olddata.detail[i].bill_task = "d_save";
						rqsdata.detail.push(olddata.detail[i]);
						continue;
					}
				}
			}
			// 删除项
			for(var i = 0; i < olddata.detail.length; i ++ ){
				var ddelNum = 0;
				for(var k = 0; k < dsave_billnoArr.length; k ++ ){
					if(olddata.detail[i].bill_no != dsave_billnoArr[k]){
						ddelNum++
						if(ddelNum == dsave_billnoArr.length){
							ddel_billnoArr.push(olddata.detail[i].bill_no);
							// 直接推进请求参数的数组中
							if(typeof(olddata.detail[i].bill_text) != "string"){
								olddata.detail[i].bill_text = JSON.stringify(olddata.detail[i].bill_text);
							}
							olddata.detail[i].bill_task = "d_delete";
							rqsdata.detail.push(olddata.detail[i]);
						}
					}
				}
			}
			// 新增项
			for(var i = 0; i < newdata.detail.length; i ++ ){
				var dnewBum = 0;
				for(var k = 0; k < dsave_billnoArr.length; k ++ ){
					if(newdata.detail[i].bill_no != dsave_billnoArr[k]){
						dnewBum++
						if(dnewBum == dsave_billnoArr.length){
							dnew_billnoArr.push(newdata.detail[i].bill_no);
							// 直接推进请求参数的数组中
							if(typeof(newdata.detail[i].bill_text) != "string"){
								newdata.detail[i].bill_text = JSON.stringify(newdata.detail[i].bill_text);
							}
							newdata.detail[i].bill_task = "d_new";
							rqsdata.detail.push(newdata.detail[i]);
						}
					}
				}
			}
		}
		//0317
		if(typeof(rqsdata.main.cc_user) != "string"){
			rqsdata.main.cc_user = JSON.stringify(rqsdata.main.cc_user);
		}
		//0317
		for(var k = 0 ; k < rqsdata.detail.length; k++){
			if(vlUtils.isnull(rqsdata.detail[k].bill_ndate)){
				rqsdata.detail[k].bill_ndate = "1900-00-00 00:00:00";
			}
			if(vlUtils.isnull(rqsdata.detail[k].bill_edate)){
				rqsdata.detail[k].bill_edate = "1900-01-01 00:00:00";
			}
			if(vlUtils.isnull(rqsdata.detail[k].bill_bdate)){
				rqsdata.detail[k].bill_bdate = "1900-01-01 00:00:00";
			}
			if(typeof(rqsdata.detail[k].cc_user) != "string"){
				rqsdata.detail[k].cc_user = JSON.stringify(rqsdata.detail[k].cc_user);
			}
		}
		if(vlUtils.isnull(rqsdata.main.bill_ndate)){
			rqsdata.main.bill_ndate = "1900-01-01 00:00:00";
		}
		if(vlUtils.isnull(rqsdata.main.bill_edate)){
			rqsdata.main.bill_edate = "1900-01-01 00:00:00";
		}
		if(vlUtils.isnull(rqsdata.main.bill_bdate)){
			rqsdata.main.bill_bdate = "1900-01-01 00:00:00";
		}
		// 返回提交格式的数据
		return rqsdata;
	},
	deepCopy:function (p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　vlUtils.deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　 },
	isnullObejct: function (str) { //***修改的指令
        if (str == undefined) return true;
        if (str == null) return true;
        return false;
    },
	isUpdateObj: function (oldobj,newobj) {//提交的元数据
 		var arrbillKey=[];
        var updatabillKey={};//改变后大字段
        var originaldatalink=[];//改变前大字段
        var	arrupdatalink=[];//改变后大字段
        var updatalinkKey={};
       	var originalobj={};//改变前的标准字段
       	var originalbill={}//改变前大字段
        var arr=[];
        var obj={};
        for (var name in oldobj) {
        	if(name=="bill_text"){			
        		if(typeof(newobj[name]) == "string"){
        			var ss=JSON.parse(newobj[name]);
        		}else{
        			var ss=newobj[name];
        		}
        		if(typeof(oldobj[name]) == "string"){
        			oldobj[name]=JSON.parse(oldobj[name]);
        		}
        		for(var linkkey in oldobj[name][0]){
        			if(oldobj[name][0][linkkey] != ss[0][linkkey] && (linkkey in ss[0])){
            			updatabillKey[linkkey]=ss[0][linkkey];//改变后的字段
            			originalbill[linkkey]=oldobj[name][0][linkkey];//原来的大字段--
        			}
        			
        		}
        		arrupdatalink.push(updatabillKey);
        		originaldatalink.push(originalbill);
        			
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
            		updatalinkKey[name]=newobj[name];//改变后的标准字段
            		originalobj[name]=oldobj[name];//原来改变前标准字段--
            		}
        		} 	
           }
           
        }
        updatalinkKey["bill_text"]=JSON.stringify(arrupdatalink);
        originalobj["bill_text"]=JSON.stringify(originaldatalink);
        arrbillKey.push(originalobj);//原来数据
        arrbillKey.push(updatalinkKey);//修改的数据
        if(arrbillKey[0]["bill_context"] && typeof arrbillKey[0]["bill_context"] != "string" ){
        	arrbillKey[0]["bill_context"] = JSON.stringify(arrbillKey[0]["bill_context"]);
        }
		obj["bill_text"]=JSON.stringify(arrbillKey);
     	return obj;      
    },
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
		if(vlUtils.isnull(obj.bill_ndate)){
			obj.bill_ndate = "1900-01-01 00:00:00";
		}
		if(vlUtils.isnull(rqsData.bill_edate)){
			obj.bill_edate = "1900-01-01 00:00:00";
		}
		if(vlUtils.isnull(rqsData.bill_bdate)){
			obj.bill_bdate = "1900-01-01 00:00:00";
		}
     	return obj;      
    },
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
	downloadicon: function (strNo,imgId) {
		// 创建下载任务保存小图片
		var filename=strNo+".png";
		var relativePath = "_downloads/Vldicon/" + filename;
        plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {

            var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
			document.getElementById(imgId).setAttribute("src", sd_path); 

            //如果文件存在,则直接设置本地图片
        }, function(e) {

            //如果文件不存在,联网下载图片
//          	console.log("1111:"+systemURL+"File/downloadFile?billNo="+strNo+"&filePostfix=.png"+"==="+imgId)
            	var dtask = plus.downloader.createDownload( systemURL+"File/downloadFile?billNo="+strNo+"&filePostfix=.png", {filename:"_downloads/Vldicon/"}, function ( d, status ) {
//          	var dtask = plus.downloader.createDownload( systemURL+"File/downloadFile?billNo="+strNo+"&filePostfix=.png", {}, function ( d, status ) {
//          	var dtask = plus.downloader.createDownload( systemURL+"File/downloadFile?billNo="+strNo, {filename:"_downloads/Vldicon/"}, function ( d, status ) {
				// 下载完成
//				console.log(JSON.stringify(d));
				if ( status == 200 ) {
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
//					console.log("path:"+sd_path)
					var patharr= sd_path.split(".png")
					var arrlast= sd_path.split(".png").length-1;
					if(vlUtils.isnull(patharr[arrlast])){
						document.getElementById(imgId).setAttribute("src", sd_path);
					}
//					document.getElementById(imgId).setAttribute("src", sd_path);
				} 
			});
   			dtask.start(); 
        });
	},
		
		getloadImg: function (strNo) {// 创建下载任务保存小图片
			var imgadrr=systemImgURL+strNo+".png";
			if(!vlUtils.isHasImg(imgadrr)){//本地图片不存在，然后请求服务的图片
				var dtask = plus.downloader.createDownload( systemURL+"File/downloadFile?billNo="+strNo+"&filePostfix=.png", {filename:"Vldicon/"}, function ( d, status ) {
				// 下载完成
				if ( status == 200 ) { 
					setTimeout(function(){
					 return imgadrr;
				},200);
				} 
			});
 			dtask.start(); 
			}else{
			    return imgadrr;
			}
		},
		
		setStorage: function(key,val) {//保存session 
			plus.storage.setItem(key,val);
		},
		
		getStorage: function (key) {//获取
			var strongUser =  plus.storage.getItem(key);
			return strongUser;
		},
		dateToString: function (now) {
	        var year = now.getFullYear();
	        var month = (now.getMonth() + 1).toString();
	        var day = (now.getDate()).toString();
	        var hour = (now.getHours()).toString();
	        var minute = (now.getMinutes()).toString();
	        var second = (now.getSeconds()).toString();
	        if (month.length == 1) {
	            month = "0" + month;
	        }
	        if (day.length == 1) {
	            day = "0" + day;
	        }
	        if (hour.length == 1) {
	            hour = "0" + hour;
	        }
	        if (minute.length == 1) {
	            minute = "0" + minute;
	        }
	        if (second.length == 1) {
	            second = "0" + second;
	        }
	        var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	        return dateTime;
   		},
   		dateToString2: function (now) {
	        var year = now.getFullYear();
	        var month = (now.getMonth() + 1).toString();
	        var day = (now.getDate()).toString();
	        var hour = (now.getHours()).toString();
	        var minute = (now.getMinutes()).toString();
	        var second = (now.getSeconds()).toString();
	        if (month.length == 1) {
	            month = "0" + month;
	        }
	        if (day.length == 1) {
	            day = "0" + day;
	        }
	        if (hour.length == 1) {
	            hour = "0" + hour;
	        }
	        if (minute.length == 1) {
	            minute = "0" + minute;
	        }
	        if (second.length == 1) {
	            second = "0" + second;
	        }
	        var dateTime = year+month+day;
	        var secondTime=hour+minute;
	        var objdate={dateTime:dateTime,secondTime:secondTime}
	        return objdate;
   		},

		isHasImg: function (pathImg){//小图标文件是否存在
			var isExists;
   			 mui.ajax({
		        url: pathImg,
		        async:false,
		        type: 'HEAD', 
		        error: function () {
		            console.info("file not exists ");
		            isExists = 0;
		        },
		        success: function () {
		            console.info("file exists");
		            isExists = 1;
		 
		        }
		    });	
			    if (isExists == 1) {
			   
			        return true;
			    }
			    else {
			  		
			        return false;
			    }	 		 
		},
		uuid: function (prefix, len, radix) {//生成唯一的uuid
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
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
    
    // 用相对路径找绝对路径
    realPath: function(p){
    	plus.io.resolveLocalFileSystemURL(p, function(entry) {  
            var realPath = entry.fullPath;
	     	 return  realPath;
        }, function(e) {  
            console.log(e.message);  
	    });
	    //return  realPath;
    },
    //计算天数差的函数，通用     
    dateDiff: function(sDate1,  sDate2){    
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
	getLocation: function(){
		var loctInfo = {"code":"","info":""};
		plus.geolocation.getCurrentPosition(function(p) {
			loctInfo.code = "0";
			loctInfo.info = p;
			return lcotInfo;
		}, function ( e ) {
			loctInfo.code = "1";
			loctInfo.info = e;
			return lcotInfo;
		},{geocode:true});
	},
	// 注释掉输出:
	cslog:function (parms){
		var flagcs=false;
		if(flagcs){
			console.log(parms);
		}
	}
}; //vlUtils

var task = null;
//上传图片文件
function createUpload(uploadUrl,ondlyCode){
	var task = plus.uploader.createUpload( systemURL+"File/uploadFile");
	task.addFile( uploadUrl,{key:ondlyCode });
	task.setRequestHeader('Customer','CustomerValue/XXXXXXXXXXXX');
	task.addEventListener( "statechanged", onStateChanged, false );
	task.start();
}

	function onStateChanged( upload, status ) {
		if ( upload.state == 4 && status == 200 ) {
			// 获取上传请求响应头中的Content-Type值
			//console.log(task.getResponseHeader("Content-Type"));
			// 上传完成
			//	alert( "Upload success: 上传完成"  );
		}
	}
		//检测++
		//网络监测
		var flagnet=true;
		function wainshow() {
		    if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		    	if(flagnet){
		    		  mui.toast("网络异常，请检查网络设置！",{ duration:'100000'});
		{
		             var pop=new Popup({ contentType:4,isReloadOnClose:true,width:auto,height:auto});
		             pop.setContent("title","警告框示例alert");
		             pop.setContent("alertCon","alert对话框的内容");
		             pop.build();
		             pop.show();
		         }
		console.log("网络请检查网络设置");
		flagnet=false;
		    	}
		
		    } else{
		    	console.log("正常");
		    	mui.closePopups();
		    } 
		}
		//获取网速
 		var TrafficStats;  //TrafficStats类实例对象
        var total_data;    //总共接收到的流量
        var traffic_data;  //一定时间内接收到的流量
        var intervalId;    //定时器的返回值，用于控制计时器的停止
        document.addEventListener('plusready', function(){
            //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
            TrafficStats = plus.android.importClass("android.net.TrafficStats");
            if(!vlUtils.isnull(TrafficStats)){
           		total_data = TrafficStats.getTotalRxBytes();
            }
//          intervalId = window.setInterval("getNetSpeed()", 10000); 
//          window.setInterval("wainshow()",5000);
        });

        /**
         * 核心方法
         */
        function getNetSpeed(){
            traffic_data = TrafficStats.getTotalRxBytes() - total_data;
            total_data = TrafficStats.getTotalRxBytes();
//          document.getElementById("net").value = bytesToSize(traffic_data);
            console.log(bytesToSize(traffic_data));
        }

        //将byte自动转换为其他单位
        function bytesToSize(bytes) {
            if (bytes === 0) return '0 B/s';
            var k = 1000, // or 1024
                sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
           return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        } 
// ************************************************************************************
// 登录请求
function loginAgainAjax(urlid) {
	// 获取session
	var now = new Date();
	var user = JSON.parse(vlUtils.getStorage('user'));
	// 获取密码
	var usertel = user.usertel;
	var pwMd5 = user.pwMd5;
	var dateStr = hex_md5(vlUtils.dateToString(now));
	var ss = pwMd5 + dateStr;
	var linkvdUsercom = user.com_linkvd_userCom;
	var network = true;
	var mobile = plus.os.name,
		_v,sysAlias;
	if(plus.runtime.version.slice(0,1) == "8" || plus.runtime.version.slice(0,1) == 8) {
		_v = plus.runtime.version; // 展示当前版本号
	} else {
		_v = "8.2045";
	}
	var _p = {
		username: usertel,
		password: ss,
		dateTime: vlUtils.dateToString(now),
		code	: "2",
		version	: _v,
		mobile	: mobile,
		system	: linkvdUsercom
	}
	mui.ajax({
		url: systemURL + 'Login/login',
		type: 'post',
		beforeSend: function() {
			checkNetState();// 检查网络链接状态
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: 'json',
		data: _p,
		success: function(res) {					
			if(res.code==0){
				var current = plus.webview.currentWebview();
				current.reload();
			}
			if(res.code==1){
				mui.toast(res.error_description);
				return;
			} 
		},
		timeout: 60000,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error!");
		},
	})
}
//退出登录
function outLogining(urlPath) {
	mui.openWindow({
		url: urlPath,
		id: "login.html",
		createNew:false
	})
	vlUtils.setStorage("outLogin", "true");
	var wvs = plus.webview.all();
	plus.storage.removeItem("user");
	for(var i = 0; i < wvs.length; i++) { 
		if((wvs[i].id )!="HBuilder" && (wvs[i].id )!="login.html"){
			plus.webview.close(wvs[i],"none");
		}			
	}
}
// ajax返回code1时调用
function ajaxCode1(errCode,msg,urlPath){
	console.log("code1:"+errCode+"，信息："+msg)
	var istrue = vlUtils.getStorage('hadPrompted');
	switch (errCode){
		case "401": // 
			loginAgainAjax();
			break;
		case "403": //
			if(vlUtils.isnull(istrue) || istrue == "false"){
				vlUtils.setStorage('hadPrompted',"true");
				var btnArray = ['重新登录', '退出'];
				mui.confirm(msg, '下线通知', btnArray, function(e) {
					if(e.index == 0) {
						loginAgainAjax();
					} else {
						outLogining(urlPath);
					}
				});
				vlUtils.setStorage('hadPrompted',"false");
			}
			break;
		default : 
			mui.toast(( msg || "code1：操作失败~" ));
			break;
	}
}

function checkNetState(){
	var network = true;
	if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
		network = false;
	}
	if(!network){
		mui.toast("网络异常，请检查网络设置",{duration:"long"});
		return;
	}
}
// 聊天数据库的操作
var oprUserDB = {
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
	del    : function(bill_user,db,bill_no){
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
}


function CRUDajax(params,urlPath,successFn){
	mui.ajax(systemURL + 'Api/Task/sendTask', {
		data: params,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		beforeSend: function() {
			checkNetState(); // 检查网络链接状态
		},
		timeout: 10000, //超时时间设置为10秒
		async:false,    // async : 异步 =>  false: 不异步, true : 异步 
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			if(data.code == 0) {
//				if(vlUtils.isnull(params.bill_task)){
//					if(params.bill_task == ")
//				}else{
//				}
				mui.toast(data.message);
				if(successFn){
					successFn();
				}
			}
			if(data.code == 1) {
				ajaxCode1(data.error_code,data.error_description,urlPath)
			}
		},
		error: function(xhr, type, errorThrown) { 
			console.log("error!");
			if(type == "timeout") {
				mui.toast("请求超时");
			}
		}
	});	
}
var sendTaskData = {
	bill_no		: "",
	bill_id		: "",
	bill_name	: "",
	fbill_no	: "",
	link_next	: "",
	bill_bflow	: "",
	bill_wflow	: "",
	bill_title	: "",
	bill_context: "",
	bill_task	: "",
	bill_qtask	: "",
	cc_user		: "",
	bill_user	: "", 
	bill_dept	: "",
	bill_oppo	: "",
	bill_com	: "", 
	bill_text	: "",
	bill_date	: null,
	bill_ndate	: "1900-01-01 00:00:00",
	bill_ipaddr : "",
	bill_gpsaddr: "",
	node_qty	: 0,
	node_price	: 0,
	node_amt	: 0,
	bill_label	: ""
}
function successFun(parentview,childview){
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
} 
// 查询的ajax 
function rqsDataAjax(params,port,rqsDataSuccess,urlPath,searchtype){
//	console.log("参数:"+systemURL + port);
	mui.ajax(systemURL + port, {
		data: params,
		beforeSend: function() {
			var network = true;
			checkNetState(); // 检查网络链接状态
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 60000, //超时时间设置为10秒；
		contentType: "application/json; charset=utf-8",
		success: function(data) {
//			console.log("data="+JSON.stringify(data));
			if(data.code == 0) {
				rqsDataSuccess(data,searchtype);
			}
			if(data.code == 1) {
				plus.nativeUI.closeWaiting();
				// console.log(JSON.stringify(data))
				ajaxCode1(data.error_code,data.error_description,urlPath);
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr)
			console.log(type)
			console.log(errorThrown)
			console.log("出错了");
			plus.nativeUI.closeWaiting();
			mui.toast("网络状况不好,请重试!");
		}
	});		
}
// 校验必填项//0611
function checkRequiredItems(){   
	var check = true;
	var blankInputLens = mui(".requiredInput").length;
	for(var i = 0; i < blankInputLens; i++) {
		if(!mui(".requiredInput")[i].value || mui(".requiredInput")[i].value.trim() == "") {
			var label = mui(".requiredInput")[i].previousElementSibling;
			mui.toast(label.innerText + "不允许为空");
			mui("#saveBtn").button('reset');
			check = false;
			return check;
		}
	}
	return check;
}

//
// 按钮设置
function setBtnstate(page,type,flagsave,hadSend,privileges){
	// 1.
	if(page == "edit" && type == "basic"){
		if(!flagsave){
			document.getElementById("saveBtn").addEventListener("tap",saveBtn); 
			document.getElementById("bSendBtn").addEventListener("tap",bSendBtn);
	   		document.getElementById("deleteBtn").removeEventListener("tap",deleteBtn);
	   		// 
	   		document.getElementById("saveBtn").style.color =  "#FFF"; 
			document.getElementById("bSendIcon").style.color =  "#18B4ED";
	   		document.getElementById("deleteIcon").style.color =  "#8f8f94";
		}
		// 2.
		if(flagsave && !hadSend){
			document.getElementById("saveBtn").addEventListener("tap",saveBtn); 
			document.getElementById("bSendBtn").addEventListener("tap",bSendBtn);
	   		document.getElementById("deleteBtn").addEventListener("tap",deleteBtn);
	   		//
	   		document.getElementById("saveBtn").style.color =  "#FFF";
			document.getElementById("bSendIcon").style.color =  "#18B4ED";
	   		document.getElementById("deleteIcon").style.color =  "#18B4ED";
		}
		// 3.
		if(flagsave && hadSend){
			document.getElementById("saveBtn").removeEventListener("tap",saveBtn); 
			document.getElementById("bSendBtn").removeEventListener("tap",bSendBtn);
	   		document.getElementById("deleteBtn").removeEventListener("tap",deleteBtn);
	   		//
	   		document.getElementById("saveBtn").style.color =  "#8f8f94";
			document.getElementById("bSendIcon").style.color =  "#8f8f94";
	   		document.getElementById("deleteIcon").style.color =  "#8f8f94";
		}
	}
	if(page == "node" && type == "basic"){
		if(hadSend){
			document.getElementById("bBackBtn").addEventListener("tap",bBackBtn);
			document.getElementById("bBackIcon").style.color =  "#18B4ED";
		}else{
			document.getElementById("bBackBtn").removeEventListener("tap",bBackBtn);
			document.getElementById("bBackIcon").style.color =  "#8f8f94";
		}
	}
}
// 获取页面上的值
function getValue(normalData,isContinue,isObj,billTextData){
	/*
	* normalData = {h:{},v:{},c:{}}  	// 标准字段
	* billTextData={h:{},v:{},c:{}}		// 大字段
	* h 页面上需要通过innerHTML获取的，为{}
	* v 页面上需要通过value获取的，为{}
	* c 页面上的单选，注意需要将input的name设为字段名
	* isContinue 是否继续，页面上有bill_text这个字段则值为true 否则为false
	* isObj 大字段是不是对象，值为true或者false
	* 如果大字段不为object则把bill_text分别放到他对应的类型上
	* * 比如bill_text是应该通过innerHTML获取的，则 billTestData={h:{bill_text:""},v:{},c:{}}
	*/ 
	var getData = {};
	for(var i in normalData.h){
		getData[i] = document.getElementById(i).innerHTML;
	}
	for(var k in normalData.v){
		getData[k] = document.getElementById(k).value;
	}
	for(var j in normalData.c){
		getData[j] = vlUtils.isnull(jQuery("input[name='"+j+"']:checked").val())?normalData.c[j]:jQuery("input[name='"+j+"']:checked").val();
	}
	// 处理大字段
	var billtext;
	if(isContinue){
		billtext = getValue(billTextData,false); // 
		if(isObj){
			var textArr = [];
			textArr[0] = billtext;
			getData.bill_text = JSON.stringify(textArr);
		}
		else{
			getData.bill_text = billtext.bill_text;
		}
	}
	return getData;
}
// 将查询到的数据赋值到页面上
function setValue(data,normalData,isContinue,isObj,billTextData) {
	//
	for(var i in normalData.h){
		document.getElementById(i).innerHTML = data[i];
	}
	for(var k in normalData.v){
		if(k.indexOf('date') > -1){
			document.getElementById(k).value = data[k].slice(0,10);
		}else {
			document.getElementById(k).value = data[k];
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
	if(isContinue){
		// 拿到数据之后把大字段分离出来，
		// 大字段不是obj：	billtextValue= {bill_text : ""} 
		// 大字段是obj： 	billtextValue= {a : "",b:"",...} 
		var billtextValue;
		if(isObj){
			if(typeof(data.bill_text) == 'string'){
				billtextValue = JSON.parse(data.bill_text)[0];
			}
			else{
				billtextValue = data.bill_text[0];
			}
		}
		else{
			billtextValue={};
			billtextValue.bill_text = data.bill_text;
		}
		setValue(billtextValue,billTextData,false); // 
	}
}
// 
function dataPicker(id,falg){
	var _self = this;
	if(_self.picker) {
		_self.picker.show(function (rs) {
			if(falg){
				document.getElementById(id).value = rs.text+":00";
			}else{
				document.getElementById(id).value = rs.text;
			}
			
			_self.picker.dispose();
			_self.picker = null;
		});
	} else {
		var optionsJson = document.getElementById(id).getAttribute('data-options') || '{}';
		options = JSON.parse(optionsJson);
		/*
		 * 首次显示时实例化组件
		 * 示例为了简洁，将 options 放在了按钮的 dom 上
		 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
		 */
//		_self.picker = new mui.DtPicker(optionsJson);
		_self.picker = new mui.DtPicker(options);
		_self.picker.show(function(rs) {
			/*
			 * rs.value 拼合后的 value
			 * rs.text 拼合后的 text
			 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
			 * rs.m 月，用法同年
			 * rs.d 日，用法同年
			 * rs.h 时，用法同年
			 * rs.i 分（minutes 的第二个字母），用法同年
			 */
			if(falg){
				document.getElementById(id).value = rs.text+":00";
			}else{
				document.getElementById(id).value = rs.text;
			}
			/* 
			 * 返回 false 可以阻止选择框的关闭
			 * return false;
			 */
			/*
			 * 释放组件资源，释放后将将不能再操作组件
			 * 通常情况下，不需要示放组件，new DtPicker(optionsJson) 后，可以一直使用。
			 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
			 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
			 */
			_self.picker.dispose();
			_self.picker = null;
		});
	}
}

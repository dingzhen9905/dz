;(function(){
	var Vldate = function (){
		this.dates = new Date();
		this.year = this.dates.getFullYear();
		this.curM = this.dates.getMonth() + 1;
		this.curD = this.dates.getDate();
		this.curM =  (this.curM < 10) ? ("0" + this.curM) : this.curM;
		this.curD =  (this.curD < 10) ? ("0" + this.curD) : this.curD;
		
	}
	Vldate.prototype = {
		// 当天日期
		getToday : function (){
			return this.year +"-"+ this.curM+"-"+this.curD;
		},
		// 当前核算年月
		getfiscalYM : function (){
			return this.year+ '' + this.curM;
		},
		// 本月1日
		getCurMFirstD : function (){
			return this.year +"-"+ this.curM+"-01";
		},
		// 比较日期大小
		// 计算天数差
		getDateDiff : function (sDate1, sDate2){    
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
   	 	// 时间/日期相加，取得固定时间（如2019年6月24日）20天之后的时间
   	 	// 转换为：xx小时xx分
   	 	// 数据提交时间
	}
	window.Vldate = Vldate;
})();
// https://www.deanhan.cn/js-date-format.html
// https://www.jb51.net/article/51663.htm
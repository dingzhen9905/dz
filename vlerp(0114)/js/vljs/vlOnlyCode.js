/*未启用*/
;(function(){
	function  getBillno(code){
 		//业务编码+三级流程+年月+时间+标识  +3位随机码
	 	var date = new Date();
	    var seperator1 = "_"; 
	     onlyCode = code + "00_"
	     			+ dateToString(date).dateTime + "_" 
	     			+ dateToString(date).secondTime + uuid("B",3,40) ;
	     return onlyCode;
	 }
	function dateToString(now) {
        var year 	= now.getFullYear();
        var month 	= pad(now.getMonth() + 1);
        var day 	= pad(now.getDate());
        var hour 	= pad(now.getHours());
        var minute 	= pad(now.getMinutes());
        var second 	= pad(now.getSeconds());
        //
        var dateTime 	= year+month+day;
        var secondTime	= hour+minute;
        var objdate	= {
        	dateTime	: dateTime,
        	secondTime	: secondTime
        }
        return objdate;
   	}
	function pad(a){
		return  (a < 10) ? ("0" + a) : a.toString();
	}
	function uuid(prefix, len, radix) {
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
    }
	window.getBillno = getBillno;
})();

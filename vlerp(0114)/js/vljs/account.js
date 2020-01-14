/*
* @Author: Marte
* @Date:   2019-06-25 15:58:26
* @Last Modified by:   Marte
* @Last Modified time: 2019-06-25 15:58:29
* ==========
* 0625 已启用
*/
;(function(){
	function AcctList (list, user, idx){
		this.sName = user['name'];
		this.sPw  = user['pw'];
		this.aName = list['name'];
		this.aPw   = list['pw'];
		this.idx   = idx ? idx : this.aName.indexOf(this.sName);
	}
	
	AcctList.prototype.add = function (){
		this.aName.unshift(this.sName);
		this.aPw.unshift(this.sPw);
	}
	AcctList.prototype.update = function (){
		if(this.idx !== -1 ){
			this.del();
		}
		this.add();
	}
	AcctList.prototype.del = function (){
		if(this.idx !== -1){
			this.aName.splice( this.idx, 1 );
			this.aPw.splice( this.idx, 1 );
		}
	}
	window.AcctList = AcctList;
})();

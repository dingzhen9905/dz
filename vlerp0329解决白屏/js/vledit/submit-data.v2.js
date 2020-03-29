;(function(){
	/**/
	var submitData = {
		getData : getRqsData, 
		datatoStr : rqsDatatoStr, 
		valiRequired : valiRequired,
		changeValue : changeValue,
	}
	var getRqsData = function (obj){
		var _obj = obj || {};
		mui('[data-test]').each(function (i){
			var _item = mui('[data-test]')[i],
				dataArr = _item.getAttribute('data-test').split('.'),
				_type = dataArr[0],
				_name = dataArr[1],
				_name2 = dataArr[2],
				len = dataArr.length;
				
			if(len === 3){
				if(!_obj[_name]){
					_obj[_name] = [{}]
				}
				switch (_type){
					case 'radio':
						_item.checked && (_obj[_name][0][_name2] = _item.value);
						break;
					case 'checkbox':
						_item.checked && (_obj[_name][0][_name2] = _obj[_name][0][_name2] ? (_obj[_name][0][_name2]+','+ _item.value) : _item.value);
						break;
					case 'html':
						_obj[_name][0][_name2] = _item.innerHTML;
						break;
					default: 
						_obj[_name][0][_name2] = _item.value;
						break;
				}
			}else if (len === 2){
				switch (_type){
					case 'radio':
						_item.checked && (_obj[_name] = _item.value);
						break;
					case 'checkbox':
						_item.checked && (_obj[_name] = _obj[_name] ? (_obj[_name]+','+ _item.value) : _item.value);
						break;
					case 'html':
						_obj[_name] = _item.innerHTML;
						break;
					default: 
						_obj[_name] = _item.value;
						break;
				}
			}
		});
		console.log('ksdj===='+JSON.stringify(_obj))
		return _obj;
	}
	var rqsDatatoStr = function (obj) {
		mui('[data-str]').each(function(i){
			var _item = mui('[data-str]')[i],
				_k = _item.getAttribute('data-str');
			if(mui.type(obj[_k]) === 'array' || mui.type(obj[_k]) === 'object'){
				obj[_k] = JSON.stringify(obj[_k]);
			}
		});
		console.log('zhuanhuan:'+JSON.stringify(obj))
		return obj;
	}
	
	var fillData = function () {};
	var valiRequired = function () {
		var _result = true;
		// 校验必填项
		var blankLens = mui(".vl-required").length;
		for(var i = 0; i < blankLens; i++) {
			if(!mui(".vl-required")[i].value || mui(".vl-required")[i].value.trim() == "") {
				var title = mui(".vl-required")[i].previousElementSibling;
				var tip = "“" + title.innerText + "” 不允许为空 ";
				plus.nativeUI.toast( tip, {"verticalAlign": "top"});
				check = false;
				return check;
			}
		}
		return _result;
	};
	var valiFormat = function (){
		// 校验格式
		// 手机号
		// 身份证
		// 银行卡号
		return ;
	}
		
	//[[key,value],[key,value],[key.value]]
	function changeValue(changedata,obj){
		var _res = [{},{}],
			_bChange = _res[0],
			_aChange = _res[1],
			_ak2 = ['bill_text'];
		changedata.each(function (i) {
			var _item = changedata[i],
				_v = item[1],
				_key = _item[0],
				_arr = _key.split('.'),
				_k1 = _arr[0],
				_k2 = _arr[1];
				if(!_k2){
					_bChange[_k1] = _v;
					_cChange[_k1] = obj[_k1];
				}else{
					_ak2.push[_k1];
					if(!_bChange[_k1]){
						_bChange[_k1] = [{}];
						_cChange[_k1] = [{}];
					}
					if(obj[_k1] !== ''){
						if(mui.type(obj[_k1]) === 'string'){
							obj[_k1] = JSON.parse(obj[_k1]);
						}
					}else {
						obj[_k1] = [{}];
					}
					_bChange[_k1][0][_k2] = _v;
					_cChange[_k1][0][_k2] = obj[_k1][0][_k2];
				}
		});
		// 
		obj.bill_text = _res;
		_ak2.each(function(i){
			obj[i] = JSON.stringify(obj[i]);
		})
		console.log(JSON.stringify(_bChange));
		console.log(JSON.stringify(_cChange));
		console.log(JSON.stringify(_res));
		console.log(JSON.stringify(obj));
		return obj;
	}
	
	window.submitD = submitData;
})();

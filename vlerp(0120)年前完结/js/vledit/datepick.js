;(function() {
	/**
	 * 
	 * @param {Object} event
	 * @param {Object} $
	 * @param {Object} id
	 * @param {Object} fn
	 */
	var datePick = function (event,$,id,fn){
		var _self = this;
		var _id = document.getElementById(id);
		var _res;
		var _type = _id.getAttribute('type') ? 'value' : 'innerHTML';
		if(!_self.picker) {
			var optionsJson = _id.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			_self.picker = new $.DtPicker(options);
		}
		_self.picker.show(function (rs) {
			/*
			 * rs.value 拼合后的 value
			 * rs.text 拼合后的 text
			 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
			 * rs.m 月，用法同年
			 * rs.d 日，用法同年
			 * rs.h 时，用法同年
			 * rs.i 分（minutes 的第二个字母），用法同年
			 */
			_id[_type] = rs.text;
			_res = rs.text;
			fn && fn(rs.text);
			_self.picker.dispose();
			_self.picker = null;
		});
	}
	window.datePick = datePick;
})();

/**
 * <div class="mui-content-padded">
		<h5 class="mui-content-padded">常规示例</h5>
		<button id='demo1' data-options='{}' class="btn mui-btn mui-btn-block">选择日期时间 ...</button>
		<h5 class="mui-content-padded">设定年份区间</h5>
		<button id='demo2' data-options='{"type":"date","beginYear":2014,"endYear":2016}' class="btn mui-btn mui-btn-block">选择日期 ...</button>
		<h5 class="mui-content-padded">设定选中的时间</h5>
		<button id='demo3' data-options='{"value":"2015-10-10 10:10","beginYear":2010,"endYear":2020}' class="btn mui-btn mui-btn-block">选择日期时间 ...</button>
		<h5 class="mui-content-padded">指定类型</h5>
		<button id='demo4' data-options='{"type":"date"}' class="btn mui-btn mui-btn-block">选择日期 ...</button>
		<button id='demo5' data-options='{"type":"time"}' class="btn mui-btn mui-btn-block">选择时间 ...</button>
		<button id='demo6' data-options='{"type":"month"}' class="btn mui-btn mui-btn-block">选择月份 ...</button>
		<h5 class="mui-content-padded">自定义数据</h5>
		<button id='demo7' data-options='{"type":"hour","customData":{"h":[{"text":"上午","value":"上午"},{"text":"下午","value":"下午"},{"text":"晚上","value":"晚上"}]},"labels":["年", "月", "日", "时段", "分"]}' class="btn mui-btn mui-btn-block">选择时段 ...</button>
		<div id='result' class="ui-alert"></div>
	</div>
 */
;(function($, doc) {
	$.init();
	$.ready(function() {
		var _getParam = function(obj, param) {
			return obj[param] || '';
		};
		var _getElem = function (el) {
			return document.getElementById(el);
		};
		var cityPicker = new $.PopPicker({
			layer: 4
		});
		cityPicker.setData(dataCity3);
		
		var oProv 	= _getElem('linkbd_linkprov'),//地区 item[0]
			oStreet 	= _getElem("linkbd_linkstreet"),//街道 item[1]
			oLng 	= _getElem("linkbd_lngposition");//纬度 item[2]
			
		oProv.addEventListener('tap', ePickAddr, false);
		function ePickAddr(event) {
			cityPicker.show(function(items) {
				
				items[2].latitude  = items[2].latitude || items[0].latitude;
				items[2].longitude = items[2].longitude || items[0].longitude;
				//
				oProv.value 	= _getParam(items[0], 'text') + ' ' + _getParam(items[1], 'text') + ' ' + _getParam(items[2], 'text');
				oStreet.innerHTML = _getParam(items[3], 'text');
				oLng.innerHTML = items[2].longitude + "," + items[2].latitude;
			});
		}
	});
})(mui, document);

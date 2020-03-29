(function(w){
var immersed_sysc = localStorage.getItem("sysColor");
var immersed_userInfo = JSON.parse(localStorage.getItem("user"));
document.addEventListener('plusready',function(){
	//	console.log("Immersed-UserAgent: "+navigator.userAgent);
	var immer_id = plus.runtime.appid;//vdvc20100_20170801_0101v101
	if(!immersed_sysc && immer_id){
		if(immer_id == "vdvc20100_20170801_0101v101"){
			immersed_sysc = "#FDB23F";
		}else if(immer_id == "vdvc20100_20170801_0101v102"){
			immersed_sysc = "#2A99FA";
		}else{
			immersed_sysc = "#E6231B";// 衡阳：E6231B；北京：FE0137
		}
	}else if(!immersed_sysc && !immer_id) {
		immersed_sysc = "#E6231B";
	}
},false);

var immersed = 0;
var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
if(ms&&ms.length>=3){
	immersed=parseFloat(ms[2]);
}
w.immersed=immersed;

if(!immersed){
	return;
}
if(!immersed_sysc){
	immersed_sysc = "#E6231B";
}
var t=document.getElementById('head');
t&&(t.style.paddingTop=immersed+'px',t.style.background=immersed_sysc,t.style.color='#FFFFFF;');	// yw:FE0137;ps:FDB23F;cx:2A99FA;
t=document.getElementById('content');
t&&(t.style.marginTop=immersed+'px');
t=document.getElementById('dcontent');
t&&(t.style.marginTop=immersed+'px');
t=document.getElementById('map');
t&&(t.style.marginTop=immersed+'px');
//console.log(localStorage.getItem("sysColor")+"-[head]-"+document.getElementById('head').style.background);
})(window);
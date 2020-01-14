;(function (){
	var _oTrueFalse ={"true": true, "false": false};
	// TODO 6. 事件/方法=================================
	mui("#J_pics_box").on('tap', 'li', function(e) {
		var li = this;
		event.stopPropagation();
		event.preventDefault();
		var idx = jQuery(li).index();
		var haveImg = _oTrueFalse[jQuery(li).attr("data-haveimg")];
		// haveImg  ? EditPhotos(idx) : takePhoto(idx);
		haveImg  ? EditPhotos(idx) : callPhotograph(idx);
	
	});
	
	function EditPhotos(idx) {
		var a = [{
			title: "更换"
		}, {
			title: "删除"
		}];
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: a
		}, function(b) {
			switch(b.index) {
				case 0:
					break;
				case 1:
					changePhoto(idx);
					break;
				case 2:
					delPhoto(idx);
					break;
				default:
					break
			}
		})
	}
	function takePhoto(idx) {
		var l = $$(".imgs").eq(idx).children("img").length;
		if(l == 0) {
			callPhotograph(idx)
		} else {
			mui.toast("~已经有照片了~");
		}
	}
	// 唤起相机
	function callPhotograph(idx) {
		plus.nativeUI.showWaiting("正在打开相机...");
		var nvc801bno = VlTools.getBno("vdvc801");
		//调用相机
		var cmr = plus.camera.getCamera();
		//  拍照的大小
		var aRes = cmr.supportedImageResolutions;
		var res = aRes[aRes.length - 1]; // 默认取最小的
		var path;
		if(mobile === "Apple" || mobile === "iOS"){
			path = "_doc/Vlbfile/" + nvc801bno + ".jpg"; 
		}else{
			path = "_doc/Vlbfile/" + nvc801bno;
		}
		var captureOpt = {
			// filter: "none",
			resolution: res,
			format: "jpg",
			filename: path,
			index : 1
		}
		// 获取照片的格式
		var fmt = cmr.supportedImageFormats[0];
		
		cmr.captureImage(
			function(path) {
				plus.nativeUI.closeWaiting("正在打开相机...");
				plus.nativeUI.showWaiting("正在设置图片...");
				plus.io.resolveLocalFileSystemURL(path, function(entry) {
					var paths = entry.fullPath;
					console.log("hhhh"+paths)
					setImg(idx, nvc801bno, paths, path);
					plus.nativeUI.closeWaiting("正在设置图片...");
				}, function(e) {
					plus.nativeUI.closeWaiting("正在设置图片...");
					alert("设置图片失败" + e.message);  
				});
			}, 
			function(error) {
				plus.nativeUI.closeWaiting("正在打开相机...");
				alert( "拍照操作失败" + error.message );
			}, 
			captureOpt
		);
	}
	function changePhoto(idx) {
		var oImgli = jQuery("#J_pics_box li").eq(idx);
		var datasave = _oTrueFalse[oImgli.attr("data-hadsave")];
		var datano = oImgli.attr("data-no");
		var btn = ["确定更换", "取消更换"];
		mui.confirm('更换后原照片将被删除!', '您确认要更换此照片吗？', btn, function(e) {
			if(e.index == 0) {
				if(datasave) {
					delPhotoData(datano);
				}
				callPhotograph(idx);
			} else {
				return
			}
		})
	
	}
	//点击照片【删除】
	function delPhoto(idx) {
		var oImgli = jQuery("#J_pics_box li").eq(idx);
		var del = confirm("您确定要删除此照片？");
		if(del == true) {
			var datasave = _oTrueFalse[oImgli.attr("data-hadsave")];
			var datano = oImgli.attr("data-no");
			if(datasave) {
				delPhotoData(datano); // 删掉关联数据
			}
			oImgli.find("img").attr("src","../../images/icon/plus.png");
			oImgli.attr("data-haveimg","false");
			oImgli.attr("data-hadsave","false");
			oImgli.attr("data-src", "");
			oImgli.attr("data-no", "");
		} else {
			return;
		}
	}
	//删除照片的ajax
	function delPhotoData(bno) {
		var p = {
			bill_no: bno,
			bill_task: "d_delete",
			fbill_no: "ROOT",
			bill_user: userbillNo,
			bill_com: teamBillCom,
			bill_date: VlDate.get(new Date(), "_ymdhms"),
		}
		VlAjax({
			"port" : "sendTask",
			"headers" : "json"
		}, p, sCBdelPhotoData)
	}
	
	function sCBdelPhotoData() {mui.toast("图片删除成功~")} // 不可删除
})();
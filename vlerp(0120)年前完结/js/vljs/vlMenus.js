/*1009启用*/
;(function(mui) {
	var Vmenus = function($, opt, ajax) {
		this.$ = $;
		this.ajax = ajax;
		this.menusBoxId = opt.menusBox;
		this.menusTmplId = opt.menusTmpl;
		this.baseData = opt.baseData;
		this.pageNO = opt.pageNO;
		this.defaultData = [{
			"rowdata": "{\"内容\":\"编号:vdvc206bjfc01;业务:;系统:企业;文件:\",\"指令\":\"业务员\",\"数量\":\"0\",\"日期\":\"2019-10-29 14:52:51\",\"参数\":\"\",\"标题\":\"基础管理\",\"图片\":\"vdvc20600_20190812_11110000\",\"金额\":\"0\"}",
			"liTitle": "基础管理",
			"liStatus": "vdvc20600_20190812_11110000",
			"liDetail": [{
				"rowdata": "{\"标题\":\"防窜管理\",\"数量\":\"06\",\"日期\":\"2019-10-29 14:52:52\",\"参数\":\"vdvc10501\",\"内容\":\"单据号:vdvc20600_20190812_11110006;业务:;路径:layout/vlvdsa/vdsa133_plist.html;系统:企业;身份:\",\"图片\":\"vdvc206bjfc01\",\"指令\":\"vdvc20600_20190812_11110000\",\"金额\":\"\"}",
				"liTitle": "防窜管理",
				"liStatus": "vdvc20600_20190812_11110000",
				"liImgSrc": "http://101.201.238.199:8080/mypath/Vldicon/vdvc206hyps08.png"
			}]
		}]
		
		this.moduleArr = [];
		this.mMenuBno = [];
		this.nDmenusNum = 0;
		this.init();
	}
	Vmenus.prototype = {
		ajaxSet: {
			"port": "active",
			"headers": "json",
			"outPath": "layout/login.html"
		},
		aFindDept: ['vdvc312_plist.html', 'vrsa003_plist.html', 'vdsa402_plist.html', 'vdsa402hn_plist.html'],
		aDept: [],
		init: function() {
			this.findDept();
			this.findMmenus(this.pageNO, undefined, this.MmoduleData);
			this.bindEvent();
		},
		bindEvent: function() {
			var _id = "#" + this.menusBoxId;
			var _self = this;
			this.$(_id).on("tap", "li.dModule", function(e) {
				_self.CheckPath(e, this, _self);
			});
		},
		CheckPath: function(e, self, menusObj) {
			var rowData = JSON.parse(jQuery(self).find(".data-drow").html()),
				sPath = rowData["内容"].split(";")[2].split(":")[1],
				aPath = sPath.split("/"),
				pageId = aPath[aPath.length - 1];
			if (VlUtils.isnull(sPath)) {
				mui.toast("~敬请期待~");
			} else {
				plus.io.resolveLocalFileSystemURL( "_www" + sPath, function(e){
					menusObj.openPage({
						"url" : sPath,
						"id" : pageId,
						"self" : menusObj,
						"data" : rowData,
						"title" : jQuery(self).find(".mui-media-body").html()
					});
				}, function(e){
					mui.toast("~敬请期待~");
				} )
				
			}
		},
		openPage : function (opt){
			var _id = opt.id,
				_url = opt.url,
				_self = opt.self,
				_data = opt.data,
				_title = opt.title;
//				console.log(JSON.stringify(_url))
			if (_self.aFindDept.indexOf(_id) !== -1 || _id.slice(0, 2) == "vr") {

			} else {
				_self.baseData.deptNo = "ROOT";
				_self.baseData.deptName = _self.baseData.teamBillComName;
			}
			_self.baseData.fromPage = "work";
			_self.baseData.commonParams = _data["参数"];
			_self.baseData.otherParams = _data["金额"];
			_self.baseData.pageTitle = _title;
			_self.baseData.dataInfo = _self.aDept;
			mui.openWindow({
				url: _url,
				id: _id,
				extras: _self.baseData,
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在打开页面...', //等待对话框上显示的提示内容
				},
			})
		},
		
		CheckUrl1: function(url) {
		},
		findDept: function() {
			var linkuser = this.baseData.privileges == "ROOT" ? "%" : this.baseData.userbillNo;
			var queryparmas = { // 默认全部004
				name: 'msvr',
				bill_com: this.baseData.teamBillCom,
				bill_task: "VR_find_dept001", //默认004
				bill_user: linkuser,
				bill_title: "",
				currentPage: 1,
				pageSize: 10,
				paramText: ""
			}
			var _self = this;
			this.ajax.post(this.ajaxSet, queryparmas, function(data,type){
				_self.sCBfindDept(data, type, _self)
			});
		},
		sCBfindDept : function (data, type, self) {
			plus.nativeUI.closeWaiting();
			if (data.data.length != 0) {
				self.baseData.deptNo = data.data[0]["图片元数据"];
				self.baseData.deptName = data.data[0]["标题客户名称"];
				for (var i = 0; i < data.data.length; i++) {
					self.aDept.push({
						"title": data.data[i]["标题客户名称"],
						"bill_no": data.data[i]["图片元数据"]
					});
				}
			} else {
				self.baseData.deptNo = "ROOT";
				self.baseData.deptName = self.baseData.teamBillComName;
			}
		},
		findMmenus: function(page, bno, sCB) {
			if(plus.runtime.appid !== "vlerpfc"){
				var moduleparmas = { // 默认全部004
					name: 'msvr',
					bill_com: this.baseData.billcoppo,
					bill_oppo: this.baseData.teamBillCom,
					bill_task: arguments[1] ? "VR_find_vdvc206_02" : "VR_find_vdvc206_01",
					bill_user: this.baseData.userbillNo,
					bill_bflow: this.baseData.curSys,
					bill_wflow: this.baseData.userRole,
					bill_no: bno,
					bill_unit: page,
					currentPage: 1,
					pageSize: 100,
					paramText: ""
				}
				plus.nativeUI.showWaiting("正在查询...\n 请耐心等待");
				var _self = this;
				this.ajax.post(this.ajaxSet, moduleparmas, function(data,type){
					sCB(data, type, _self)
				});
			}else if(page === "01"){
				this.renderMenus(this.defaultData, this);
			}else{
				this.noAvailableMeusTip(this);
			}
		},
		dataAdapter: function(data, type) {
			var oData = {};
			for (var k in data) {
				oData[k.slice(0, 2)] = data[k];
			}
			switch (type) {
				case "m":
					return {
						"rowdata": JSON.stringify(oData),
						"liTitle": oData['标题'],
						"liStatus": oData['图片'],
						"liDetail": []
					}
					break;
				case "d":
					return {
						"rowdata": JSON.stringify(oData),
						"liTitle": oData["标题"],
						"liStatus": oData['指令'],
						"liImgSrc": VlAjax.getImgPath(oData["图片"])
					}
					break;
				default:
					break;
			}
		},
		MmoduleData: function(data, type, self) {
			if (data.data.length != 0) {
				for (var i = 0; i < data.data.length; i++) {
					var mouduleJson = {};
					for (var k in data.data[i]) {
						mouduleJson[k.slice(0, 2)] = data.data[i][k];
					}
					mouduleJson = self.dataAdapter(data.data[i], "m")

					self.moduleArr.push(mouduleJson);
					self.mMenuBno.push(mouduleJson["liStatus"]);
					self.findMmenus(self.pageNO, mouduleJson["liStatus"], self.DmoduleData);
				}
			} else { // 如果没有长度说明没有数据，提示没有数据
				// mui.toast("未查询到数据~M");
				self.noAvailableMeusTip(self);
				plus.nativeUI.closeWaiting();
			}
		},
		DmoduleData: function(data, type, self) {
			if (data.data.length != 0) {
				for (var i = 0; i < data.data.length; i++) {
					var item = self.dataAdapter(data.data[i], "d")
					var _idx = self.mMenuBno.indexOf(item["liStatus"]);
					self.moduleArr[_idx].liDetail.push(item);
				}
			} else { // 如果没有长度说明没有数据，提示没有数据
				// mui.toast("未查询到数据~D");
				plus.nativeUI.closeWaiting();
			}
			self.nDmenusNum++;
			if (self.nDmenusNum == self.moduleArr.length) {
				self.renderMenus(self.moduleArr, self);
			}
		},
		renderMenus: function(data, self) {
			var _id = "#" + self.menusBoxId;
			mui(_id)[0].innerHTML = template(self.menusTmplId, {
				"data": data
			});
			plus.nativeUI.closeWaiting("正在查询...\n 请耐心等待");
		},
		noAvailableMeusTip : function (self){
			var _id = "#" + self.menusBoxId;
			mui(_id)[0].innerHTML = "无可用菜单~";
		}
	}
	window.Vmenus = Vmenus;
})(mui);
;(function () {
	var vlappRecord = {
		"formal":{
			"vlerp": [],
			"clerp": [],
			"tlerp": []
		},
		"test":{
			"vlerp": [],
			"clerp": [],
			"tlerp": [],
		}
	};
	var sysRecord = function (opt) {

		var _sysJson = {
			"企业"	: "vlerp",
			"经销商"	: "clerp",
			"终端"	: "tlerp"
		}
		var _libray = {
			"39"	: 'formal',
			"101"	: 'test'
		}
		// 
		this.libray 	= _libray[opt.libray];
		this.sys 		= _sysJson[opt.sys];
		
		// 分页
		this.size 		= opt.size;
		this.curPage 	= opt.curPage;
		this.totalRecord = vlappRecord[this.libray][this.sys].length;
		this.totalPage 	= Math.ceil( this.totalRecord / this.size );
		
		// 查找数据的范围
		this.startIdx 	= ( this.curPage -1 ) * this.size;
		this.endIdx 	=  this.curPage  * this.size  -1 ;
		
		var _msg = [];
		for(var i = startIdx; i <= endIdx; i ++ ){
			if(i <= (this.totalRecord-1)){
				_msg.push(vlappRecord[this.libray][this.sys][i]);
			}
		}
		return {
			msg		: _msg,
			pager	: {
				size 	: this.size,
				curPage : this.curPage,
				totalRecord : this.totalRecord,
				totalPage 	: this.totalPage
			}
		};
	}
	
	// TODO　
	vlappRecord["formal"]["vlerp"]=[
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '0806.01_21.2014',	"date"		: '2019-08-06',
			"content"	: [
				{"type" : "data", "txt": "1. 新增版本更新记录；"},
				{"type" : "data", "txt": "2. 【订单管理】增加显示“需求时间”及“订单状态”；"},
				{"type" : "data", "txt": "3. 【销售政策】、【商品管理】增加搜索功能，支持物品编码、物品名称进行搜索；"},
				{"type" : "data", "txt": "4. 新增报表【流向总账】；"},
				{"type" : "data", "txt": "5. 修改物品图片显示；"},
				{"type" : "data", "txt": "6. 解决客户信息收回跳转出错的问题；"},
				{"type" : "data", "txt": "7. 解决客户信息修改不成功的问题；"},
				{"type" : "data", "txt": "8. 出库单查询新增显示“箱码数”；"},
				{"type" : "data", "txt": "8. 新增【终端协议】、【销售政策】等功能"},
			]
		}
	];
	// TODO
	vlappRecord["formal"]["clerp"]=[
		{
			"system"	: '经销商管理系统',	 	"alias" : 'Clerp',
			"version"	: '0806.01_21.2013',	"date"		: '2019-08-06',
			"content"	: [
				{"type" : "data", "txt": "1. 新增版本更新记录"},
				{"type" : "data", "txt": "2. 【采购订单】增加显示“需求时间”及“订单状态”；"},
				{"type" : "data", "txt": "3. 【商城】进行相应调整；"},
				{"type" : "data", "txt": "4. 修改物品图片显示；"},
				{"type" : "data", "txt": "5. 避免多次签收 ；"},
				{"type" : "data", "txt": "6. 修复已知BUG ；"},
			]
		}
	];
	// TODO 
	vlappRecord["formal"]["tlerp"]=[
		{
			"system"	: '终端管理系统',	 		"alias" : 'Tlerp',	
			"version"	: '0806.01_21.2012',	"date"		: '2019-08-06',
			"content"	: [
				{"type" : "data", "txt": "1. 新增版本更新记录"},
				{"type" : "data", "txt": "2. 【采购订单】增加显示“需求时间”及“订单状态”；"},
				{"type" : "data", "txt": "3. 【商城】进行相应调整；"},
				{"type" : "data", "txt": "4. 修改物品图片显示；"},
				{"type" : "data", "txt": "5. 避免多次签收 ；"},
				{"type" : "data", "txt": "6. 修复已知BUG ；"},
			]
		}
	];
	// TODO　
	vlappRecord["test"]["vlerp"]=[
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '0826.01_03.2017',	"date"		: '2019-08-26',
			"content"	: [
				{"type" : "data", "txt": "1. 【销售政策】列表页增加显示投放标签；"},
				{"type" : "data", "txt": "2. 【销售政策】编辑页增加物品类型、物品类别的维护；"},
				{"type" : "data", "txt": "3. 【赠品政策】列表页增加显示赠品标签；"},
				{"type" : "data", "txt": "4. 【赠品政策】选择物品页面增加显示物品标签；"},
				{"type" : "data", "txt": "5. 【客户关系】列表页增加显示客户数量；"},
				{"type" : "data", "txt": "6. 【客户管理】查看“客户关系”列表页增加显示客户数量；"},
				{"type" : "data", "txt": "7. 【配送查询】支持查看二级报表；"},
			]
		},
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '0622.02_03.2016',	"date"		: '2019-06-22',
			"content"	: [
				{"type" : "data", "txt": "1. 登录页显示不正确；"},
				{"type" : "data", "txt": "2. 版本更新页面打不开；"},
			]
		},
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '0622.01_03.2016',	"date"		: '2019-06-22',
			"content"	: [
				{"type" : "data", "txt": "1. 新增功能菜单【+终端】；"},
				{"type" : "data", "txt": "2. 新增功能菜单【终端协议】；"},
				{"type" : "data", "txt": "3. 新增功能菜单【赠品政策】；"},
				{"type" : "data", "txt": "4. 新增功能菜单【代垫报账】；"},
			]
		},
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '0618.01_03.2015',	"date"		: '2019-06-18',
			"content"	: [
				{"type" : "data", "txt": "1. 客户关系维护页面出错；"},
			]
		},
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '0617.01_03.2014',	"date"		: '2019-06-17',
			"content"	: [
				{"type" : "data", "txt": "1. 修改物品图片显示；"},
				{"type" : "data", "txt": "2. 解决客户信息收回跳转出错的问题；"},
				{"type" : "data", "txt": "3. 解决客户信息修改不成功的问题；"},
			]
		},
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '190611.01_8.2013',	"date"		: '2019-06-11',
			"content"	: [
				{"type" : "data", "txt": "1. 新增报表【流向总账】；"},
			]
		},
		{
			"system"	: '企业管理系统',	 		"alias" : 'Vlerp',
			"version"	: '190529.01_8.2012',	"date"		: '2019-05-29',
			"content"	: [
				{"type" : "data", "txt": "1. 新增版本更新记录；"},
				{"type" : "data", "txt": "2. 【订单管理】增加显示“需求时间”及“订单状态”；"},
				{"type" : "data", "txt": "3. 【销售政策】、【商品管理】增加搜索功能，支持物品编码、物品名称进行搜索；"},
			]
		}
	];
	// TODO
	vlappRecord["test"]["clerp"]=[
		{
			"system"	: '经销商管理系统',	 	"alias" : 'Clerp',
			"version"	: '0826.01_03.2017',	"date"		: '2019-08-26',
			"content"	: [
				{"type" : "data", "txt": "1. 【配送管理】更正协议配送物品价格； "},
				{"type" : "data", "txt": "2. 【扫码建客户】创建成功后直接跳转到登录页；"},
				{"type" : "data", "txt": "3. 【订单确认】支持选择订单运输方式；"},
				{"type" : "data", "txt": "4. 【客户关系】列表页增加显示客户数量；"},
			]
		},
		{
			"system"	: '经销商管理系统',	 	"alias" : 'Clerp',
			"version"	: '0617.01_03.2016',	"date"		: '2019-06-17',
			"content"	: [
				{"type" : "data", "txt": "1. 修改物品图片显示； "},
				{"type" : "data", "txt": "2. 避免多次签收；"},
			]
		},
		{
			"system"	: '经销商管理系统',	 	"alias" : 'Clerp',
			"version"	: '190529.01_8.2015',	"date"		: '2019-05-29',
			"content"	: [
				{"type" : "data", "txt": "1. 新增版本更新记录"},
				{"type" : "data", "txt": "2. 【采购订单】增加显示“需求时间”及“订单状态”；"},
				{"type" : "data", "txt": "3. 【商城】>【购物车】>【结算】增加“需求时间”选择项；"},
				{"type" : "data", "txt": "4. 【商城】图片按照销售政策物品编码显示；"},
			]
		}
	];
	// TODO 
	vlappRecord["test"]["tlerp"]=[
		{
			"system"	: '终端管理系统',	 	"alias" : 'Tlerp',
			"version"	: '0826.01_03.2012',	"date"		: '2019-08-26',
			"content"	: [
				{"type" : "data", "txt": "1. 【配送管理】更正协议配送物品价格； "},
				{"type" : "data", "txt": "2. 【扫码建客户】创建成功后直接跳转到登录页；"},
				{"type" : "data", "txt": "3. 【订单确认】支持选择订单运输方式；"},
			]
		},
		{
			"system"	: '终端管理系统',	 		"alias" : 'Tlerp',
			"version"	: '0617.01_03.2011',	"date"		: '2019-06-17',
			"content"	: [
				{"type" : "data", "txt": "1. 修改物品图片显示；"},
				{"type" : "data", "txt": "2. 避免多次签收 ；"},
			]
		},
		{
			"system"	: '终端管理系统',	 		"alias" : 'Tlerp',
			"version"	: '01.190528_8.2010',	"date"		: '2019-05-29',
			"content"	: [
				{"type" : "data", "txt": "1. 新增版本更新记录"},
				{"type" : "data", "txt": "2. 【采购订单】增加显示“需求时间”及“订单状态”；"},
				{"type" : "data", "txt": "3. 【商城】>【购物车】>【结算】增加“需求时间”选择项；"},
				{"type" : "data", "txt": "4. 【商城】图片按照销售政策物品编码显示；"},
			]
		}
	];
	window.sysRecord = sysRecord;
})();

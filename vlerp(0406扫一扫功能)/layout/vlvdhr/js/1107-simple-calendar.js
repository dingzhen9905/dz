class LunarHelp {
	constructor(year, month, day) {
		this.lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

		this.nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
		this.nStr2 = new Array('初', '十', '廿', '三');

		var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
		var i,
			leap = 0,
			temp = 0; //天数
		var baseDate = new Date(1900, 0, 31);
		var offset = (date - baseDate) / 86400000;

		//计算年数
		for(i = 1900; i < 2050 && offset - this.lYearDays(i) >= 0; i++) {
			offset -= this.lYearDays(i);
		}

		this.year = i;
		leap = this.leapMonth(i); //闰哪个月
		this.isLeap = 0; //0 不是 1是 2是并且计算完成

		//计算月数
		for(i = 1; i < 13 && offset > 0; i++) {
			//闰月
			if(leap > 0 && i == leap + 1 && this.isLeap == 0) {
				--i;
				this.isLeap = 1;

				temp = this.leapDays(this.year);
			} else {
				temp = this.monthDays(this.year, i);
			}

			//解除闰月
			if(this.isLeap == 1 && i == leap + 1) this.isLeap = 2;

			offset -= temp;
		}

		//如果恰好减完了，不是闰月的话月数减1
		if(offset == 0 && leap > 0 && i == leap + 1)
			if(this.isLeap) {
				this.isLeap = 0;
			} else {
				this.isLeap = 1;
				--i;
			}

		if(offset < 0) {
			offset += temp;
			--i;
		}

		this.month = i;
		//最后剩余的就是日期
		this.day = offset + 1;
	}

	// 获取y年的总天数
	lYearDays(year) {
		var i,
			sum = 0;
		for(i = 0x8000; i > 0x8; i >>= 1) sum += this.lunarInfo[year - 1900] & i ? 30 : 29;
		return sum + this.leapDays(year); //最后在加上可能有的闰年的闰月
	}

	//获取闰年闰月的天数 闰大月还是小月
	leapDays(year) {
		if(this.leapMonth(year)) return this.lunarInfo[year - 1900] & 0x10000 ? 30 : 29;
		else return 0;
	}

	//获取闰年闰哪个月1-12 ,没闰传回 0
	leapMonth(year) {
		return this.lunarInfo[year - 1900] & 0xf;
	}

	//获取y年m月的总天数 正常月
	monthDays(year, month) {
		return this.lunarInfo[year - 1900] & 0x10000 >> month ? 30 : 29;
	}

}

class SimpleCalendar {
	//构造函数
	constructor(query, options) {
		//默认配置
		this._defaultOptions = {
			width: '500px',
			height: '500px',
			language: 'CH', //语言
			showHoliday: true, //休假
			showMark: true, //标记
			onSelect: () => {},
			timeRange: {
				startYear: 1900,
				endYear: 2049
			},
			timeZone: "", //时区
			mark: {

			},
			theme: {
				changeAble: false,
				weeks: {
					backgroundColor: '#FBEC9C',
					fontColor: '#4A4A4A',
					fontSize: '20px'
				},
				days: {
					backgroundColor: '#ffffff',
					fontColor: '#565555',
					fontSize: '24px'
				},
				todaycolor: 'orange',
				activeSelectColor: 'orange',
				invalidDays: '#C1C0C0'
			}

			//容器
		};
		this.container = document.querySelector(query);

		this._defaultOptions.width = this.container.style.offsetWidth;
		this._defaultOptions.height = this.container.style.offsetHeight;

		//this._options = Object.assign({}, this._defaultOptions, options);

		//得到最终配置
		this._options = this.optionAssign(this._defaultOptions, options);

		this.create();
	}

	//用B更新A的属性 并返回结果
	optionAssign(optionsA, optionsB) {
		for(var key in optionsB) {
			if(typeof optionsA[key] === 'function') {
				if(typeof optionsB[key] === 'function') {
					optionsA[key] = optionsB[key];
				} else {
					console.warn(`${key} must be a function`);
				}
			} else if(typeof optionsA[key] !== 'object') optionsA[key] = optionsB[key];
			else {
				optionsA[key] = this.optionAssign(optionsA[key], optionsB[key]);
			}
		}
		return optionsA;
	}

	//生成日历样式
	create() {
		var root = this.container;
		root.innerHTML = '<div class="sc-header"> </div> <div class="sc-body"> </div>';
		root.style.width = this._options.width;
		root.style.height = this._options.height;
		root.className = 'sc-calendar';
		var header = root.querySelector('.sc-header');
		var scbody = root.querySelector('.sc-body');
		//actions
		header.innerHTML = header.innerHTML + '<div class="sc-actions">' + '<div class="sc-yleft">' + '&lsaquo;</div>' + '<select class="sc-select-year" name="">' + '</select>' + '<div class="sc-yright">&rsaquo;</div>' + '</div>';
		header.innerHTML = header.innerHTML + '<div class="sc-actions">' + '<div class="sc-mleft">' + '&lsaquo;</div>' + '<select class="sc-select-month" name="">' + '</select>' + '<div class="sc-mright">&rsaquo;</div>' + '</div>';
		header.innerHTML = header.innerHTML + '<div class="sc-actions"><span class="sc-time"></span></div>';
		header.innerHTML = header.innerHTML + '<div class="sc-actions"><span class="sc-return-today ">返回今天</span></div>';
		scbody.innerHTML = ' <div class="sc-week"> </div> <div class="sc-days"> </div>';
		var week = scbody.querySelector('.sc-week');
		var days = scbody.querySelector('.sc-days');
		for(var i = 0; i < 7; i++) {
			week.innerHTML = week.innerHTML + ' <div class="sc-week-item"></div>';
		}
		for(var i = 0; i < 42; i++) {
			days.innerHTML = days.innerHTML + '<div class="sc-item"><div class="day"></div><div class="kaoqin"></div><div class="banci"></div></div>';
		}
		//添加下拉框数据
		this.updateSelect(this.tyear, this.tmonth);
		//刷新日历
		this.update();
		//时间刷新
		self.setInterval('SimpleCalendar.timeupdate()', 200);
	}

	//刷新日历
	update(month = this.tmonth, year = this.tyear) {
		this.updateSize();
		this.updateWeek();
		this.addData(year, month);
		this.updateHoliday(year, month);
		this.updateMark(year, month);
		this.updateFestival(year, month);
		this.updateEvent();
		this.updateTheme(this._options.theme);
	}

	//调整大小
	updateSize(width = this._options.width, height = this._options.height) {
		//将大小赋值给option
		this._options.width = width;
		this._options.height = height;
		this.container.style.width = width;
		this.container.style.height = height;

		//根据长度和宽度大小调整适合的样式
		if(parseInt(width) < 500) {
			var actions = this.arrayfrom(this.container.querySelectorAll('.sc-actions'));
			actions.forEach(function(v, i) {
				v.classList.add('sc-actions-big');
			});
		} else {
			var actions = this.arrayfrom(this.container.querySelectorAll('.sc-actions'));
			actions.forEach(function(v, i) {
				v.classList.remove('sc-actions-big');
			});
		}
		if(parseInt(height) < 400) {
			var items = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
			items.forEach(function(v, i) {
				v.querySelector('.day').classList.add('sc-item-small');
			});
			weeks.forEach(function(v, i) {
				v.classList.add('sc-item-small');
			});
		} else {
			var items = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
			items.forEach(function(v, i) {
				v.querySelector('.day').classList.remove('sc-item-small');
			});
			weeks.forEach(function(v, i) {
				v.classList.remove('sc-item-small');
			});
		}
	}

	//刷新下拉框 只有在初始化和设置语言后才会更新
	updateSelect(year, month) {
		//下拉框
		var selectYear = this.container.querySelector('.sc-select-year');
		var selectMonth = this.container.querySelector('.sc-select-month');
		selectYear.innerHTML = '';
		for(var i = this._options.timeRange.startYear; i < this._options.timeRange.endYear + 1; i++) {
			selectYear.innerHTML += '<option value="' + i + '">' + i + '</option>';
		}
		selectMonth.innerHTML = '';
		for(var i = 0; i < 12; i++) {
			var data = this.languageData['months_' + this._options.language];
			selectMonth.innerHTML += '<option value="' + (i + 1) + '">' + data[i] + '</option>';
		}
		selectYear.value = year;
		selectMonth.value = month;
	}

	//刷新星期
	updateWeek() {
		var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
		var data = this.languageData['days_' + this._options.language];
		if(!data) {
			console.error('language error!');
		}
		weeks.forEach(function(v, i) {
			v.innerHTML = data[i];
		});
	}

	//添加请假数据
	addData(year, month) {
		var self = this;
		var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
		var day = new Date(year, month - 1, 1);
		var nowday = new Date().getDate();
		var week = day.getDay();
		// 计算得到第一个格子的日期
		var thispageStart = new Date(Date.parse(day) - (week) * 24 * 3600 * 1000);
		// 获取手机号 
		var user = JSON.parse(vlUtils.getStorage('user'));
		var usertel = user.usertel;
		//
		var dataArr =[];
		// 查询数据
		searchfun("VR_find_vdhr422_425","2018-11-01 00:00:00","2018-11-30 23:59:59",resData,0);
		searchfun("VR_find_vdhr421_01","2018-11-01 00:00:00","2018-11-30 23:59:59",resData,1);
		searchfun("VR_find_vdac401_02","2018-11-01 00:00:00","2018-11-30 23:59:59",resData,2);
		function searchfun(task,bdate,edate,callback,idx){
			var params = {
				name: 'msvr', //*
				bill_task: task, // 查询班次的指令 *
				bill_com: teamBillCom, // 当前单位 *
				bill_user: userbillNo, // 当前登陆人 *
				bill_name: userName, // 当前登陆人
				bill_id: usertel, // 手机号
				bill_date: bdate, //开始时间
				bill_ndate: edate, //结束时间
				currentPage: 1, // *
				pageSize: 100, // *
				paramText: "", // *
			};
			rqsDataAjax(params, '/Find/Ddata/activity', callback, '../login.html', idx);
		}
		function resData(data,idx){
			dataArr[idx] = data.data;
			var num =true;
			for(var i = 0; i < 3; i++){
				if(vlUtils.isnull(dataArr[i])){
					num = false;
					return;
				}
			}
			if(num){
				renderData(dataArr,self)
			}
		}
		
		function renderData(data,self) {
			//对每一个格子遍历
			for(var i = 0; i < 42; i++) {
				
				daysElement[i].className = 'sc-item';
				var theday = new Date(Date.parse(thispageStart) + i * 24 * 3600 * 1000);
				var writeyear = theday.getFullYear();
				var writeday = theday.getDate();
				var writemonth = theday.getMonth() + 1;
				if(writemonth != month) {
					daysElement[i].classList.add('sc-othermenth');
				}
				daysElement[i].querySelector('.day').innerHTML = writeday;
				if(writeday.length == 1) {
					var daynum = "0" + writeday;
				} else {
					var daynum = writeday;
				}
				if(writemonth.length == 1) {
					var monnum = "0" + writemonth;
				} else {
					var monnum = writemonth;
				}
				daysElement[i].querySelector('.kaoqin').innerHTML = "";
				daysElement[i].querySelector('.banci').innerHTML = "";
				for(var m=0;m<3;m++){
					for(var k = 0; k < data[m].length; k++) {
//						var newdataArr = {};
//						for(var j in data[m][k]) {
//							newdataArr[j.slice(0, 2)] = kaoqin.data[m][k][j];
//						}
						if(data[m][k]["日期日期"].slice(0, 4) == writeyear && data[m][k]["日期日期"].slice(5, 7) == monnum && data[m][k]["日期日期"].slice(8, 10) == daynum) {
							
							if(m != 2){
								daysElement[i].querySelector('.kaoqin').innerHTML += data[m][k]["内容内容"];
							}else{
								daysElement[i].querySelector('.banci').innerHTML += data[m][k]["内容内容"]+"早";
							}
						}
					}	
				}
				//添加today样式
				if(self.tyear == writeyear && self.tday == writeday && self.tmonth == writemonth) {
					self.selectDay = daysElement[i];
					daysElement[i].classList.add("sc-today");
				}
			}
			

		}
		
	}
	
	
	

	//刷新标记日期
	updateMark(year, month) {
		var options = this._options;
		if(options.showMark) {
			var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			var currentmonth = month - 1;
		}
	}

	//刷新节日数据
	updateFestival(year, month) {
		var options = this._options;
		var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
		var currentmonth = month - 1;
		//取得节日数据
		var data = this.languageData['feativals_' + this._options.language];
		var lunardata = this.languageData['lunarFeatival_' + this._options.language];
		var solarTermdata = this.languageData['solarTerm'];
		daysElement.forEach(function(v, i) {
			var day = +v.querySelector('.day').innerHTML;
			if(day == 1) currentmonth++;
		});
	}

	//刷新假期 休假
	updateHoliday(year, month) {
		var options = this._options;
		if(options.showHoliday) {
			var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			var currentmonth = month - 1;
			//取得节日数据
			var data = this.languageData.vocation['data_' + year];
		}
	}

	//刷新主题
	updateTheme(theme) {
		if(this._options.theme.changeAble) {
			var daytheme = theme.days;
			var weektheme = theme.weeks;
			var weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
			var days = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
			weeks.forEach(function(v, i) {
				v.style.backgroundColor = weektheme.backgroundColor;
				v.style.fontSize = weektheme.fontSize;
				v.style.color = weektheme.fontColor;
			});
			days.forEach(function(v, i) {
				if(!v.classList.contains('sc-today')) {
					v.style.backgroundColor = daytheme.backgroundColor;
					v.querySelector('.day').style.color = daytheme.fontColor;
				} else {
					v.style.backgroundColor = theme.todaycolor;
				}
				v.querySelector('.day').style.fontSize = daytheme.fontSize;
			});
			var Calendar = this;
			//active border
			days.forEach(function(v, i) {
				v.onmouseover = function(e) {
					this.style.borderColor = theme.activeSelectColor;
					this.style.borderWidth = '1px';
				};
				v.onmouseout = function(e) {
					this.style.borderColor = '#F1EBE4';
					this.style.borderWidth = '0 0 1px 1px';
				};
			});
		}
	}

	//刷新事件
	updateEvent() {
		var daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
		var container = this.container;
		var calendar = this;
		daysElement.forEach(function(v, i) {
			v.onmouseover = function(e) {
				this.classList.add('sc-active-day');
			};
			v.onmouseout = function(e) {
				this.classList.remove('sc-active-day');
			};
			v.onclick = function() {
				calendar.selectDay = v;
				var pre = container.querySelector('.sc-selected');
				if(pre) pre.classList.remove('sc-selected');
				this.classList.add('sc-selected');
				if(typeof calendar._options.onSelect === 'function') {
					calendar._options.onSelect(calendar.getSelectedDay());
				}
			};
		});

		var selectYear = container.querySelector('.sc-select-year');
		var selectMonth = container.querySelector('.sc-select-month');
		selectYear.onchange = function() {
			var m = selectMonth.value;
			var y = this.value;
			calendar.update(m, y);
		};

		selectMonth.onchange = function() {
			var y = selectYear.value;
			var m = this.value;
			calendar.update(m, y);
		};

		var yearadd = container.querySelector('.sc-yright');
		var yearsub = container.querySelector('.sc-yleft');
		var monthadd = container.querySelector('.sc-mright');
		var monthsub = container.querySelector('.sc-mleft');

		yearadd.onclick = function() {
			var currentyear = selectYear.value;
			if(currentyear < 2099) currentyear++;
			selectYear.value = currentyear;
			calendar.update(this.tmonth, currentyear);
		};
		yearsub.onclick = function() {
			var currentyear = selectYear.value;
			if(currentyear > 1900) currentyear--;
			selectYear.value = currentyear;
			calendar.update(this.tmonth, currentyear);
		};
		monthadd.onclick = function() {
			var currentmonth = selectMonth.value;
			var currentyear = selectYear.value;
			if(currentmonth < 12) currentmonth++;
			else {
				currentmonth = 1;
				selectYear.value = ++currentyear;
			};
			selectMonth.value = currentmonth;
			calendar.update(currentmonth, currentyear);
		};
		monthsub.onclick = function() {
			var currentmonth = selectMonth.value;
			var currentyear = selectYear.value;
			if(currentmonth > 1) currentmonth--;
			else {
				currentmonth = 12;
				selectYear.value = --currentyear;
			}
			selectMonth.value = currentmonth;
			calendar.update(currentmonth, currentyear);
		};

		var returntoday = container.querySelector('.sc-return-today');
		returntoday.onclick = function() {
			selectYear.value = calendar.tyear;
			selectMonth.value = calendar.tmonth;
			calendar.update();
		};
	}

	//添加标记
	addMark(day, info) {
		this._options.mark[day] = info;
		this.update();
	}

	//获取用户点击的日期
	getSelectedDay() {
		var selectYear = this.container.querySelector('.sc-select-year').value;
		var selectMonth = this.container.querySelector('.sc-select-month').value;
		var selectDay = this.selectDay.querySelector('.day').innerHTML;

		// 计算当前界面中的其他月份差
		let count = 0;
		if(this.selectDay.classList.contains('sc-othermenth')) {
			if(+selectDay < 15) count++;
			else count--;
		}
		return new Date(selectYear, selectMonth - 1 + count, selectDay);
	}

	//设置语言
	setLenguage(language) {
		this._options.language = language;
		var selectYear = this.container.querySelector('.sc-select-year');
		var selectMonth = this.container.querySelector('.sc-select-month');
		this.updateSelect(selectYear.value, selectMonth.value);
		this.update();
	}
	//设置是否显示假期
	showHoliday(s) {
		this._options.showHoliday = s;
		this.update();
	}
	//设置是否显示标记日期
	showMark(s) {
		this._options.showMark = s;
		this.update();
	}
	//将nodelist转为数组

	//nodelist转数组
	arrayfrom(nidelist) {
		var array = [];
		[].forEach.call(nidelist, function(v) {
			array.push(v);
		});
		return array;
	}

	// get options() {
	//   console.log(this._options);
	// }
}
//时间刷新函数
SimpleCalendar.timeupdate = function() {
	var timespan = document.querySelectorAll('.sc-time');
	var now = new Date();
	var nh = now.getHours();
	var nm = now.getMinutes();
	var ns = now.getSeconds();
	if(nh < 10) nh = '0' + nh;
	if(nm < 10) nm = '0' + nm;
	if(ns < 10) ns = '0' + ns;
	[].forEach.call(timespan, function(v) {
		v.innerHTML = '时间：' + nh + ":" + nm + ':' + ns;
	});
};
//国际化，和一些节日数据，标记数据
SimpleCalendar.prototype.languageData = {
	days_CH: ["日", "一", "二", "三", "四", "五", "六"],
	months_CH: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	vocation: {
		data_2016: ['1-1', '1-2', '1-3', '2-7', '2-8', '2-9', '2-10', '2-11', '2-12', '2-13', '4-2', '4-3', '4-4', '4-30', '5-1', '5-2', '6-9', '6-10', '6-11', '9-15', '9-16', '9-17', , '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7']
	}
};

SimpleCalendar.prototype.tyear = new Date().getFullYear();
SimpleCalendar.prototype.tmonth = new Date().getMonth() + 1;
SimpleCalendar.prototype.tday = new Date().getDate();
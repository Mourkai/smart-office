let now = new Date(); // 当前日期
let nowDayOfWeek = now.getDay(); // 今天本周的第几天
let nowDay = now.getDate(); // 当前日
let nowMonth = now.getMonth(); // 当前月
let nowYear = now.getYear(); // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0;
let lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
let lastMonth = lastMonthDate.getMonth();
let DateUtil = {
	/**
	 * 获得当前日期
	 * 
	 */
	getNowDay() {
		return this.formatDate(new Date());
	},

	getYesterday() {
		const yn = new Date()
		yn.setTime(yn.getTime() - 24 * 60 * 60 * 1000);
		return this.formatDate(new Date(yn.getFullYear(), (yn.getMonth()), yn.getDate()));
	},
	/**
	 * 获得本周的开始时间
	 * 
	 * @returns
	 */
	getStartDayOfWeek() {
		let day = nowDayOfWeek || 7;
		return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
	},
	/**
	 * 获得本周的结束时间
	 * 
	 * @returns
	 */
	getEndDayOfWeek() {
		let day = nowDayOfWeek || 7;
		return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day));
	},
	/**
	 * 获得本月的开始时间
	 * 
	 * @returns
	 */
	getStartDayOfMonth() {
		let monthStartDate = new Date(nowYear, nowMonth, 1);
		return this.formatDate(monthStartDate);
	},
	/**
	 * 获得本月的结束时间
	 * 
	 * @returns
	 */
	getEndDayOfMonth() {
		let monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays());
		return this.formatDate(monthEndDate);
	},
	/**
	 * 获得本月天数
	 * 
	 * @returns
	 */
	getMonthDays() {
		let monthStartDate = new Date(nowYear, nowMonth, 1);
		let monthEndDate = new Date(nowYear, nowMonth + 1, 1);
		let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	},

	//获得上周的开始日期
	getLastWeekStartDate() {
		let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
		return this.formatDate(weekStartDate);
	},
	//获得上周的结束日期
	getLastWeekEndDate() {
		let weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
		return this.formatDate(weekEndDate);
	},
	//获得上月开始时间
	getLastMonthStartDate() {
		let lastMonthStartDate = new Date(nowYear, lastMonth, 1);
		return this.formatDate(lastMonthStartDate);
	},
	//获得上月结束时间
	getLastMonthEndDate() {
		let lastMonthEndDate = new Date(nowYear, lastMonth, this.getSomeMonthDays(lastMonth));
		return this.formatDate(lastMonthEndDate);
	},
	getSomeMonthDays(myMonth) {
		let monthStartDate = new Date(nowYear, myMonth, 1);
		let monthEndDate = new Date(nowYear, myMonth + 1, 1);
		let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	},

	getPreMonthDay(date, monthNum) {
		var dateArr = date.split('-');
		var year = dateArr[0]; //获取当前日期的年份
		var month = dateArr[1]; //获取当前日期的月份
		var day = dateArr[2]; //获取当前日期的日
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中月的天数
		var year2 = year;
		var month2 = parseInt(month) - monthNum;
		if (month2 <= 0) {
			var absM = Math.abs(month2);
			year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
			month2 = 12 - (absM % 12);
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if (day2 > days2) {
			day2 = days2;
		}
		if (month2 < 10) {
			month2 = '0' + month2;
		}
		var t2 = year2 + '-' + month2 + '-' + day2;
		return t2;
	},
	/**
	 * @param 日期格式化
	 * @returns {String}
	 */
	formatDate(date) {
		let myyear = date.getFullYear();
		let mymonth = date.getMonth() + 1;
		let myweekday = date.getDate();

		if (mymonth < 10) {
			mymonth = "0" + mymonth;
		}
		if (myweekday < 10) {
			myweekday = "0" + myweekday;
		}
		return (myyear + "-" + mymonth + "-" + myweekday);
	}

};

export default DateUtil

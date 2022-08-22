const dateFormat = (time, format) => {
	let date = new Date(time);
	let year = date.getFullYear();
	// 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	// 拼接
	// return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	if (format == 'YYYY-MM') {
		return year + "-" + month;
	} else if (format == 'YYYY/MM') {
		return year + "/" + month
	} else {
		return year + "-" + month + "-" + day;
	}
}

const timestampToTime = (timestamp)=>{
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '/';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	// var D = date.getDate() + ' ';
	// var h = date.getHours() + ':';
	// var m = date.getMinutes() + ':';
	// var s = date.getSeconds();
	return Y + M;
}
export default dateFormat
export {
	timestampToTime
}

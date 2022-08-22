
const rightBtn = {
	'type': ['全部', '待提交', '被退回', '已发起'],
	'status': ['全部', '待提交', '审批中', '已撤销', '已拒绝', '已通过'],
	'dailyType': ['全部', '日志', '周报', '月报'],
}
const rules = {
	'code': {
		required: true,
		message: '请选择项目'
	},
	'commonAreaId': {
		required: true,
		message: '请选择工作城市'
	},
	'address': {
		required: true,
		message: '请输入工作地点'
	},
	'todayReport': {
		required: true,
		message: '请输入今日完成'
	},
	'nextDayPlan': {
		required: true,
		message: '请输入明日计划'
	},
}


const sourceTab = [{
	name: '全部',
	data: [],
	searchData: {
		type: 10,
		status:''
	},
	pageNum: 0,
	isOver: false,
}, {
	name: '待提交',
	data: [],
	searchData: {
		type: 7,
		status:''
	},
	pageNum: 0,
	isOver: false,
}, {
	name: '被退回',
	data: [],
	searchData: {
		type: 3,
		status:''
	},
	pageNum: 0,
	isOver: false,
}, {
	name: '已发起',
	data: [],
	searchData: {
		type: 8,
		status:''
	},
	pageNum: 0,
	isOver: false,
}]

export {
	rightBtn,
	sourceTab,
	rules
}

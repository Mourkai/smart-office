const rightBtn = {
	'type': ['全部', '待提交', '被退回', '已发起'],
	'status': ['全部', '待提交', '审批中', '已撤销', '已拒绝', '已通过'],
	'dailyType': ['全部', '日志', '周报', '月报'],
}

const formVerb = (data, isVacation) => {
	let isSuccess = true
	let tipArr = ['']
	if (data.length == 2) {
		tipArr = ['上午的', '下午的']
	}
	data.forEach((item, index) => {
		if (!isSuccess) return;
		if (!item.code) {
			uni.$u.toast(`请选择${tipArr[index]}项目`)
			return isSuccess = false
		}
		if (data.length === 1) {
			if (!item.amWorkType) {
				uni.$u.toast('请选择上午的工时类型')
				return isSuccess = false
			}
			if (!item.pmWorkType) {
				uni.$u.toast('请选择下午的工时类型')
				return isSuccess = false
			}
		} else if (index === 0) { //多项目时第一次循环，也就是上午
			if (!item.amWorkType) {
				uni.$u.toast('请选择上午的工时类型')
				return isSuccess = false
			}
		} else if (index === 1) { //多项目时第二次循环，也就是下午
			if (!item.pmWorkType) {
				uni.$u.toast('请选择下午的工时类型')
				return isSuccess = false
			}
		}
		if (!item.commonAreaId) {
			uni.$u.toast(`请选择${tipArr[index]}工作城市`)
			return isSuccess = false
		}
		if (!item.address) {
			uni.$u.toast(`请输入${tipArr[index]}工作地点`)
			return isSuccess = false
		}
		if (!item.todayReport && !isVacation[index]) {
			uni.$u.toast(`请输入${tipArr[index]}今日完成`)
			return isSuccess = false
		}
		if (!item.nextDayPlan && !isVacation[index]) {
			uni.$u.toast(`请输入${tipArr[index]}明日计划`)
			return isSuccess = false
		}
	})
	return isSuccess
}


const sourceTab = [{
	name: '全部',
	data: [],
	searchData: {
		type: 10,
		status: ''
	},
	pageNum: 0,
	isOver: false,
}, {
	name: '待提交',
	data: [],
	searchData: {
		type: 7,
		status: ''
	},
	pageNum: 0,
	isOver: false,
}, {
	name: '被退回',
	data: [],
	searchData: {
		type: 3,
		status: ''
	},
	pageNum: 0,
	isOver: false,
}, {
	name: '已发起',
	data: [],
	searchData: {
		type: 8,
		status: ''
	},
	pageNum: 0,
	isOver: false,
}]

const workEnum = [
    {
        "label": "出勤",
        "value": 1
    },
    {
        "label": "出差",
        "value": 2
    },
    {
        "label": "请假",
        "value": 3
    },
    {
        "label": "法定节假日",
        "value": 4
    },
    {
        "label": "病假",
        "value": 5
    },
    {
        "label": "居家办公",
        "value": 6
    }
]

const project = 1

export {
	rightBtn,
	sourceTab,
	formVerb,
	workEnum
}

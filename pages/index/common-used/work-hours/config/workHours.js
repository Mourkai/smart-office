const itemData = [{
		name: '王某1',
		rightText: "第六周 02/03-02/10工时",
		rightIcon: "",
		avatar: '/static/public/default-avatar.png',
		text: ['北京科学技术研究院转化项目', '项目经理：李经理', '出勤：5天'],
		icon: ['grid-fill', 'account-fill', 'bag-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	},
	{
		name: '王某1',
		rightText: "第六周 02/03-02/10工时",
		rightIcon: "",
		avatar: '/static/public/default-avatar.png',
		text: ['北京科学技术研究院转化项目', '项目经理：李经理', '出勤：5天'],
		icon: ['grid-fill', 'account-fill', 'bag-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	},
	{
		name: '王某1',
		rightText: "第六周 02/03-02/10工时",
		rightIcon: "",
		avatar: '/static/public/default-avatar.png',
		text: ['北京科学技术研究院转化项目', '项目经理：李经理', '出勤：5天'],
		icon: ['grid-fill', 'account-fill', 'bag-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	},
	{
		name: '王某1',
		rightText: "第六周 02/03-02/10工时",
		rightIcon: "",
		avatar: '/static/public/default-avatar.png',
		text: ['北京科学技术研究院转化项目', '项目经理：李经理', '出勤：5天'],
		icon: ['grid-fill', 'account-fill', 'bag-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	}
]

const rightBtn = {
	'type': [{
			name: '全部',
			type: 10
		}, {
			name: '待提交',
			type: 7
		},
		{
			name: '被退回',
			type: 3
		},
		{
			name: '已处理',
			type: 8
		},
	],
	'status': ['全部', '待提交', '审批中', '已撤销', '已拒绝', '已通过'],
}

const itemContent = {
	title: '王某某提交的工时申请',
	num: '2022302022022202',
	time: '第六周 02-12/03-14',
	content: [{
			list: [{
					title: '项目编码',
					desc: '2022302022022202'
				},
				{
					title: '项目名称',
					desc: '北京某某某项目组'
				},
				{
					title: '项目经理',
					desc: '刘某某'
				}
			],
			count: ['出勤：4天', '事假：3天']
		},
		{
			list: [{
					title: '项目编码',
					desc: '2022302022022202'
				},
				{
					title: '项目名称',
					desc: '北京某某某项目组'
				},
				{
					title: '项目经理',
					desc: '刘某某'
				}
			],
			count: ['出勤：4天', '事假：3天']
		},
		{
			list: [{
					title: '项目编码',
					desc: '2022302022022202'
				},
				{
					title: '项目名称',
					desc: '北京某某某项目组'
				},
				{
					title: '项目经理',
					desc: '刘某某'
				}
			],
			count: ['出勤：4天', '事假：3天']
		}
	]
}

const tableContent = [
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否'],
	['2023/02/07上午', '出勤', '3', '否']
]

const defaultWorkHoursItem = [{
		timeType: '上午',
		morning:1,
		_workType: '',
		_workTypeIndex: '',
		_travelAllowance: '',
		_projectIndex: '',
		travelAllowance: '',
		workType: '',
		projectManagerName: '',
		projectManagerId: '',
		projectId: '',
		projectName: '',
		manHourLength: '',
		code: '',
	},
	{
		timeType: '下午',
		morning:0,
		_workType: '',
		workType: '',
		_workTypeIndex: '',
		_travelAllowance: '',
		_projectIndex: '',
		travelAllowance: '',
		projectManagerName: '',
		projectManagerId: '',
		projectId: '',
		projectName: '',
		manHourLength: '',
		code: '',
	}
]

export {
	rightBtn,
	itemData,
	itemContent,
	defaultWorkHoursItem,
	tableContent
}

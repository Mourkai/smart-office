const itemData = [{
		name: '王某1',
		rightText: "入职申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['刘晓丽', '产品经理', '2020-02-09', '技术部', '02-21 20:00'],
		icon: ['account-fill', 'grid-fill', 'calendar', 'bookmark', 'clock-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	},
	{
		name: '刘大力',
		rightText: "转正申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['技术部', '2020-02-09', '2020-02-09', '02-21 20:00'],
		icon: ['bookmark', 'calendar', 'calendar','clock-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	}, {
		name: '王某2',
		rightText: "调动申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['刘忠利', '产品部', '技术部', '2020-09-09', '02-21 20:00'],
		icon: ['account-fill', 'bookmark', 'bookmark', 'calendar', 'clock-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	}, {
		name: '王某5',
		rightText: "离职申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['技术部', '因为个人原因', '2020-02-09','02-21 20:00'],
		icon: ['bookmark', 'file-text-fill', 'calendar', 'clock-fill'],
		url: '/pages/message/components/wait/dailyDetails'
	},
	{
		name: '王某8',
		rightText: "调薪申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['李孝利', '技术部'],
		icon: ['account-fill', 'bookmark'],
		url: '/pages/message/components/wait/dailyDetails'
	},
]

const process = [{
		status: 'success',
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		title: '审批流程',
		time: '2022-09-09 11:23',
		desc: '孟锴（审批中）'
	},
	{
		status: '',
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		title: '审批流程',
		time: '2022-09-09 11:21',
		desc: '孟锴（已拒绝）'
	},
	{
		status: '',
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		title: '审批流程',
		time: '2022-09-09 11:22',
		desc: '孟锴（审批中）',
		leader: [{
				avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
				name: '张三'
			},
			{
				avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
				name: '张三'
			}
		]
	}
]

const itemContent = {
	title: '王某某提交的工时申请',
	num: '2022302022022202',
	time: '第六周 02-12/03-14',
	content: [
		{
			list: [
				{title: '项目编码',desc: '2022302022022202'},
				{title: '项目名称',desc: '北京某某某项目组'},
				{title: '项目经理',desc: '刘某某'}],
			count: ['出勤：4天','事假：3天']
		},
		{
			list: [
				{title: '项目编码',desc: '2022302022022202'},
				{title: '项目名称',desc: '北京某某某项目组'},
				{title: '项目经理',desc: '刘某某'}],
			count: ['出勤：4天','事假：3天']
		},
		{
			list: [
				{title: '项目编码',desc: '2022302022022202'},
				{title: '项目名称',desc: '北京某某某项目组'},
				{title: '项目经理',desc: '刘某某'}],
			count: ['出勤：4天']
		}
	]
}

const tableContent = [
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否'],
	['2023/02/07上午','出勤','3','否']
]

export {
	process,
	itemData,
	itemContent,
	tableContent
}

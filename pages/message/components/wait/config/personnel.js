const itemData = [{
		name: '王某1',
		rightText: "入职申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['刘晓丽', '产品经理', '2020-02-09', '技术部', '02-21 20:00'],
		icon: ['account-fill', 'grid-fill', 'calendar', 'bookmark', 'clock-fill'],
		url: '/pages/message/components/wait/joinDetails'
	},
	{
		name: '刘大力',
		rightText: "转正申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['技术部', '2020-02-09', '2020-02-09', '02-21 20:00'],
		icon: ['bookmark', 'calendar', 'calendar','clock-fill'],
		url: '/pages/message/components/wait/workerDetails'
	}, {
		name: '王某2',
		rightText: "调动申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['刘忠利', '产品部', '技术部', '2020-09-09', '02-21 20:00'],
		icon: ['account-fill', 'bookmark', 'bookmark', 'calendar', 'clock-fill'],
		url: '/pages/message/components/wait/moveDetails'
	}, {
		name: '王某5',
		rightText: "离职申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['技术部', '因为个人原因', '2020-02-09','02-21 20:00'],
		icon: ['bookmark', 'file-text-fill', 'calendar', 'clock-fill'],
		url: '/pages/message/components/wait/outDetails'
	},
	{
		name: '王某8',
		rightText: "调薪申请",
		rightIcon:"/static/public/zhang.png",
		avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
		text: ['李孝利', '技术部'],
		icon: ['account-fill', 'bookmark'],
		url: '/pages/message/components/wait/payChangeDetails'
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

export {
	process,
	itemData
}

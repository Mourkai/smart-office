export function resovleMenu(item) {
	let data = {}
	switch (item.category) {
		case 1: //待审批人事管理
			data = {
				icon: "../../static/menu/message/daishenpirenshiguanli.png",
				url: '/pages/message/components/wait/personnel',
			}
			break;
		case 2: //待审批项目管理
			data = {
				icon: "../../static/menu/message/daishenpixiangmuguanli.png",
				url: '/pages/message/components/wait/project'
			}
			break;
		case 3: //待审批费用
			data = {
				icon: "../../static/menu/message/daishenpifeiyong.png",
				url: '/pages/message/components/wait/fee',
			}
			break;
		case 4://待审批行政管理
			data = {
				icon: "../../static/menu/message/daishenpixingzhengguanli.png",
				url: '/pages/message/components/wait/administrator',
			}
			break;
		case 5:
			data = {
				icon: "../../static/menu/message/daishenpifeiyong.png",
				url: './wait/daily.vue',
			}
			break;
		case 6:
			data = {
				icon: "../../static/menu/message/daishenpifeiyong.png",
				url: './wait/daily.vue',
			}
			break;
		default:
			data = {}
	}
	
	return {
		...item,
		...data
	}
}

const menu = [
	{
		category:1,
		title:"待审批人事管理",
		icon: "/static/menu/message/daishenpirenshiguanli.png",
		url: '/pages/message/components/wait/personnel',
	},
	{
		category:2,
		title:"待审批项目管理",
		icon: "/static/menu/message/daishenpixiangmuguanli.png",
		url: '/pages/message/components/wait/project',
	},
	{
		category:3,
		title:'待审批费用',
		icon: "/static/menu/message/daishenpifeiyong.png",
		url: '/pages/message/components/wait/fee'
	},
	{
		category:4,
		title:'待审批行政管理',
		icon: "/static/menu/message/daishenpixingzhengguanli.png",
		url: '/pages/message/components/wait/administrator',
	},
	{
		category:999,
		title:'待审批日志',
		icon: "/static/menu/message/daishenpirizhi.png",
		url: '/pages/index/no-page',
	},
	// {
	// 	category:999,
	// 	title:'待审批工时',
	// 	icon: "../../static/menu/message/daishenpigongshi.png",
	// 	url: '/pages/index/no-page',
	// },
	{
		category:999,
		title:'待审批假勤管理',
		icon: "/static/menu/message/daishenpirenshiguanli.png",
		url: '/pages/index/no-page'
	},
	{
		category:999,
		title:'待审批其它',
		icon: "/static/menu/message/daishenpiqita.png",
		url: '/pages/index/no-page'
	}
]

export {
	menu
}

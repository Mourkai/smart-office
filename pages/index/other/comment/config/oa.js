const tabList = [{
	name: '待审批',
	data: [],
	pageNum: 0,
	type: 6,
	searchData: {},
	isOver: false,
}, {
	name: '待提交',
	data: [],
	pageNum: 0,
	type: 7,
	searchData: {},
	isOver: false,
}, {
	name: '被退回',
	data: [],
	pageNum: 0,
	type: 3,
	searchData: {},
	isOver: false,
}, {
	name: '已发起',
	data: [],
	pageNum: 0,
	type: 8,
	searchData: {},
	isOver: false,
}, {
	name: '已处理',
	data: [],
	pageNum: 0,
	type: 9,
	searchData: {},
	isOver: false,
}]

const cd = {
    "commentList": [{
            "id": 1, // 唯一主键
            "owner": false, // 是否是拥有者，为true则可以删除，管理员全部为true
            "nickName": "龚峰平", // 评论者昵称，昵称过长请在后端截断
            "content": "报销错误尽快安排修改", // 评论内容
            "parentId": null, // 所属评论的唯一主键
            "createTime": "2021-07-02 16:32:07" // 创建时间
        },
        {
            "id": 2,
            "owner": false,
            "nickName": "李飞",
            "content": "@龚峰平 刚才说的售前和正式加一起的问题改完了,明早发版就行了",
            "parentId": 1,
            "createTime": "2021-07-02 17:05:50"
        },
        {
            "id": 4,
            "owner": true,
            "nickName": "陈建",
            "content": "这个项目怎么有70多万售前成本？在项目看板里穿透售前成本又没有这个成本 ",
            "parentId": null,
            "createTime": "2021-07-13 09:37:50"
        },
        {
            "id": 5,
            "owner": false,
            "nickName": "周轩",
            "content": "国网山东电力省管产业工程物资管理规范提升项目+BJ-2022-研发-00049",
            "parentId": null,
            "createTime": "2021-07-13 16:04:35"
        },
        {
            "id": 13,
            "owner": false,
            "nickName": "周伟",
            "content": "@龚峰平 你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明你怕不是个大聪明",
            "parentId": 1,
            "createTime": "2021-07-14 11:01:23"
        }
    ]
}

export {
	tabList,
	cd
}

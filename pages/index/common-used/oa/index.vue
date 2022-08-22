<template>
	<view class="daily bp100">
		<view class="fixed-header">
			<view class="search">
				<u-search inputAlign="center" @search="searchName" v-model="list[currentIndex].searchData.summaryOrInstanceNo"
					height="30" :showAction="false" />
				<view class="icon" @click="showRightFunc">
					<u-icon name="list" size="26"></u-icon>
				</view>
			</view>
			<u-tabs :list="list" itemStyle="width:120rpx;height:44px" @click="clickTab"></u-tabs>
		</view>
		<view class="list fixed-body">
			<MessageItem v-for="(item,index) in list[currentIndex].data" :key="index" :data="item" />
			<u-empty icon="/static/public/no-data.png" v-show="list[currentIndex].data.length === 0" />
			<u-divider v-show="list[currentIndex].isOver" text="已经到底了" />
		</view>
		<OARight v-if="showRight" :show="showRight" :searchData="list[currentIndex].searchData" @search="search"
			@closeRight="showRight = false" />
	</view>
</template>

<script>
	import MessageItem from '@/components/message-item/message-item.vue'
	import OARight from '../right/oaRight.vue'
	import {
		tabList
	} from './config/oa.js'
	import {
		getOaTask
	} from '@/api/process.js'
	import localCache from '@/util/cache.js'
	export default {
		name: 'daily',
		data() {
			return {
				showRight: false,
				currentIndex: 0,
				tabList,
				list:[],
			}
		},
		onLoad() {
			this.list = JSON.parse(JSON.stringify(this.tabList)) //深拷贝，用于下拉刷新后重置
			this.loadData(this.list[this.currentIndex].type)
		},
		components: {
			MessageItem,
			OARight
		},
		methods: {
			clickTab(e) {
				this.currentIndex = e.index
				if (this.list[this.currentIndex].data.length === 0) {
					this.loadData(this.list[this.currentIndex].type)
				}
			},
			searchName(e) {
				const obj = {
					...this.list[this.currentIndex].searchData
				}
				this.search(obj)
			},
			showRightFunc() {
				uni.showLoading({
					title: "加载中"
				})
				this.showRight = true
			},
			search(e) {
				this.list[this.currentIndex].searchData = e
				this.list[this.currentIndex].data = []
				this.list[this.currentIndex].pageNum = 0
				this.list[this.currentIndex].isOver = false
				this.loadData(this.list[this.currentIndex].type)
			},
			delListItem(id) {
				//从详情页back之后动态的删除一个
				const delIndex = this.list[this.currentIndex].data.findIndex(item=>item.id == id)
				this.list[this.currentIndex].data.splice(delIndex,1)
			},
			async loadData(type, callback) {
				const pageNum = ++this.list[this.currentIndex].pageNum
				const searchData = {
					...this.list[this.currentIndex].searchData
				}
				delete searchData.chooses //删除他，他只是为了right的回显
				delete searchData.currentBtn //删除他，他只是为了right的回显
				let data = {data:{rows:[]}}
				if (type != 7 && type != 3) {
					data = await getOaTask({
						type,
						pageNum,
						'pageSize': 10,
						...searchData
					})
				}
				if (type != 7 && type != 3 && data.data.rows && data.data.rows.length === 0) {
					this.list[this.currentIndex].isOver = true
				}	
				data.data.rows && data.data.rows.forEach((item, index) => {
					let url = '/pages/message/components/wait/waitCommonDetails'
					const detailName = `${item.createbyName}的${item.defName}`
					url = url +
						`?id=${item.id}&name=${detailName}&bpmStatus=${item.bpmStatus}&path=${item.defKey}&createBy=${item.createBy}`
					const obj = {
						id: item.id,
						name: item.createbyName,
						rightText: item.defName,
						rightIcon: "grid-fill",
						avatar: '/static/public/default-avatar.png',
						text: [`${item.instanceNo}`, item.proposerDate, item.summary],
						icon: ['attach', 'clock-fill', 'more-circle', ''],
						component: item.appViewPath,
						url
					}
					this.list[this.currentIndex].data.push(obj)
				})
				callback && callback()
			},
			onReachBottom() {
				this.loadData(this.list[this.currentIndex].type)
			},
			onPullDownRefresh() {
				this.list = JSON.parse(JSON.stringify(this.tabList)) //深拷贝，用于下拉刷新后重置
				this.loadData(this.list[this.currentIndex].type, () => {
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	// page {
	// 	position: relative;
	// }

	.fixed-header {
		position: fixed;
		width: 100%;
		background-color: #fff;
		z-index: 9;
		left: 0;
	}

	.fixed-body {
		position: absolute;
		width: 100%;
		top: 240rpx;
		padding-bottom: 200rpx;
	}

	.search {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;

		.u-search {
			margin-right: 40rpx !important;
		}

		/deep/.u-search__content__input {
			text-align: left !important;
		}
	}

	.list {
		padding: 0 20rpx;
		box-sizing: border-box;
	}
</style>

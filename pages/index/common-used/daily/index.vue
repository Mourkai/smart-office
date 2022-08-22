<template>
	<view class="daily bp100">
		<view class="fixed-header">
			<view class="search">
				<u-search inputAlign="center" @search="searchName" height="30"
					v-model="tab[currentIndex].searchData.summaryOrInstanceNo" :showAction="false" />
				<view class="icon" @click="showRightFunc">
					<u-icon name="list" size="26"></u-icon>
				</view>
			</view>
			<view class="top-tabs">
				<u-tabs :list="tab" :current="currentIndex" itemStyle="width:150rpx;height:44px" @click="clickTab" />
			</view>
		</view>
		<view class="list fixed-body">
			<MessageItem v-for="(item,index) in tab[currentIndex].data" :key="index" :data="item" />
			<u-empty icon="/static/public/no-data.png" v-show="tab[currentIndex].data.length === 0" />
			<u-divider v-show="tab[currentIndex].isOver" text="已经到底了" />
		</view>
		<DailyRight v-if="showRight" :show="showRight" @search="search" :searchData="tab[currentIndex].searchData"
			@closeRight="showRight = false" />
	</view>
</template>

<script>
	import MessageItem from '@/components/message-item/message-item.vue'
	import DailyRight from '../right/dailyRight.vue'
	import {
		sourceTab
	} from './config/daily.js'
	import {
		getOaTask
	} from '@/api/process.js'
	export default {
		name: 'daily',
		data() {
			return {
				isAllSelect: '',
				showRight: false,
				currentIndex: 0,
				pageSize: 10,
				source: [],
				sourceTab,
				tab:[]
			}
		},
		onLoad() {
			this.tab = JSON.parse(JSON.stringify(this.sourceTab))
			// 查询日报记录列表接口
			this.getdailyReport()
		},
		components: {
			MessageItem,
			DailyRight
		},
		methods: {
			changeisAll(n) {
				//console.log(this.isAllSelect);
			},
			// 切换table
			clickTab(item) {
				// console.log(item);
				this.currentIndex = item.index
				if (this.tab[this.currentIndex].data.length === 0) {
					// console.log(this.tab[this.currentIndex].data.length === 0);
					// this.tab[this.currentIndex].isOver = false
					// console.log(this.tab[this.currentIndex].isOver = false)
					this.getdailyReport(this.tab[this.currentIndex].type)
				}
			},

			radioChange(n) {
				console.log('radioChange', n);
			},

			showRightFunc() {
				uni.showLoading({
					title: "加载中"
				})
				this.showRight = true
			},
			// 搜索关键字
			searchName(e) {
				const obj = {
					...this.tab[this.currentIndex].searchData
				}
				this.search(obj)
			},

			search(e) {
				this.tab[this.currentIndex].searchData = e
				this.tab[this.currentIndex].data = []
				this.tab[this.currentIndex].pageNum = 0
				this.tab[this.currentIndex].isOver = false
				this.getdailyReport()
			},

			// 下拉刷新
			onPullDownRefresh() {
				this.tab = JSON.parse(JSON.stringify(this.sourceTab))
				this.getdailyReport(() => {
					uni.stopPullDownRefresh()
				})
			},

			// 上拉加载触底事件
			onReachBottom() {
				this.getdailyReport()
			},
			async getdailyReport(callback) {
				const pageNum = ++this.tab[this.currentIndex].pageNum
				let type = this.tab[this.currentIndex].searchData.type
				this.tab.forEach((item, index) => {
					if (item.searchData.type == type) {
						this.currentIndex = index
					}
				})
				const searchData = {
					...this.tab[this.currentIndex].searchData
				}
				searchData.bpmStatus = searchData.status
				delete searchData.status
				const data = await getOaTask({
					pageNum,
					pageSize: 10,
					defKey: 'project_daily_record',
					...searchData
				})
				if (data.data.total > 10 != 0) {
					this.tab[this.currentIndex].isOver = true
				}
				data.data.rows && data.data.rows.forEach(item => {
					let url = '/pages/message/components/wait/waitCommonDetails'
					const detailName = `${item.createbyName}的${item.defName}`
					url = url + `?id=${item.id}&name=${detailName}&bpmStatus=${item.bpmStatus}&path=${item.defKey}&createBy=${item.createBy}`
					const obj = {
						id: item.id,
						name: item.createbyName,
						rightText: item.bpmStatusLabel,
						rightIcon: "grid-fill",
						avatar: '/static/public/default-avatar.png',
						text: [`${item.instanceNo}`, item.summary],
						icon: ['attach', 'more-circle'],
						component: item.appViewPath,
						url
					}
					this.tab[this.currentIndex].data.push(obj)
				})
				callback && callback()
			}
		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
	}

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
	}

	.list {
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.top-tabs {
		display: flex;
		font-size: 32rpx;
		margin: 20rpx 0;

		view {
			color: #606266;
			flex: 1;
			text-align: center;

			text {
				display: inline-block;
				padding-bottom: 8rpx;
				border-bottom: 5rpx solid #fff;
			}

			.active {
				border-bottom: 5rpx solid $main-color;
				transition: all .5s;
			}
		}
	}

	.floatPush {
		position: fixed;
		right: 50rpx;
		bottom: 100rpx;
		border-radius: 50%;
		background-color: #fff;
	}
	/deep/.u-search__content__input {
		text-align: left !important;
	}
</style>

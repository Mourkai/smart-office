<template>
	<view class="daily bp100">
		<view class="fixed-header">
			<view class="search">
				<u-search inputAlign="center" @search="searchName"
					v-model="tab[currentIndex].searchData.summaryOrInstanceNo" height="30" :showAction="false" />
				<view class="icon" @click="showRight = true">
					<u-icon name="list" size="26"></u-icon>
				</view>
			</view>
			<u-tabs :list="tab" :current="currentIndex" @click="changeTab"></u-tabs>
		</view>
		<view class="list fixed-body">
			<MessageItem v-for="(item,index) in tab[currentIndex].data" :key="item.id" :data="item" />
			<u-empty icon="/static/public/no-data.png" v-show="tab[currentIndex].data.length === 0" />
			<u-divider v-show="tab[currentIndex].isOver" text="已经到底了" />
		</view>
		<PersonnelRight v-if="showRight" :show="showRight" :searchData="tab[currentIndex].searchData" @search="search"
			@closeRight="showRight = false" />
	</view>
</template>

<script>
	import MessageItem from '@/components/message-item/message-item.vue'
	import PersonnelRight from './right/personnelRight.vue'
	import {
		getDeploySelect,
		getOaTask
	} from '@/api/process.js'
	export default {
		data() {
			return {
				isAllSelect: '',
				iconGroup: ['grid', '', '', ''],
				showRight: false,
				currentIndex: 0,
				tab: [{
					data: [],
					defKey: "",
					isOver: false,
					name: "全部",
					pageNum: 0,
					searchData: {
						defKey: ''
					}
				}]
			}
		},
		async onLoad() {
			const tabList = await getDeploySelect({
				category: 1
			})
			tabList.data.map(item => {
				const obj = {
					data: [],
					pageNum: 0,
					searchData: {
						defKey: item.defKey
					},
					isOver: false
				}
				this.tab.push({
					...item,
					...obj
				})
			})
			this.loadData()
		},
		components: {
			MessageItem,
			PersonnelRight
		},
		methods: {
			changeisAll(n) {
			},
			radioChange(n) {
			},
			searchName(e) {
				const obj = {
					...this.tab[this.currentIndex].searchData,
					summaryOrInstanceNo: e
				}
				this.search(obj)
			},
			onPullDownRefresh() {
				this.tab = this.tab.map(item => {
					item.data = []
					item.pageNum = 0
					item.isOver = false
					item.searchData = {
						defKey: item.defKey
					}
					return item
				})
				this.loadData(() => {
					uni.stopPullDownRefresh()
				})
			},
			onReachBottom() {
				this.loadData()
			},
			search(e) {
				//判断回传过来的defKey有多少个，一个就代表单选跳对应的，多个就是多选，跳全部
				if (!Array.isArray(e.defKey)) {
					e.defKey = e.defKey.split(',')
				}
				if (e.defKey.length === 1) {
					this.tab.map((item, index) => {
						if (item.defKey == e.defKey[0]) {
							this.currentIndex = index
						}
					})
				} else if (e.defKey.length > 1) {
					this.currentIndex = 0 //跳全部
				}
				this.tab[this.currentIndex].searchData = e
				this.tab[this.currentIndex].data = []
				this.tab[this.currentIndex].pageNum = 0
				this.tab[this.currentIndex].isOver = false
				this.loadData()
			},
			changeTab(e) {
				this.currentIndex = e.index
				if (this.tab[this.currentIndex].data.length === 0) {
					this.loadData()
				}
			},
			async loadData(callback) {
				const pageNum = ++this.tab[this.currentIndex].pageNum
				const searchData = {
					...this.tab[this.currentIndex].searchData
				}
				if (Array.isArray(searchData.defKey) && searchData.defKey.length > 1) {
					this.currentIndex = 0
					searchData.defKey = searchData.defKey.toString()
				}
				searchData.defKeyList = searchData.defKey //接口临时修改，其他不变
				delete searchData.defKey
				delete searchData.chooses
				delete searchData.currentBtn
				const data = await getOaTask({
					category: 1,
					type: 6, //type6 是待审批的
					pageNum,
					pageSize: 10,
					...searchData
				})
				if (data.data.rows && data.data.rows.length === 0) {
					this.tab[this.currentIndex].isOver = true
				}
				data.data.rows && data.data.rows.map(item => {
					let url = '/pages/message/components/wait/waitCommonDetails'
					if (item.bpmStatus == 1) {
						url = item.appFormPath
					}
					const detailName = `${item.createbyName}的${item.defName}`
					url = url + `?id=${item.id}&name=${detailName}&path=${item.defKey}`
					const obj = {
						id: item.id,
						name: item.createbyName,
						rightText: item.defName,
						rightIcon: "grid-fill",
						avatar: '/static/public/default-avatar.png',
						text: [item.instanceNo, item.summary, item.proposerDate],
						icon: ['attach', 'more-circle', 'clock-fill'],
						component: item.appViewPath,
						url
					}
					this.tab[this.currentIndex].data.push(obj)
				})
				callback && callback()
			},
			delListItem(id) {
				//从详情页back之后动态的删除一个
				const currentData = [...this.tab[this.currentIndex].data]
				this.tab[this.currentIndex].data = currentData.filter(item => item.id != id)
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
		padding: 30rpx 20rpx 10rpx 20rpx;

		.u-search {
			margin-right: 40rpx !important;
		}
	}

	.list {
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	/deep/.u-search__content__input {
		text-align: left !important;
	}
</style>
